# Deploying servicedesk-trainer on Two Azure Ubuntu VMs

Architecture:

```
Internet
   |
   |  HTTPS (443) / HTTP (80)
   v
[ VM-APP ]  Ubuntu, Node.js + PM2 + Nginx        Public IP
   |
   |  Postgres (5432) — PRIVATE VNet traffic only
   v
[ VM-DB ]   Ubuntu, PostgreSQL                    No public IP (or public IP with NSG locked down)
```

Both VMs sit in the same Azure Virtual Network (VNet) so they talk to each other over private IPs. Only VM-APP is exposed to the internet.

---

## 0. Before you deploy: rotate secrets

The `.env` in your project contains a real-looking Neon connection string, Gemini API key, JWT secret, and admin password. Since this file has now been shared outside its original environment, **treat all of these as burned**:

- Generate a new Gemini API key at https://aistudio.google.com/apikey and revoke the old one.
- Generate a new `JWT_SECRET` (e.g. `openssl rand -base64 48`).
- Set a new `ADMIN_PASSWORD`.
- You won't need the Neon URL at all — Postgres will run on VM-DB instead.

---

## 1. Provision the two Azure VMs

In the Azure Portal (or CLI):

1. Create a **Resource Group**, e.g. `servicedesk-rg`.
2. Create a **Virtual Network** (e.g. `servicedesk-vnet`, address space `10.0.0.0/16`) with one subnet (`10.0.1.0/24`) — both VMs will live in this subnet so they share private IP connectivity by default.
3. Create **VM-DB**:
   - Image: Ubuntu Server 22.04 LTS
   - Size: B2s or larger (2 vCPU/4GB is a reasonable start)
   - Networking: attach to `servicedesk-vnet`
   - **No public IP needed** (recommended) — you can reach it via VM-APP or Azure Bastion for admin access
   - Note its **private IP**, e.g. `10.0.1.4`
4. Create **VM-APP**:
   - Same image/VNet/subnet
   - **Public IP: yes** (this is the one the internet talks to)
   - Note both its public IP and private IP (e.g. `10.0.1.5`)
5. Configure **Network Security Groups (NSGs)**:
   - **VM-DB's NSG**: allow inbound TCP 5432 **only from VM-APP's private IP** (or the whole subnet `10.0.1.0/24`), deny from `Internet`. Allow SSH (22) only from your admin IP or via Bastion.
   - **VM-APP's NSG**: allow inbound TCP 80 and 443 from `Internet` (and 3000 only if you're not fronting with Nginx). Allow SSH (22) only from your admin IP.

This is the part that actually enforces "database not reachable from the internet" — get the NSGs right and the rest is just software setup.

---

## 2. Set up VM-DB (PostgreSQL)

SSH into VM-DB and run:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql --now
```

Create the database and app user:

```bash
sudo -u postgres psql <<'SQL'
CREATE DATABASE servicedesk;
CREATE USER sdt_app WITH ENCRYPTED PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE servicedesk TO sdt_app;
ALTER DATABASE servicedesk OWNER TO sdt_app;
SQL
```

Allow Postgres to listen on its private network interface. Edit the config (path may be `/etc/postgresql/14/main/postgresql.conf` — check your version with `pg_lsclusters`):

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Set:

```
listen_addresses = 'localhost,10.0.1.4'
```

(replace `10.0.1.4` with VM-DB's actual private IP)

Then edit `pg_hba.conf` in the same directory to allow VM-APP to connect:

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add a line (adjust the subnet to match yours):

```
host    servicedesk     sdt_app         10.0.1.0/24            scram-sha-256
```

Restart Postgres:

```bash
sudo systemctl restart postgresql
```

Verify it's listening:

```bash
sudo ss -ltnp | grep 5432
```

### A note on SSL between the two VMs

The app's `db.js` currently does this:

```js
ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
```

Since your `DATABASE_URL` will use a private IP (not the word `localhost`), the app will try to negotiate SSL — and a stock Postgres install doesn't have SSL enabled, so the connection will fail. You have two options:

**Option A (simplest, fine for a private VNet):** edit `db.js` on VM-APP so SSL is controlled explicitly, and disable it since traffic never leaves your private network:

```js
ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
```

Then just don't set `PGSSL` in your `.env` (or set it to `false`).

**Option B:** enable SSL on Postgres itself (generate a self-signed cert, set `ssl = on` in `postgresql.conf`) if you want encryption in transit even within the VNet. Reasonable if compliance requires it; unnecessary overhead for most internal setups.

I'd go with Option A unless you have a specific requirement for encrypted internal traffic.

---

## 3. Set up VM-APP (Node.js + PM2 + Nginx)

SSH into VM-APP:

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 18.x (matches package.json's engines field)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git

# Process manager to keep the app running / restart on crash or reboot
sudo npm install -g pm2

# Reverse proxy
sudo apt install -y nginx
```

### Deploy the code

From your local machine, copy the project **excluding `node_modules` and `.git`** (you'll `npm install` fresh on the server):

```bash
# from your local machine, in the project's parent folder
tar --exclude='node_modules' --exclude='.git' -czf app.tar.gz "New folder"
scp app.tar.gz azureuser@<VM-APP-PUBLIC-IP>:~
```

On VM-APP:

```bash
mkdir -p ~/servicedesk-trainer
tar -xzf app.tar.gz -C ~/servicedesk-trainer --strip-components=1
cd ~/servicedesk-trainer
npm install --omit=dev
```

### Configure environment variables

```bash
nano .env
```

```
GEMINI_API_KEY=your_new_rotated_key
DATABASE_URL=postgresql://sdt_app:CHANGE_ME_STRONG_PASSWORD@10.0.1.4:5432/servicedesk
JWT_SECRET=your_new_random_secret
PORT=3000
NODE_ENV=production

ADMIN_NAME=Administrator
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_new_admin_password
ADMIN_SAP_ID=ADMIN-0001
```

Apply the `db.js` SSL fix from Step 2 if you're going with Option A.

### Run with PM2

```bash
pm2 start server.js --name servicedesk-trainer
pm2 save
pm2 startup   # follow the printed command to enable boot-time startup
```

Useful PM2 commands: `pm2 logs servicedesk-trainer`, `pm2 restart servicedesk-trainer`, `pm2 status`.

### Configure Nginx as a reverse proxy

```bash
sudo nano /etc/nginx/sites-available/servicedesk
```

```nginx
server {
    listen 80;
    server_name your-domain-or-public-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/servicedesk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Optional: HTTPS with Let's Encrypt (needs a domain name pointed at VM-APP's public IP)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 4. Verify end to end

From VM-APP, confirm it can reach Postgres:

```bash
sudo apt install -y postgresql-client
psql "postgresql://sdt_app:CHANGE_ME_STRONG_PASSWORD@10.0.1.4:5432/servicedesk" -c '\dt'
```

Then check the app itself:

```bash
curl http://localhost:3000
pm2 logs servicedesk-trainer --lines 50
```

The app runs `initSchema()` on boot (visible in `db.js`), so tables get created automatically the first time it connects successfully — watch the PM2 logs for `[db] Seeded initial admin account`.

From your browser, hit `http://<VM-APP-public-ip>` (or your domain) and confirm the login screen loads.

---

## 5. Hardening checklist

- `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable` on VM-APP; on VM-DB, `sudo ufw allow from 10.0.1.0/24 to any port 5432` plus SSH, then `sudo ufw enable`.
- Disable SSH password auth in favor of key-based auth (`/etc/ssh/sshd_config` → `PasswordAuthentication no`) on both VMs.
- Restrict SSH in the NSGs to your own IP, or better, use **Azure Bastion** and remove public SSH entirely.
- Take regular Postgres backups: `pg_dump` on a cron job, or use Azure VM snapshots / Azure Backup on VM-DB's disk.
- Keep `node_modules` off both VMs' git history — you already have a `.gitignore` for that.
- Consider Azure Monitor / a simple `pm2` log rotation (`pm2 install pm2-logrotate`) so logs don't fill the disk.

---

## Quick reference: what goes where

| Item | VM-DB | VM-APP |
|---|---|---|
| PostgreSQL server | ✅ | ❌ |
| Node.js app (server.js) | ❌ | ✅ |
| Public IP | No | Yes |
| Inbound 5432 | From VM-APP subnet only | — |
| Inbound 80/443 | — | From Internet |
| `.env` with `DATABASE_URL` | — | ✅ (points at VM-DB's private IP) |
