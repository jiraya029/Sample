---
name: avoid-ai-design-complete
description: Use when a complete, single-file reference copy of every text file installed with the avoid-ai-design skill is needed.
---

# Avoid AI Design Complete Reference

This file preserves every text file in the installed `avoid-ai-design` folder. Image assets are listed in the inventory below because they contain no text lines.

## Non-text assets

- `docs/before-after.png`
- `docs/demo-after.png`
- `docs/demo-before.png`
- `docs/og-image.png`
- `docs/x-hero.png`

## Source: `.gitignore`

````text
.DS_Store
node_modules/
*.log
.idea/
.vscode/


````
## Source: `docs/LAUNCH.md`

````text
# Launch kit: avoid-ai-design

The plan for GitHub stars. The engine is a Hacker News "Show HN", a Reddit post, and an X thread, all pointing at a repo whose catalog is useful on its own. Stars follow usefulness, not hype.

Every piece of copy below was run through the `avoid-ai-writing` skill: zero em-dashes, no Tier-1/2 AI vocabulary, varied rhythm. Fitting, since the project is about removing AI tells.

The repo URL (https://github.com/funboy322/avoid-ai-design) is already filled into every post below.

---

## Where to publish (ordered by payoff for stars)

| # | Channel | Why it earns stars | Effort | Timing |
|---|---|---|---|---|
| 1 | **Hacker News (Show HN)** | Highest variance, highest ceiling for dev tools. One front-page hour can mean hundreds of stars. | Low | Tue–Thu, ~8–10am ET |
| 2 | **Reddit r/ClaudeAI** | The most on-target audience. They use Claude Code daily. | Low | Weekday morning |
| 3 | **X / Twitter thread** | Shareable before/after. Tag the people already complaining about AI slop. | Low | Tue–Thu, 9am–noon ET |
| 4 | **awesome-claude-code list (PR)** | A durable backlink and a steady discovery source. Stars trickle in for months. | Medium | Anytime |
| 5 | **agentskills.io registry** | The canonical SKILL.md directory. | Low | Anytime |
| 6 | **Reddit r/webdev + r/SideProject** | Wider dev audience; r/SideProject is friendly to launches. | Low | After r/ClaudeAI |
| 7 | **LinkedIn** | Reaches people who do not live on HN. | Low | Tue–Thu morning |
| 8 | **Dev.to / Hashnode cross-post** | A short "why every AI site looks the same" article that links the repo ranks over time. | Medium | Week 2 |
| 9 | **Discord (Anthropic, Cursor, indie hackers)** | Direct, warm audiences. Share, do not spam. | Low | Launch day |
| 10 | **Product Hunt** | Save for a polished moment with a demo GIF. Drives a spike, not durable stars. | High | Later |

**Reality check on stars.** Most come from (1) a Show HN that lands, (2) a thread someone influential reposts, and (3) sitting on an awesome-list. The repo has to deliver in the first ten seconds: a sharp README, a before/after image, and a catalog people want to screenshot. Build that first, then post.

---

## The copy

### X / Twitter: single post

```
Every AI-built site looks the same. Purple gradient, Inter, a centered hero, three rounded cards.

I built a Claude Code skill that reads AI-generated frontend, flags the tells, and rewrites them with a real point of view.

The design version of avoid-ai-writing. Free, MIT.

https://github.com/funboy322/avoid-ai-design ⭐
```

### X / Twitter: thread (6 posts)

```
1/ Every website an AI builds looks the same:

· purple-to-blue gradient
· Inter font
· centered hero, pill badge, three feature cards
· glass nav, rounded-2xl on everything

Once you see it, you can't unsee it. So I built a skill that fixes it. 🧵
```
```
2/ Why does it happen?

Models train on a decade of Tailwind tutorials and shadcn starters. They don't pick indigo. Indigo is the average.

Tailwind UI shipped buttons as bg-indigo-500 years ago. The whole web learned from it. Adam Wathan even owned it last year.
```
```
3/ avoid-ai-design is a Claude Code skill with two modes.

detect: it audits your UI and flags every tell, by severity.
rewrite: it commits to one real design direction and rewrites the code, without breaking your props, state, or accessibility.
```
```
4/ The core is a catalog of the tells, each with a fix for plain HTML/CSS and for React/Tailwind/shadcn.

A line from the research behind it that stuck with me:

"Colored left borders are almost as reliable a sign of AI design as em-dashes are for text."
```
```
5/ It works on output from any model, not just Claude. Codex, Cursor, v0, whatever shipped the slop.

No dependencies. No API keys. One SKILL.md and two reference files. MIT.
```
```
6/ Drop it straight into Claude Code:

git clone https://github.com/funboy322/avoid-ai-design ~/.claude/skills/avoid-ai-design

Then ask: "de-slop this page."

Repo and the full catalog: https://github.com/funboy322/avoid-ai-design

If it spares you one more purple gradient, star it. ⭐
```

### Reddit: r/ClaudeAI (primary)

**Title:** I catalogued every way AI-generated UI gives itself away, then made a Claude skill that fixes them

**Body:**
```
You can spot an AI-built site in a second. Purple-to-blue gradient, Inter, a centered hero with a pill badge, three identical feature cards, glass nav, everything at the same rounded corner.

It's not a taste problem. Nobody chose any of it. Models fall back to the median of what they trained on, which is ten years of Tailwind tutorials. Tailwind UI defaulted its buttons to bg-indigo-500 a while back, and that one choice seeded most of the "AI purple" you see today.

A recent analysis of ~1,400 Show HN sites put numbers on it: about 23% shipped untouched shadcn defaults, ~20% had the three-card feature grid, ~10% used indigo or violet buttons.

I got tired of fixing the same things by hand, so I built a Claude Code skill called avoid-ai-design. Two modes: detect reads your UI and flags every tell with a severity; rewrite picks one real design direction and rewrites the code while keeping your props, state, routing, and accessibility intact. The heart of it is a catalog: each tell, why it reads as AI, and a fix for both plain HTML/CSS and React/Tailwind/shadcn. There's a second file with a dozen design directions to commit to instead of defaulting.

It's the design counterpart to the avoid-ai-writing skill. Works on output from any model (Claude, Codex, Cursor, v0). No dependencies, MIT.

Repo and the full catalog: https://github.com/funboy322/avoid-ai-design

Curious which tells you'd add. The catalog takes PRs.
```

### Reddit: r/ClaudeAI Showcase Megathread comment

New accounts cannot make standalone Showcase posts (the sub has a minimum-karma rule; the mod bot removes them and points to the megathread). The project still qualifies for the **Build with Claude Project Showcase Megathread**, where a comment is welcome and image links are allowed. Paste this as a comment there:

```
**avoid-ai-design** is a Claude Code skill that audits AI-generated frontend and rewrites it so it stops looking AI-generated.

You can spot an AI-built page in a second: purple-to-blue gradient, Inter, a centered hero with three feature cards, untouched shadcn. The skill reads the code, flags each tell by severity, then rewrites the UI around one committed design direction without breaking your props, state, or accessibility. Two modes: detect (audit only) and rewrite. It ships a catalog of the tells with a fix for each in HTML/CSS and React/Tailwind/shadcn.

Same content, real before/after (both pages live in the repo):
https://raw.githubusercontent.com/funboy322/avoid-ai-design/main/docs/before-after.png

Repo, MIT: https://github.com/funboy322/avoid-ai-design

It's the design counterpart to avoid-ai-writing. I built it because I kept fixing the same five things by hand. Curious which tells you'd add.
```

### Hacker News: Show HN

**Title:** Show HN: A Claude skill that de-slops AI-generated UI

**Body:**
```
Every AI tool builds the same website: purple gradient, Inter, centered hero, three feature cards, untouched shadcn. A recent analysis of ~1,400 Show HN sites quantified it, and the cause is mundane: models fall back to the median of their training data, and Tailwind UI's old bg-indigo-500 default seeded most of the "AI purple."

avoid-ai-design is a Claude Code skill (a plain SKILL.md, no deps) that audits frontend code for these patterns and rewrites it around one committed design direction. Two modes: detect (flag only, with severity) and rewrite (audit, pick a direction, edit the files without breaking props/state/a11y). It ships a catalog of tells with fixes for HTML/CSS and React/Tailwind/shadcn, plus a set of design directions to choose from.

It's the design counterpart to avoid-ai-writing, and it works on any model's output, not just Claude's.

Repo: https://github.com/funboy322/avoid-ai-design

The catalog is the interesting part, and it takes PRs. I'd like to hear which tells you'd add or push back on.
```

### LinkedIn

```
You can recognize an AI-built website in about a second.

The purple-to-blue gradient. Inter everywhere. A centered hero with a little pill badge, then three identical feature cards. A glass navbar. Every corner at the same radius.

None of it is wrong, exactly. The problem is that nobody chose it. Models fall back to the average of what they trained on, and a decade of Tailwind tutorials made indigo the average.

So I built a Claude Code skill, avoid-ai-design. It audits frontend code and flags each of these tells by severity. Then, if you want, it picks one real design direction and rewrites the code, without touching your functionality or accessibility.

It's the design counterpart to the avoid-ai-writing skill. Free, MIT, and it works on output from any model.

If you build with AI, read the catalog. Link in the comments. ⭐
```

### Product Hunt

**Tagline (≤60 chars):** Make AI-generated UI stop looking AI-generated

**Description:**
```
Every AI tool ships the same page: purple gradient, Inter, centered hero, three cards. avoid-ai-design is a Claude Code skill that audits your frontend for these tells and rewrites them around one real design direction. Works on HTML/CSS and React/Tailwind/shadcn, with output from any model. Free and MIT.
```

**First maker comment:**
```
I kept fixing the same five things in every AI-built page, so I wrote them down. It grew into a catalog of design tells with a fix for each, plus a skill that applies them. The catalog is free to read even if you never install the skill. Would love to know which tells you'd add.
```

---

## Launch-day checklist

- [x] README has a before/after image near the top (the single biggest conversion lever)
- [x] Repo description and topics set (see `docs/SEO.md`)
- [x] Repo URL filled into every post and the README clone command
- [ ] Upload `docs/og-image.png` as the GitHub Social preview (Settings > General)
- [ ] Post the Show HN first; do not ask for upvotes (against the rules), just reply to every comment fast
- [ ] Post the X thread; reply to existing "AI slop" threads with the catalog link
- [ ] Post to r/ClaudeAI; answer questions in the comments
- [ ] Open the awesome-claude-code PR
- [ ] Submit to agentskills.io
- [ ] Pin the thread, add the repo to your X bio for the week

## Assets

- **Before/after image.** Done: `docs/before-after.png`, embedded at the top of the README. The asset that earns shares.
- **Social preview (1200×630).** Done: `docs/og-image.png`. Still needs uploading under repo Settings > General > Social preview so repo links unfurl with it.
- **Demo GIF** (for Product Hunt later): still needed. The skill auditing a page and rewriting it.

## What earns stars (and what doesn't)

- A catalog people screenshot earns stars. Vague claims do not.
- Replying to every comment in the first two hours earns stars. Posting and leaving does not.
- "Works on Codex and Cursor too, not just Claude" widens the audience. Keep it in.
- Never buy stars or ask for upvotes. It gets repos flagged and is easy to spot.


````
## Source: `docs/SEO.md`

````text
# SEO & discoverability

Maintainer notes for getting `avoid-ai-design` found. Copy-paste ready. Repo URL and author are filled in for funboy322.

For a deeper pass, the `ai-seo` skill covers AI-search/AEO optimization and `directory-submissions` covers the listing campaign.

---

## 1. GitHub repository metadata

The repo "About" blurb and topics are the single highest-impact SEO move for an open-source skill. Set them in the repo's right-hand sidebar.

**About (short, used in search results):**

> A Claude Code skill that audits AI-generated frontend and rewrites it to remove generic "AI slop" design patterns.

**About (longer alternate, if you prefer detail):**

> Audit and de-slop AI-generated UI. Detects and rewrites generic AI design patterns (purple gradients, Inter, centered heroes, default shadcn) in HTML/CSS and React/Tailwind. The design counterpart to avoid-ai-writing.

**Topics** (paste up to 20; all lowercase, hyphenated):

```
claude-code  claude-skill  agent-skills  agentskills  ai-slop  ai-design
frontend  frontend-design  ui-design  web-design  tailwindcss  shadcn-ui
react  design-system  llm  codex  cursor  ai-tools  anthropic  developer-tools
```

---

## 2. Keyword map

**Primary (own these):**
- `claude code skill`
- `avoid ai design`
- `remove ai slop`
- `de-slop ui`

**Secondary (work into headings and body):**
- ai-generated website looks generic
- make AI UI look less generic
- AI design patterns to avoid
- frontend design audit
- shadcn / Tailwind looks generic
- generic AI aesthetics

**Long-tail / question intent (the FAQ section targets these):**
- what is AI slop in design
- why do all AI websites look the same
- how to make AI-generated UI look less generic
- how to fix generic AI design

---

## 3. Page meta (for a docs site, GitHub Pages, or social cards)

**Title tag** (≤ 60 chars):

```
avoid-ai-design: Remove AI Slop From Frontend Code
```

**Meta description** (≤ 155 chars):

```
A Claude Code skill that audits AI-generated UI and rewrites it to remove generic "AI slop": purple gradients, Inter, centered heroes, default shadcn.
```

**Open Graph / Twitter Card:**

```html
<meta property="og:title" content="avoid-ai-design: Remove AI Slop From Frontend Code" />
<meta property="og:description" content="Audit and rewrite AI-generated UI so it stops looking AI-generated. A Claude Code skill for HTML/CSS and React/Tailwind/shadcn." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://github.com/funboy322/avoid-ai-design" />
<meta property="og:image" content="https://raw.githubusercontent.com/funboy322/avoid-ai-design/main/docs/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

**Social preview image** (`docs/og-image.png`, 1200×630): included in the repo. Upload it under **Settings > General > Social preview** so links to the repo unfurl with the card.

---

## 4. SKILL.md frontmatter (the most important SEO for the skill itself)

The `description` field is what makes Claude trigger the skill *and* what skill directories index. Keep it dense with the phrases users actually type. Recommended block for `SKILL.md`:

```yaml
---
name: avoid-ai-design
description: Audit and rewrite frontend UI to remove generic AI design patterns ("AI slop"). Use this skill when asked to "de-slop a UI", "make a design look less AI-generated", "audit a component or page for AI design tells", or "fix Claude/Codex-generated frontend that looks generic". Covers HTML/CSS and React/Tailwind/shadcn. Supports a detection-only mode that flags patterns without rewriting.
version: 0.2.0
license: MIT
compatibility: Any AI coding assistant that supports the agentskills.io SKILL.md format (Claude Code, Cursor, VS Code Copilot, Codex CLI, etc.). No external tools or APIs required; uses a screenshot tool if one is available.
metadata:
  author: ungspirit
  tags: design ui frontend ai-slop tailwind shadcn react
  agentskills_spec: "1.0"
---
```

---

## 5. Where to list it

Each listing is a backlink and a discovery surface. Rough order of effort vs. payoff:

- **agentskills.io**: the canonical SKILL.md registry. Submit here first.
- **GitHub topics**: set them (section 1); GitHub's own search and topic pages are real traffic.
- **awesome-claude-code** and **awesome-claude-skills** lists: open a PR adding your repo.
- **Claude Code plugin marketplaces** (the obra/superpowers ecosystem): package as a plugin later for one-command install.
- **Reddit**: r/ClaudeAI, r/cursor, r/ChatGPTCoding. Lead with the before/after, not the repo link.
- **X / Twitter**: post a before/after screenshot, tag #ClaudeCode #buildinpublic.
- **Hacker News**: "Show HN: A Claude skill that de-slops AI-generated UI".
- **Product Hunt**: optional, save for a polished v1 with a demo.

---

## 6. README keyword checklist

- [x] Primary keyword in the H1 and first sentence
- [x] Secondary keywords spread through section headings
- [x] Question-style FAQ headings for AEO (matches how people and AI search)
- [x] Keyword footer line
- [x] Repo URL and author filled in (funboy322)
- [x] Before/after screenshot embedded near the top of the README (`docs/before-after.png`)
- [x] Social preview image included (`docs/og-image.png`); upload via repo Settings


````
## Source: `examples/demo/_compare.html`

````text
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  :root{ --paper:#f4efe4; --accent:#e5402b; --mut:#a99d87; }
  html,body{ width:1600px; height:1040px; overflow:hidden; }
  body{ background:radial-gradient(1300px 600px at 50% -8%, #221a12, #131009 72%);
        font-family:"Helvetica Neue",Helvetica,Arial,sans-serif; color:var(--paper);
        -webkit-font-smoothing:antialiased; display:flex; flex-direction:column; }
  .top{ display:flex; justify-content:space-between; align-items:center; padding:40px 70px 0; }
  .wm{ font-size:25px; font-weight:700; letter-spacing:-.02em; }
  .wm b{ color:var(--accent); }
  .tag{ font-family:"SF Mono",Menlo,monospace; font-size:13px; letter-spacing:.16em; color:var(--mut); text-transform:uppercase; }
  .stage{ flex:1; display:flex; align-items:center; justify-content:center; gap:0; }
  .col{ display:flex; flex-direction:column; }
  .chip{ align-self:flex-start; margin:0 0 14px 2px; font-family:"SF Mono",Menlo,monospace; font-size:12px;
         font-weight:700; letter-spacing:.18em; padding:7px 13px; border-radius:7px; }
  .chip.b{ background:rgba(255,255,255,.07); color:#d8cab2; border:1px solid rgba(255,255,255,.18); }
  .chip.a{ background:var(--accent); color:#fff; }
  .panel{ position:relative; width:740px; height:856px; border-radius:14px; overflow:hidden;
          box-shadow:0 55px 95px -42px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.06); }
  .panel iframe{ width:1280px; height:1480px; border:0; transform:scale(.578); transform-origin:top left; }
  .arrow{ position:relative; top:18px; width:60px; height:60px; border-radius:50%; background:var(--accent); color:#fff;
          display:grid; place-items:center; font-size:26px; margin:0 -30px; z-index:5;
          box-shadow:0 18px 34px -10px rgba(229,64,43,.7); }
  .cap{ text-align:center; font-size:16px; color:var(--mut); padding:0 0 32px; }
  .cap b{ color:var(--paper); font-weight:600; }
</style>
</head>
<body>
  <div class="top">
    <div class="wm">avoid<b>-ai-</b>design</div>
    <div class="tag">one real site, run through the skill</div>
  </div>
  <div class="stage">
    <div class="col"><div class="chip b">AI-GENERATED</div><div class="panel"><iframe src="slop.html" scrolling="no"></iframe></div></div>
    <div class="arrow">&rarr;</div>
    <div class="col"><div class="chip a">AFTER AVOID-AI-DESIGN</div><div class="panel"><iframe src="refined.html" scrolling="no"></iframe></div></div>
  </div>
  <div class="cap"><b>Same product, same sections, same copy.</b>&nbsp; 22 tells found, audited, rewritten around one committed direction.</div>
</body>
</html>


````
## Source: `examples/demo/_og.html`

````text
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  :root{ --paper:#f4efe4; --accent:#e5402b; --mut:#a99d87; }
  html,body{ width:1200px; height:630px; overflow:hidden; }
  body{ background:radial-gradient(1000px 470px at 22% -12%, #241c12, #121009 70%); color:var(--paper);
        font-family:"Helvetica Neue",Helvetica,Arial,sans-serif; -webkit-font-smoothing:antialiased;
        padding:54px 58px; position:relative; letter-spacing:-.01em; }
  .top{ display:flex; justify-content:space-between; align-items:center; }
  .wm{ font-size:24px; font-weight:700; }
  .wm b{ color:var(--accent); }
  .meta{ font-family:"SF Mono",Menlo,monospace; font-size:12.5px; letter-spacing:.1em; color:var(--mut); }
  .eyebrow{ font-family:"SF Mono",Menlo,monospace; font-size:14px; letter-spacing:.2em; color:var(--accent);
            text-transform:uppercase; margin-top:60px; }
  h1{ font-weight:800; font-size:60px; line-height:1.01; letter-spacing:-.035em; margin-top:18px; }
  h1 .a{ color:var(--accent); }
  .sub{ font-size:18px; line-height:1.55; color:#ccc0aa; max-width:560px; margin-top:22px; }
  .chips{ position:absolute; left:58px; bottom:54px; display:flex; gap:10px; }
  .chips span{ font-family:"SF Mono",Menlo,monospace; font-size:12.5px; color:#d8cab2; padding:8px 13px;
               border:1px solid rgba(255,255,255,.16); border-radius:7px; }
  .mini{ position:absolute; right:58px; bottom:50px; display:flex; align-items:center; }
  .mp{ position:relative; width:212px; height:150px; border-radius:10px; overflow:hidden;
       box-shadow:0 30px 50px -24px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06); }
  .mp iframe{ width:1280px; height:905px; border:0; transform:scale(.1656); transform-origin:top left; }
  .ml{ position:absolute; top:8px; left:8px; font-family:"SF Mono",Menlo,monospace; font-size:9px; font-weight:700;
       letter-spacing:.1em; padding:4px 7px; border-radius:5px; }
  .ml.b{ background:rgba(10,8,5,.62); color:#d8cab2; } .ml.a{ background:var(--accent); color:#fff; }
  .marrow{ width:38px; height:38px; border-radius:50%; background:var(--accent); color:#fff; display:grid;
           place-items:center; font-size:17px; margin:0 -19px; z-index:4; box-shadow:0 10px 20px -6px rgba(229,64,43,.7); }
</style>
</head>
<body>
  <div class="top"><div class="wm">avoid<b>-ai-</b>design</div><div class="meta">SKILL.md · agentskills.io</div></div>
  <div class="eyebrow">// de-slop your frontend</div>
  <h1>Make AI-generated UI<br>look like a <span class="a">human</span> made it.</h1>
  <p class="sub">A Claude Code skill that audits your frontend and rewrites it around one committed design direction.</p>
  <div class="chips"><span>HTML / CSS</span><span>React · Tailwind · shadcn</span><span>detect + rewrite</span></div>
  <div class="mini">
    <div class="mp"><div class="ml b">BEFORE</div><iframe src="slop.html" scrolling="no"></iframe></div>
    <div class="marrow">&rarr;</div>
    <div class="mp"><div class="ml a">AFTER</div><iframe src="refined.html" scrolling="no"></iframe></div>
  </div>
</body>
</html>


````
## Source: `examples/demo/_x.html`

````text
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  :root{ --paper:#f4efe4; --accent:#e5402b; --mut:#a99d87; }
  html,body{ width:1600px; height:900px; overflow:hidden; }
  body{ background:radial-gradient(1300px 560px at 50% -10%, #221a12, #131009 74%);
        font-family:"Helvetica Neue",Helvetica,Arial,sans-serif; color:var(--paper);
        -webkit-font-smoothing:antialiased; display:flex; flex-direction:column; }
  .top{ display:flex; justify-content:space-between; align-items:center; padding:34px 60px 0; }
  .wm{ font-size:24px; font-weight:700; letter-spacing:-.02em; }
  .wm b{ color:var(--accent); }
  .tag{ font-family:"SF Mono",Menlo,monospace; font-size:13px; letter-spacing:.15em; color:var(--mut); text-transform:uppercase; }
  .stage{ flex:1; display:flex; align-items:center; justify-content:center; }
  .col{ display:flex; flex-direction:column; }
  .chip{ align-self:flex-start; margin:0 0 13px 2px; font-family:"SF Mono",Menlo,monospace; font-size:14px;
         font-weight:700; letter-spacing:.16em; padding:8px 15px; border-radius:8px; }
  .chip.b{ background:rgba(255,255,255,.08); color:#d8cab2; border:1px solid rgba(255,255,255,.2); }
  .chip.a{ background:var(--accent); color:#fff; }
  .panel{ position:relative; width:754px; height:690px; border-radius:14px; overflow:hidden;
          box-shadow:0 55px 95px -42px rgba(0,0,0,.78), 0 0 0 1px rgba(255,255,255,.07); }
  .panel iframe{ width:1280px; height:1171px; border:0; transform:scale(.589); transform-origin:top left; }
  .arrow{ position:relative; top:16px; width:64px; height:64px; border-radius:50%; background:var(--accent); color:#fff;
          display:grid; place-items:center; font-size:28px; margin:0 -32px; z-index:5;
          box-shadow:0 18px 34px -10px rgba(229,64,43,.75); }
</style>
</head>
<body>
  <div class="top">
    <div class="wm">avoid<b>-ai-</b>design</div>
    <div class="tag">one real site, audited and rewritten</div>
  </div>
  <div class="stage">
    <div class="col"><div class="chip b">AI-GENERATED</div><div class="panel"><iframe src="slop.html" scrolling="no"></iframe></div></div>
    <div class="arrow">&rarr;</div>
    <div class="col"><div class="chip a">AFTER THE SKILL</div><div class="panel"><iframe src="refined.html" scrolling="no"></iframe></div></div>
  </div>
</body>
</html>


````
## Source: `examples/demo/AUDIT.md`

````text
# Demo: avoid-ai-design run on a real AI-generated site

This is an actual run of the skill, start to finish, on one page. The "before" is
[`slop.html`](slop.html), a generic SaaS landing page of the kind AI tools produce
unprompted. The "after" is [`refined.html`](refined.html). **The product, sections, and
copy are identical between the two files** so the only variable is the design.

Both pages were rendered to pixels before auditing (the skill's step 2), so the visual
tells below are judged from the rendered page, not guessed from source.

---

## 1. Audit (`detect` mode output)

22 tells found. Grouped by severity. IDs reference [`../../references/ai-tells-catalog.md`](../../references/ai-tells-catalog.md).

### P0: screams AI on sight (5)

| ID | Where | Why it reads as AI |
|----|-------|--------------------|
| C1 | hero glow, buttons, stats panel, CTA band | The indigo-to-violet-to-pink gradient everywhere. The Purple Problem. No brand chose it. |
| C6 | `<h1>` "just works", stat numbers | `bg-clip-text` gradient text, the 2024 default flourish. |
| T1 | `body` | Inter / system stack for everything, no pairing, no display face. |
| L1 | hero | Pill badge + centered H1 + centered subhead + two centered CTAs: the default skeleton. |
| L2 | features | Three identical icon-topped cards, equal height and padding. |

### P1: obvious AI smell (12)

| ID | Where | Why it reads as AI |
|----|-------|--------------------|
| C2 | all primary buttons | Indigo/violet gradient CTAs, the accent defaulted instead of chosen. |
| K3 | nav | Glassmorphism (`backdrop-blur`) by reflex. |
| K2 | cards, mock, tiers | `rounded-2xl` + soft shadow on every surface. |
| K6 | feature cards | Icon (here emoji) sitting in a tinted rounded square. |
| K7 | every button/link | No real hover, focus, or active states. The polish gap. |
| I2 | features, footer | Emoji standing in for iconography (📊 ⚡ 🚀, 🐦 💼 🐙). |
| L4 | stats strip | "12,000+ / 8B / 4.9★ / 99.99%": round hollow proof. |
| L6 | whole page | One centered `max-width` shell for every section; no spatial decision. |
| L7 | pricing | Three tiers, middle one scaled + ringed + "Most Popular" gradient pill. |
| L8 | footer | Default four-column footer + newsletter input + social row. |
| IM | hero visual | A glassy gradient placeholder, not a real product view. |
| CP3 | hero & CTA band | `→` arrow glyphs welded to CTAs ("Start for free →"). |

### P2: cosmetic (5)

| ID | Where | Why it reads as AI |
|----|-------|--------------------|
| K5 | hero | "✨ Powered by AI" pill badge that announces nothing. |
| C5 | hero mock, buttons | Colored (indigo) glow shadows used as decoration. |
| T5 | logos label, footer | Reflexive all-caps letter-spaced micro-labels. |
| CP1 | headline, sections | Vague aspirational copy ("just works", "Ready to get started?"). |
| CP2 | subhead | "Seamlessly powerful, beautifully simple." Beige superlatives. |

---

## 2. Direction committed

**Editorial-technical (Swiss-leaning).** One idea, executed across the page:

- **Type:** Helvetica Neue throughout, heavy weight and tight tracking for display; a monospace (`SF Mono`) for labels, numerals, and eyebrows. No serif (a deliberate choice: the warm-serif look has itself become an AI default).
- **Palette:** warm paper + near-black ink + **one** signal color, a vermilion `#e5402b`. Mostly monochrome; the accent only marks what matters (active states, key numbers, one headline word).
- **Layout:** a strict grid. Asymmetric hero (copy left, real product view right). Hairline rules instead of cards. Numbered sections.
- **Motion:** none beyond a 1px button lift. A landing page does not need scroll theater.
- **Signature detail:** monospace labels + section numbers + the single vermilion accent on an otherwise quiet page.

Alternatives considered: industrial/utilitarian (too cold for a sales page), warm editorial (skipped to avoid the second-order-default trap).

---

## 3. What changed

- **Hero (C1, C6, L1, K5, IM):** dropped the gradient and the `✨` pill. Solid ink headline with one word in vermilion. Centered template replaced with a left-aligned grid; the glassy gradient blob replaced with a real dashboard view (KPIs + a line chart). Added three concrete proof points (No SQL / 5 min / SOC 2) instead of the badge.
- **Type (T1):** Inter to Helvetica Neue with a real weight scale; monospace for labels.
- **Features (L2, K2, K6, I2):** three identical shadow cards replaced with a three-column row on a hairline grid, numbered 01–03, no chips, no emoji.
- **Stats (L4, C6):** kept the numbers, moved them into a dark band for rhythm and contrast; mono labels, the accent on the deltas.
- **Pricing (L7):** removed the scale, the ring, and the gradient "Most Popular" pill. Pro is marked with a quiet mono "Recommended" label and a solid ink button.
- **Buttons (C2, K7):** gradient pills to solid ink with a real hover lift; ghost variant gets a real border.
- **Footer (L8):** four columns to a focused set; emoji social row to text links; a real newsletter field instead of the stock box.
- **Nav (K3):** glass to a solid bar with a hairline.

---

## 4. Re-audit and judgment

Re-ran the catalog over `refined.html`:

- **Zero P0 tells remain.** No gradient, no gradient text, no centered-hero template, no Inter, no identical-card row.
- **P1/P2 cleared:** glass, default footer, pricing ring, emoji, arrow glyphs, colored glows, the pill, all gone.
- **Knowingly left in scope:** **CP1 and CP2 (copy)**. The headline and subhead still read a bit generic. That is a *writing* problem, not a design one, so it is out of scope for this pass. Run the copy through the [`avoid-ai-writing`](https://github.com/conorbronsdon/avoid-ai-writing) skill to finish the job. Holding the copy constant is also what makes this a fair before/after.

Against the three success tests:

1. **Justified**: every change maps to a flagged tell above.
2. **Coherent**: Helvetica + mono + the single vermilion + the grid reinforce one editorial-technical idea.
3. **Not a re-run**: chose Swiss over the warm-editorial default on purpose, to avoid converging on the skill's own median.

Result: the same site, now with a point of view.


````
## Source: `examples/demo/refined.html`

````text
<!doctype html>
<!-- DEMO / after: the SAME site as slop.html (same product, sections, copy, links),
     rewritten by avoid-ai-design. One direction: Swiss/editorial-technical,
     ink + a single vermilion accent, Helvetica grotesque, strict grid, real dashboard mock.
     Substantive copy held identical to slop.html to isolate the DESIGN transformation. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cadence — product analytics</title>
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  :root{
    --paper:#f5f4f1; --ink:#15120d; --mut:#6c675e; --accent:#e5402b; --line:#e2ded5; --card:#fffffe;
    --sans:"Helvetica Neue",Helvetica,Arial,sans-serif; --mono:"SF Mono","Menlo",monospace;
  }
  body{ font-family:var(--sans); color:var(--ink); background:var(--paper); -webkit-font-smoothing:antialiased;
        letter-spacing:-.005em; }
  .wrap{ max-width:1180px; margin:0 auto; padding:0 36px; }
  a{ color:inherit; text-decoration:none; }
  .eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }
  .rule{ height:1px; background:var(--line); }

  /* nav */
  nav{ border-bottom:1px solid var(--line); background:var(--paper); position:sticky; top:0; z-index:10; }
  .nav-in{ display:flex; align-items:center; justify-content:space-between; height:72px; }
  .brand{ display:flex; align-items:center; gap:11px; font-weight:700; font-size:20px; letter-spacing:-.02em; }
  .brand .mk{ width:13px; height:13px; background:var(--accent); border-radius:2px; transform:rotate(45deg); }
  .nav-links{ display:flex; gap:32px; font-size:14.5px; color:#4c4840; font-weight:500; }
  .nav-r{ display:flex; align-items:center; gap:22px; }
  .nav-r .login{ font-size:14.5px; font-weight:600; }
  .btn{ background:var(--ink); color:var(--paper); font-weight:600; font-size:14px; padding:11px 19px; border-radius:7px;
        transition:transform .14s ease; display:inline-block; }
  .btn:hover{ transform:translateY(-1px); }
  .btn.lg{ padding:15px 26px; font-size:15.5px; }
  .ghost{ border:1px solid var(--ink); color:var(--ink); font-weight:600; font-size:15.5px; padding:14px 25px; border-radius:7px; display:inline-block; }

  /* hero */
  .hero{ padding:78px 0 30px; display:grid; grid-template-columns:1.05fr .95fr; gap:56px; align-items:center; }
  .hero h1{ font-size:64px; line-height:1.0; font-weight:800; letter-spacing:-.035em; margin:22px 0 24px; }
  .hero h1 .a{ color:var(--accent); }
  .hero .sub{ font-size:18.5px; line-height:1.6; color:var(--mut); max-width:440px; margin-bottom:34px; }
  .hero .cta{ display:flex; gap:16px; align-items:center; }
  .meta-row{ display:flex; gap:30px; margin-top:42px; }
  .meta-row .m{ }
  .meta-row .mv{ font-size:24px; font-weight:700; letter-spacing:-.02em; }
  .meta-row .ml{ font-family:var(--mono); font-size:11px; letter-spacing:.08em; color:var(--mut); text-transform:uppercase; margin-top:3px; }

  /* dashboard mock */
  .dash{ background:var(--card); border:1px solid var(--line); border-radius:10px; box-shadow:0 34px 60px -38px rgba(30,22,10,.5);
         overflow:hidden; }
  .dash .bar{ display:flex; align-items:center; gap:7px; padding:13px 15px; border-bottom:1px solid var(--line); }
  .dash .bar i{ width:9px; height:9px; border-radius:50%; background:#dcd8cf; }
  .dash .bar i:first-child{ background:var(--accent); }
  .dash .bar .t{ font-family:var(--mono); font-size:11px; color:var(--mut); margin-left:6px; }
  .dash .body{ padding:18px; }
  .dash .kpis{ display:flex; gap:26px; margin-bottom:16px; }
  .dash .kpi .v{ font-size:23px; font-weight:700; letter-spacing:-.02em; }
  .dash .kpi .v b{ color:var(--accent); font-weight:700; font-size:13px; margin-left:5px; }
  .dash .kpi .k{ font-family:var(--mono); font-size:10px; letter-spacing:.06em; color:var(--mut); text-transform:uppercase; margin-top:2px; }
  .dash svg{ display:block; width:100%; height:118px; }

  /* logos */
  .logos{ padding:34px 0; }
  .logos .lab{ font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--mut); margin-bottom:18px; }
  .logo-row{ display:flex; justify-content:space-between; align-items:center; }
  .logo-row span{ font-weight:700; font-size:19px; color:#3a362e; letter-spacing:-.02em; }

  /* sections */
  .sec{ padding:88px 0; }
  .sec-head{ display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:8px; }
  .sec-head h2{ font-size:38px; font-weight:800; letter-spacing:-.03em; max-width:560px; line-height:1.05; }
  .sec-head .n{ font-family:var(--mono); font-size:12px; color:var(--mut); letter-spacing:.1em; }

  /* features */
  .feats{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--ink); }
  .feat{ padding:30px 28px 8px; border-right:1px solid var(--line); }
  .feat:last-child{ border-right:0; padding-right:0; }
  .feat:first-child{ padding-left:0; }
  .feat .num{ font-family:var(--mono); font-size:13px; color:var(--accent); }
  .feat h3{ font-size:21px; font-weight:700; letter-spacing:-.02em; margin:18px 0 10px; }
  .feat p{ font-size:15px; line-height:1.6; color:var(--mut); max-width:280px; }

  /* stats (dark band for rhythm) */
  .statband{ background:var(--ink); color:var(--paper); }
  .statband .in{ display:grid; grid-template-columns:repeat(4,1fr); }
  .statband .s{ padding:54px 0; border-left:1px solid rgba(255,255,255,.12); padding-left:26px; }
  .statband .s:first-child{ border-left:0; padding-left:0; }
  .statband .v{ font-size:46px; font-weight:800; letter-spacing:-.03em; }
  .statband .v b{ color:var(--accent); font-weight:800; }
  .statband .l{ font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:rgba(245,244,241,.6); margin-top:8px; }

  /* pricing */
  .price{ display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--ink); }
  .tier{ padding:32px 28px; border-right:1px solid var(--line); position:relative; }
  .tier:last-child{ border-right:0; }
  .tier.pop{ background:var(--card); }
  .tier .rec{ font-family:var(--mono); font-size:10.5px; letter-spacing:.14em; color:var(--accent); text-transform:uppercase; height:14px; }
  .tier h3{ font-size:16px; font-weight:700; margin:10px 0 14px; }
  .tier .amt{ font-size:44px; font-weight:800; letter-spacing:-.03em; }
  .tier .amt small{ font-size:15px; color:var(--mut); font-weight:500; letter-spacing:0; }
  .tier ul{ list-style:none; margin:22px 0 26px; }
  .tier li{ font-size:14px; color:#4c4840; padding:7px 0 7px 20px; position:relative; border-bottom:1px solid var(--line); }
  .tier li:before{ content:"+"; position:absolute; left:0; color:var(--accent); font-weight:700; }
  .tier .pick{ display:block; text-align:center; padding:12px; border-radius:7px; font-weight:600; font-size:14px; }
  .tier .pick.out{ border:1px solid var(--ink); }
  .tier .pick.solid{ background:var(--ink); color:var(--paper); }

  /* cta */
  .cta2{ padding:96px 0; text-align:center; }
  .cta2 h2{ font-size:52px; font-weight:800; letter-spacing:-.035em; line-height:1.02; margin-bottom:18px; }
  .cta2 p{ font-size:18px; color:var(--mut); margin-bottom:32px; }

  /* footer */
  footer{ border-top:1px solid var(--ink); padding:56px 0 36px; }
  .foot{ display:grid; grid-template-columns:1.6fr 1fr 1fr 1.4fr; gap:30px; }
  .foot h4{ font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.1em; color:var(--mut); margin-bottom:16px; }
  .foot a{ display:block; color:#4c4840; font-size:14px; margin-bottom:11px; }
  .foot .news p{ color:var(--mut); font-size:14px; line-height:1.6; margin-bottom:14px; }
  .foot .news .nf{ display:flex; border:1px solid var(--ink); border-radius:7px; overflow:hidden; }
  .foot .news input{ flex:1; border:0; padding:11px 13px; font-size:13.5px; background:transparent; outline:none; font-family:var(--sans); }
  .foot .news button{ border:0; background:var(--ink); color:var(--paper); font-weight:600; font-size:13px; padding:0 16px; cursor:pointer; }
  .copy{ display:flex; justify-content:space-between; align-items:center; margin-top:42px; padding-top:22px; border-top:1px solid var(--line); color:var(--mut); font-size:13px; }
  .copy .soc{ display:flex; gap:18px; font-family:var(--mono); font-size:12px; letter-spacing:.04em; }
</style>
</head>
<body>
  <nav><div class="wrap nav-in">
    <div class="brand"><span class="mk"></span> Cadence</div>
    <div class="nav-links"><span>Product</span><span>Solutions</span><span>Pricing</span><span>Docs</span><span>Blog</span></div>
    <div class="nav-r"><span class="login">Log in</span><a class="btn">Get started</a></div>
  </div></nav>

  <header class="wrap hero">
    <div>
      <div class="eyebrow">Product analytics</div>
      <h1>Product analytics that <span class="a">just works</span></h1>
      <p class="sub">Cadence turns raw events into clear answers, so your team can ship with confidence instead of guesswork. Seamlessly powerful, beautifully simple.</p>
      <div class="cta"><a class="btn lg">Start for free</a><a class="ghost">Book a demo</a></div>
      <div class="meta-row">
        <div class="m"><div class="mv">No SQL</div><div class="ml">required</div></div>
        <div class="m"><div class="mv">5 min</div><div class="ml">to first chart</div></div>
        <div class="m"><div class="mv">SOC 2</div><div class="ml">compliant</div></div>
      </div>
    </div>
    <div class="dash">
      <div class="bar"><i></i><i></i><i></i><span class="t">cadence — weekly active</span></div>
      <div class="body">
        <div class="kpis">
          <div class="kpi"><div class="v">48,210<b>+12%</b></div><div class="k">Weekly active</div></div>
          <div class="kpi"><div class="v">3.4%<b>+0.6</b></div><div class="k">Conversion</div></div>
        </div>
        <svg viewBox="0 0 480 118" preserveAspectRatio="none">
          <polyline fill="none" stroke="#e2ded5" stroke-width="1" points="0,30 480,30"/>
          <polyline fill="none" stroke="#e2ded5" stroke-width="1" points="0,60 480,60"/>
          <polyline fill="none" stroke="#e2ded5" stroke-width="1" points="0,90 480,90"/>
          <polygon fill="rgba(229,64,43,.08)" points="0,96 40,86 90,90 140,70 190,76 240,52 300,58 360,36 420,40 480,22 480,118 0,118"/>
          <polyline fill="none" stroke="#e5402b" stroke-width="2.2" points="0,96 40,86 90,90 140,70 190,76 240,52 300,58 360,36 420,40 480,22"/>
          <circle cx="480" cy="22" r="3.4" fill="#e5402b"/>
        </svg>
      </div>
    </div>
  </header>

  <section class="wrap logos">
    <div class="lab">Trusted by fast-moving teams at</div>
    <div class="logo-row"><span>Northwind</span><span>Lumen</span><span>Vertex</span><span>Quanta</span><span>Beacon</span><span>Atlas</span></div>
  </section>

  <section class="wrap sec">
    <div class="sec-head"><h2>Everything you need to understand your users</h2><span class="n">/ features</span></div>
    <div class="feats">
      <div class="feat"><div class="num">01</div><h3>Live dashboards</h3><p>Watch events stream in and build views without writing a single line of SQL.</p></div>
      <div class="feat"><div class="num">02</div><h3>Funnels &amp; retention</h3><p>See exactly where users drop off and what brings them back, in seconds.</p></div>
      <div class="feat"><div class="num">03</div><h3>Team workspaces</h3><p>Share boards, annotate changes, and keep everyone aligned around the data.</p></div>
    </div>
  </section>

  <section class="statband"><div class="wrap in">
    <div class="s"><div class="v">12,000<b>+</b></div><div class="l">Teams onboard</div></div>
    <div class="s"><div class="v">8B</div><div class="l">Events / month</div></div>
    <div class="s"><div class="v">4.9</div><div class="l">Average rating</div></div>
    <div class="s"><div class="v">99.99<b>%</b></div><div class="l">Uptime SLA</div></div>
  </div></section>

  <section class="wrap sec">
    <div class="sec-head"><h2>Simple, transparent pricing</h2><span class="n">/ pricing</span></div>
    <div class="price">
      <div class="tier"><div class="rec"></div><h3>Starter</h3><div class="amt">$0</div><ul><li>Up to 5k events</li><li>2 dashboards</li><li>7-day history</li><li>Community support</li></ul><a class="pick out">Get started</a></div>
      <div class="tier pop"><div class="rec">Recommended</div><h3>Pro</h3><div class="amt">$29<small> / mo</small></div><ul><li>Up to 1M events</li><li>Unlimited dashboards</li><li>1-year history</li><li>Funnels &amp; retention</li><li>Priority support</li></ul><a class="pick solid">Start free trial</a></div>
      <div class="tier"><div class="rec"></div><h3>Scale</h3><div class="amt">$99<small> / mo</small></div><ul><li>Unlimited events</li><li>SSO &amp; roles</li><li>Unlimited history</li><li>Dedicated CSM</li></ul><a class="pick out">Contact sales</a></div>
    </div>
  </section>

  <section class="wrap cta2">
    <h2>Ready to get started?</h2>
    <p>Join thousands of teams shipping smarter with Cadence.</p>
    <a class="btn lg">Start for free</a>
  </section>

  <footer><div class="wrap">
    <div class="foot">
      <div><div class="brand" style="margin-bottom:14px"><span class="mk"></span> Cadence</div><p style="color:var(--mut);font-size:14px;line-height:1.6;max-width:240px">Product analytics for fast-moving teams.</p></div>
      <div><h4>Product</h4><a>Features</a><a>Integrations</a><a>Pricing</a><a>Changelog</a></div>
      <div><h4>Company</h4><a>About</a><a>Careers</a><a>Customers</a><a>Contact</a></div>
      <div class="news"><h4>Stay in the loop</h4><p>Product notes and the occasional deep dive. No noise.</p><div class="nf"><input placeholder="you@company.com"><button>Subscribe</button></div></div>
    </div>
    <div class="copy"><span>© 2026 Cadence, Inc.</span><span class="soc"><a>X</a><a>LinkedIn</a><a>GitHub</a></span></div>
  </div></footer>
</body>
</html>


````
## Source: `examples/demo/slop.html`

````text
<!doctype html>
<!-- DEMO / slop-example: a deliberately generic, AI-generated SaaS landing page.
     Same product and copy as refined.html; this is the "before". Bad on purpose. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cadence — product analytics</title>
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  :root{ --indigo:#6366f1; --violet:#a855f7; --ink:#0f172a; --muted:#64748b; --line:#e2e8f0; }
  body{ font-family: Inter, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif; color:var(--ink);
        background:#ffffff; -webkit-font-smoothing:antialiased; }
  .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
  a{ color:inherit; text-decoration:none; }
  .gtext{ background:linear-gradient(110deg,#6366f1,#a855f7 55%,#ec4899); -webkit-background-clip:text;
          background-clip:text; color:transparent; }
  .gbtn{ background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; font-weight:600;
         border-radius:12px; box-shadow:0 12px 26px -10px rgba(99,102,241,.6); }

  /* nav (glassmorphism) */
  nav{ position:sticky; top:0; z-index:10; backdrop-filter:blur(12px); background:rgba(255,255,255,.7);
       border-bottom:1px solid rgba(226,232,240,.7); }
  .nav-in{ display:flex; align-items:center; justify-content:space-between; height:68px; }
  .brand{ display:flex; align-items:center; gap:10px; font-weight:700; font-size:19px; }
  .brand .mk{ width:32px; height:32px; border-radius:9px; background:linear-gradient(135deg,var(--indigo),var(--violet));
              display:grid; place-items:center; color:#fff; font-size:16px; }
  .nav-links{ display:flex; gap:30px; color:#475569; font-weight:500; font-size:15px; }
  .nav-r{ display:flex; align-items:center; gap:18px; }
  .nav-r .login{ color:#475569; font-weight:600; font-size:15px; }
  .gbtn.sm{ padding:9px 18px; font-size:14.5px; }

  /* hero */
  .hero{ text-align:center; padding:84px 0 60px;
         background:radial-gradient(680px 320px at 50% -40px, rgba(168,85,247,.16), transparent 70%); }
  .pill{ display:inline-flex; gap:7px; align-items:center; background:rgba(99,102,241,.1); color:#6366f1;
         font-weight:600; font-size:13.5px; padding:7px 15px; border-radius:999px; margin-bottom:24px; }
  h1{ font-size:60px; line-height:1.07; font-weight:800; letter-spacing:-.025em; margin-bottom:22px; }
  .sub{ font-size:20px; line-height:1.6; color:var(--muted); max-width:600px; margin:0 auto 32px; }
  .hero-cta{ display:flex; gap:14px; justify-content:center; margin-bottom:52px; }
  .gbtn.lg{ padding:15px 28px; font-size:16px; }
  .ghost{ padding:15px 28px; font-size:16px; font-weight:600; border:1px solid var(--line); border-radius:12px; background:#fff; }
  /* glassy product mock with colored glow */
  .shot{ position:relative; max-width:920px; margin:0 auto; border-radius:18px;
         background:linear-gradient(135deg, rgba(99,102,241,.14), rgba(168,85,247,.14));
         border:1px solid rgba(226,232,240,.9); box-shadow:0 40px 80px -30px rgba(99,102,241,.45); padding:14px; }
  .shot .pane{ height:300px; border-radius:12px; background:#fff; box-shadow:0 1px 0 rgba(15,23,42,.04) inset;
               display:grid; grid-template-columns:180px 1fr; overflow:hidden; }
  .shot .side{ background:#fafafa; border-right:1px solid var(--line); padding:16px; }
  .shot .row{ height:9px; border-radius:5px; background:#eef2f7; margin-bottom:11px; }
  .shot .row.s{ width:60%; } .shot .row.a{ background:rgba(99,102,241,.25); width:75%; }
  .shot .main{ padding:18px; }
  .shot .bars{ display:flex; align-items:flex-end; gap:12px; height:150px; margin-top:18px; }
  .shot .bars i{ flex:1; border-radius:7px 7px 0 0; background:linear-gradient(180deg,var(--violet),var(--indigo)); }

  /* logos */
  .logos{ padding:42px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .logos p{ text-align:center; color:#94a3b8; font-size:13px; font-weight:600; letter-spacing:.08em;
            text-transform:uppercase; margin-bottom:22px; }
  .logo-row{ display:flex; justify-content:space-between; align-items:center; opacity:.55; }
  .logo-row span{ font-weight:800; font-size:21px; color:#475569; letter-spacing:-.02em; }

  /* features */
  .sec{ padding:84px 0; }
  .sec-h{ text-align:center; margin-bottom:54px; }
  .sec-h h2{ font-size:40px; font-weight:800; letter-spacing:-.02em; margin-bottom:14px; }
  .sec-h p{ font-size:18px; color:var(--muted); }
  .cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .card{ background:#fff; border:1px solid var(--line); border-radius:16px; padding:30px;
         box-shadow:0 18px 40px -26px rgba(15,23,42,.25); }
  .card .ic{ width:52px; height:52px; border-radius:13px; background:rgba(99,102,241,.1); display:grid;
             place-items:center; font-size:24px; margin-bottom:18px; }
  .card h3{ font-size:20px; font-weight:700; margin-bottom:10px; }
  .card p{ color:var(--muted); font-size:15px; line-height:1.6; }

  /* stats */
  .stats{ background:linear-gradient(135deg,#eef2ff,#faf5ff); border-radius:20px; padding:46px;
          display:grid; grid-template-columns:repeat(4,1fr); gap:20px; text-align:center; }
  .stats .n{ font-size:42px; font-weight:800; letter-spacing:-.02em; }
  .stats .l{ color:var(--muted); font-size:14.5px; margin-top:6px; }

  /* pricing */
  .price{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:start; }
  .tier{ background:#fff; border:1px solid var(--line); border-radius:18px; padding:32px; }
  .tier.pop{ border:2px solid var(--indigo); transform:scale(1.05); box-shadow:0 30px 60px -28px rgba(99,102,241,.5); position:relative; }
  .pop-badge{ position:absolute; top:-13px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,var(--indigo),var(--violet));
              color:#fff; font-size:12px; font-weight:700; padding:6px 14px; border-radius:999px; }
  .tier h3{ font-size:18px; font-weight:700; margin-bottom:8px; }
  .tier .amt{ font-size:46px; font-weight:800; letter-spacing:-.02em; }
  .tier .amt small{ font-size:16px; color:var(--muted); font-weight:600; }
  .tier ul{ list-style:none; margin:22px 0; }
  .tier li{ color:#475569; font-size:14.5px; padding:8px 0 8px 26px; position:relative; }
  .tier li:before{ content:"✓"; position:absolute; left:0; color:var(--indigo); font-weight:800; }
  .tier .pick{ display:block; text-align:center; padding:13px; border-radius:11px; font-weight:600; }
  .tier .pick.out{ border:1px solid var(--line); }

  /* cta band */
  .cta{ margin:30px 0; border-radius:24px; padding:64px; text-align:center;
        background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; }
  .cta h2{ font-size:38px; font-weight:800; letter-spacing:-.02em; margin-bottom:14px; }
  .cta p{ opacity:.9; font-size:18px; margin-bottom:28px; }
  .cta .b{ display:inline-block; background:#fff; color:var(--indigo); font-weight:700; padding:15px 30px; border-radius:12px; }

  /* footer */
  footer{ border-top:1px solid var(--line); padding:60px 0 40px; }
  .foot{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr 1.2fr; gap:28px; }
  .foot h4{ font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:#94a3b8; margin-bottom:16px; }
  .foot a{ display:block; color:#475569; font-size:14.5px; margin-bottom:10px; }
  .foot .news input{ width:100%; padding:10px 12px; border:1px solid var(--line); border-radius:9px; font-size:14px; margin-bottom:10px; }
  .foot .news .gbtn{ display:block; text-align:center; padding:10px; font-size:14px; }
  .copy{ display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:24px;
         border-top:1px solid var(--line); color:#94a3b8; font-size:13.5px; }
  .copy .soc{ display:flex; gap:14px; font-size:16px; }
</style>
</head>
<body>
  <nav><div class="wrap nav-in">
    <div class="brand"><span class="mk">◆</span> Cadence</div>
    <div class="nav-links"><span>Product</span><span>Solutions</span><span>Pricing</span><span>Docs</span><span>Blog</span></div>
    <div class="nav-r"><span class="login">Log in</span><a class="gbtn sm">Get Started</a></div>
  </div></nav>

  <header class="hero"><div class="wrap">
    <div class="pill">✨ Powered by AI</div>
    <h1>Product analytics that <span class="gtext">just works</span></h1>
    <p class="sub">Cadence turns raw events into clear answers, so your team can ship with confidence instead of guesswork. Seamlessly powerful, beautifully simple.</p>
    <div class="hero-cta"><a class="gbtn lg">Start for free →</a><a class="ghost">Book a demo</a></div>
    <div class="shot"><div class="pane">
      <div class="side"><div class="row a"></div><div class="row s"></div><div class="row"></div><div class="row s"></div><div class="row"></div></div>
      <div class="main"><div class="row a" style="width:40%"></div><div class="bars"><i style="height:55%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:95%"></i><i style="height:65%"></i><i style="height:78%"></i></div></div>
    </div></div>
  </div></header>

  <section class="logos"><div class="wrap">
    <p>Trusted by fast-moving teams at</p>
    <div class="logo-row"><span>Northwind</span><span>Lumen</span><span>Vertex</span><span>Quanta</span><span>Beacon</span><span>Atlas</span></div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><h2>Everything you need to understand your users</h2><p>Powerful features that scale with your team.</p></div>
    <div class="cards">
      <div class="card"><div class="ic">📊</div><h3>Live dashboards</h3><p>Watch events stream in and build views without writing a single line of SQL.</p></div>
      <div class="card"><div class="ic">⚡</div><h3>Funnels & retention</h3><p>See exactly where users drop off and what brings them back, in seconds.</p></div>
      <div class="card"><div class="ic">🚀</div><h3>Team workspaces</h3><p>Share boards, annotate changes, and keep everyone aligned around the data.</p></div>
    </div>
  </div></section>

  <section style="padding:20px 0 84px"><div class="wrap"><div class="stats">
    <div><div class="n gtext">12,000+</div><div class="l">Teams onboard</div></div>
    <div><div class="n gtext">8B</div><div class="l">Events / month</div></div>
    <div><div class="n gtext">4.9★</div><div class="l">Average rating</div></div>
    <div><div class="n gtext">99.99%</div><div class="l">Uptime SLA</div></div>
  </div></div></section>

  <section class="sec" style="padding-top:20px"><div class="wrap">
    <div class="sec-h"><h2>Simple, transparent pricing</h2><p>Start free. Upgrade when you grow.</p></div>
    <div class="price">
      <div class="tier"><h3>Starter</h3><div class="amt">$0</div><ul><li>Up to 5k events</li><li>2 dashboards</li><li>7-day history</li><li>Community support</li></ul><a class="pick out">Get started</a></div>
      <div class="tier pop"><div class="pop-badge">Most Popular</div><h3>Pro</h3><div class="amt">$29<small>/mo</small></div><ul><li>Up to 1M events</li><li>Unlimited dashboards</li><li>1-year history</li><li>Funnels & retention</li><li>Priority support</li></ul><a class="gbtn pick">Start free trial</a></div>
      <div class="tier"><h3>Scale</h3><div class="amt">$99<small>/mo</small></div><ul><li>Unlimited events</li><li>SSO & roles</li><li>Unlimited history</li><li>Dedicated CSM</li></ul><a class="pick out">Contact sales</a></div>
    </div>
  </div></section>

  <section><div class="wrap"><div class="cta">
    <h2>Ready to get started?</h2>
    <p>Join thousands of teams shipping smarter with Cadence.</p>
    <a class="b">Start for free →</a>
  </div></div></section>

  <footer><div class="wrap">
    <div class="foot">
      <div><div class="brand" style="margin-bottom:14px"><span class="mk">◆</span> Cadence</div><p style="color:#94a3b8;font-size:14px;line-height:1.6">Product analytics for fast-moving teams.</p></div>
      <div><h4>Product</h4><a>Features</a><a>Integrations</a><a>Pricing</a><a>Changelog</a></div>
      <div><h4>Company</h4><a>About</a><a>Careers</a><a>Customers</a><a>Contact</a></div>
      <div><h4>Resources</h4><a>Docs</a><a>Blog</a><a>Guides</a><a>API</a></div>
      <div class="news"><h4>Stay in the loop</h4><input placeholder="you@company.com"><a class="gbtn">Subscribe</a></div>
    </div>
    <div class="copy"><span>© 2026 Cadence, Inc. All rights reserved.</span><span class="soc">🐦 💼 🐙</span></div>
  </div></footer>
</body>
</html>


````
## Source: `LICENSE`

````text
MIT License

Copyright (c) 2026 ungspirit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


````
## Source: `README.md`

````text
<!-- SEO: title + meta description live in docs/SEO.md -->

# avoid-ai-design

**A Claude Code skill that audits AI-generated frontend code and rewrites it so it stops looking AI-generated.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![SKILL.md spec](https://img.shields.io/badge/SKILL.md-agentskills.io%201.0-555.svg)](https://agentskills.io)
[![Works with Claude Code](https://img.shields.io/badge/Claude%20Code-ready-d97757.svg)](https://claude.com/claude-code)
[![Also works with](https://img.shields.io/badge/Cursor%20%C2%B7%20Codex%20%C2%B7%20Copilot-compatible-8b5cf6.svg)](#compatibility)

<p align="center">
  <img src="docs/before-after.png" alt="The same SaaS landing page, before and after. Left, labeled AI-generated: a purple-to-blue gradient hero with gradient headline text, a sparkle pill badge, a glassy chart mock, and three emoji feature cards. Right, after avoid-ai-design: the exact same product, sections, and copy, rewritten in a Swiss editorial style with ink and one vermilion accent, Helvetica, a strict grid, a real dashboard view, and numbered features." width="100%">
</p>

<p align="center"><sub><i>One real site, run through the skill. Same product, same sections, same copy, only the design changed. The pages and the full audit live in <a href="examples/demo/">examples/demo/</a>.</i></sub></p>

Ask Claude, Codex, or any model to "build a landing page" and you get the same page every time: a purple-to-blue gradient on white, Inter for every word, a centered hero with three rounded feature cards, and a glassy navbar. `avoid-ai-design` is the cleanup pass. It reads the frontend an AI just produced, flags the patterns that give it away, and rewrites the interface around one committed design direction.

It is the design counterpart to [`avoid-ai-writing`](https://github.com/conorbronsdon/avoid-ai-writing): same idea, applied to UI instead of prose.

---

## The problem: AI design converges

Large language models are trained toward the average, so their UI output clusters around a handful of safe defaults. The result is recognizable on sight, the visual equivalent of "delve" and "in today's fast-paced world":

- **Type** that is always Inter, Roboto, or the system stack, with no pairing and no display face.
- **Color** that is a purple or indigo gradient fading into blue, on a white or near-black background.
- **Layout** that centers everything: hero, subhead, two buttons, then a three-card feature grid.
- **Components** wrapped in `rounded-2xl`, `shadow-lg`, and `backdrop-blur`, lifted straight from the shadcn defaults with the zinc palette untouched.
- **Copy** that opens with "Elevate your workflow" and ends with a "Get Started" button.

None of these are wrong on their own. Together, on every page, they read as machine-made. This skill names each tell and gives you a concrete way out.

## What it catches

The full catalog lives in [`references/ai-tells-catalog.md`](references/ai-tells-catalog.md). Each entry pairs a detection signal with a fix for plain HTML/CSS and a fix for React + Tailwind + shadcn.

| Category | Example tells |
|---|---|
| **Typography** | Inter / Roboto / system default, no display face, the overused "safe" pick (Space Grotesk) treated as a non-choice |
| **Color** | purple-to-blue gradient on white, gradient `bg-clip-text` headline text, untouched shadcn `zinc`/`slate`, timid evenly-spread palettes, default Tailwind `blue-600` buttons |
| **Layout** | centered hero, the hero + three-feature-cards + CTA template, the default page shell, three-tier pricing rings, the four-column footer, zero asymmetry |
| **Components** | `rounded-2xl shadow-lg` on everything, glassmorphism by reflex, icon-in-a-rounded-square, default Card/Button with no styling |
| **Spacing** | uniform `gap-4` / `p-6` with no spatial hierarchy |
| **Motion** | none at all, or the same `fade-in-up` on every element |
| **Icons** | the worn `lucide` set (`Sparkles`+AI, `ArrowRight`, `Zap`), emoji used as feature bullets |
| **Copy** | "Elevate / Seamless / Powerful", arrow glyphs welded to buttons, generic CTAs, filler microcopy |
| **Imagery** | gradient placeholders, DiceBear avatars, generic stock-photo energy |

## Two modes

| Mode | What it does | When to use |
|---|---|---|
| `rewrite` *(default)* | Audit, propose a direction, then rewrite the code | You want the UI fixed |
| `detect` | Audit and score only, no edits | You want to see the tells and decide yourself, or you are reviewing code you should not change |

Trigger `detect` with phrases like "just audit", "flag only", "don't change the code", or "scan this for AI tells".

## How it works

1. **Scope.** Identify what you are auditing (a component, a page, a whole app), the stack, and the mode.
2. **Audit.** Read your code, and render the UI when a screenshot tool is available, then report each tell with its location, category, severity, and *why it reads as AI*. Visual tells (palette weight, spacing rhythm, motion) need the render; without one they are flagged as lower-confidence.
3. **Direction.** Commit to one concrete aesthetic direction for the artifact (for example brutalist editorial, warm editorial pastel, or refined luxury), named with three to five defining moves. You confirm it before any code changes.
4. **Calibrate.** A small component or anything inside an existing design system gets a surgical pass that preserves structure. A standalone page or marketing artifact gets a bold rebuild around the chosen direction.
5. **Rewrite.** Edit the real files. Functionality, props, data flow, accessibility, and the meaning of your copy stay intact. New dependencies are called out, never added silently.
6. **Re-audit.** Run the catalog again over the result and report what survived. The target is zero P0 tells.

### Severity tiers

- **P0** screams AI on sight: the purple-to-blue gradient, Inter everywhere, the centered hero-plus-three-cards template, untouched shadcn zinc, reflexive glassmorphism.
- **P1** is the obvious AI smell: `rounded-2xl shadow-lg` on every surface, icon-in-rounded-square, emoji feature bullets, default blue buttons, "Elevate your…" copy.
- **P2** is cosmetic: flat uniform spacing, missing or copy-paste motion.

Quick passes fix P0 and P1. A full audit covers all three.

## See it work on a real page

[`examples/demo/`](examples/demo/) is an actual end-to-end run of the skill on one generic AI-built SaaS page, not two hand-made mockups:

- [`slop.html`](examples/demo/slop.html): the page an AI tool produces unprompted (the "before").
- [`refined.html`](examples/demo/refined.html): the same product, sections, and copy after the skill (the "after"). Only the design changed.
- [`AUDIT.md`](examples/demo/AUDIT.md): the real audit: 22 tells found by severity, the one direction committed to, and every change made.

Full-page screenshots: [before](docs/demo-before.png) and [after](docs/demo-after.png).

## Install

Clone into your agent's skills directory. `~/.agents/skills/` is the cross-client convention, so Claude Code, Cursor, Codex, and other compatible tools all pick it up:

```bash
git clone https://github.com/funboy322/avoid-ai-design.git ~/.agents/skills/avoid-ai-design
```

Claude Code also reads `~/.claude/skills/`:

```bash
git clone https://github.com/funboy322/avoid-ai-design.git ~/.claude/skills/avoid-ai-design
```

For a single project instead of globally, clone into `.agents/skills/` (or `.claude/skills/`) under the repo root.

Then start (or restart) Claude Code and confirm it loaded:

```
/skills
```

You should see `avoid-ai-design` in the list. No build step, no dependencies.

## Use it

Once installed, just ask in plain language. The skill triggers on intent, not a fixed command:

```
de-slop this landing page
make this component look less AI-generated
audit App.tsx for AI design tells, don't change anything
this dashboard looks generic, give it a real point of view
```

You can also name a direction up front ("rewrite this as brutalist editorial") or let the skill propose one.

## Compatibility

`avoid-ai-design` is a plain [`SKILL.md`](https://agentskills.io) file with two reference documents. It needs no external tools, APIs, or keys, so it runs anywhere the format is supported:

- Claude Code (CLI, desktop, web, IDE extensions)
- Cursor
- OpenAI Codex CLI
- GitHub Copilot (VS Code)
- Any other agent that reads the agentskills.io `SKILL.md` format

## How it differs from `frontend-design`

Anthropic's [`frontend-design`](https://github.com/anthropics/skills/tree/main/skills/frontend-design) skill generates distinctive UI **from scratch**, when you are starting a new component. `avoid-ai-design` works on code that **already exists**: it audits, scores, and rewrites output you (or another model) already produced. Use `frontend-design` to write, `avoid-ai-design` to fix. They share a goal and complement each other.

## FAQ

**What is "AI slop" in web design?**
The cluster of default visual choices that AI tools reach for unprompted: purple-to-blue gradients, Inter, centered heroes with three feature cards, untouched shadcn components, and glassmorphism everywhere. It is generic because the model is averaging across its training data.

**How do I make AI-generated UI look less generic?**
Replace the defaults with intentional choices: a distinctive type pairing, a dominant color with a sharp accent instead of a timid gradient, an asymmetric layout, and motion that serves one or two key moments. This skill does that for you, or flags exactly what to change in `detect` mode.

**Does it work with code from Codex and other models, not just Claude?**
Yes. The tells are model-agnostic because the convergence is. It catches the same patterns regardless of which assistant wrote them.

**Will it break my working code?**
No. The rewrite preserves functionality, props, state, routing, accessibility, and the meaning of your copy. Inside an existing design system it stays surgical and respects your tokens. If the UI is already distinctive, it tells you and stops rather than inventing problems.

**Do I need to install anything else?**
No. It is a single skill folder with no dependencies.

## Repository layout

```
avoid-ai-design/
├── SKILL.md                          # workflow, modes, calibration, severity, output format
├── references/
│   ├── ai-tells-catalog.md           # the catalog, by category, with HTML and React fixes
│   └── aesthetic-directions.md       # bold directions to choose from, and how to commit
├── README.md
├── LICENSE
└── docs/
    └── SEO.md                        # discoverability notes for maintainers
```

## Contributing

Found a tell the catalog misses? Open a pull request that adds it to [`references/ai-tells-catalog.md`](references/ai-tells-catalog.md) in the existing format: the detection signal, why it reads as AI, and a fix for both HTML/CSS and React/Tailwind. Real before-and-after examples are welcome.

## License

[MIT](LICENSE).

---

<sub>**Keywords:** Claude Code skill · remove AI slop · de-slop UI · AI design patterns · generic AI aesthetics · AI-generated website detector · frontend design audit · Tailwind / shadcn / React · Codex · agentskills.io · avoid AI design.</sub>


````
## Source: `references/aesthetic-directions.md`

````text
# Aesthetic directions

A working palette of directions to commit to in step 3 of the rewrite. The goal is to replace "no decision" with one clear point of view. Pick the direction the artifact's purpose and audience earn, then execute it precisely.

## How to commit

1. Read the product: what it does, who uses it, the feeling it should leave.
2. Pick **one** direction below (or a deliberate blend of two). Do not hedge across three.
3. Name the defining moves before you write code: **type pairing, palette stance, layout stance, motion idea, one signature detail.**
4. Calibrate intensity to the artifact (see the skill's calibration rule). A landing page can be loud; a settings panel should be quiet and exact.

**Vary across runs.** The fastest way to make this skill produce its own slop is to reach for the same "safe distinctive" direction every time (editorial serif, warm minimal, the one off-white palette). Treat repetition across projects as a tell. If the last rewrite was warm-editorial, this one should not be.

Fonts named below are examples, not mandates. Substitute within the spirit of the direction.

---

## 1. Brutalist / raw
**Fits:** dev tools, indie products, anything that wants to feel honest and un-corporate.
**Type:** a single strong grotesque (Helvetica Now, Aktiv Grotesk) or a mono (Berkeley Mono, Commit Mono). Big, tight, confident.
**Palette:** high contrast. Black on off-white, or one loud primary. Minimal color.
**Layout:** visible grid, hard edges, no rounded corners, exposed structure. Borders over shadows.
**Motion:** little to none, or instant/snappy.
**Signature:** oversized type, a raw `1px` border system, unstyled-but-intentional.

## 2. Editorial / magazine
**Fits:** content products, writing tools, brands with a voice.
**Type:** a serif/sans contrast done fully. Display serif (Fraunces, GT Sectra, Tiempos Headline) with a clean body sans (Untitled, Söhne).
**Palette:** paper and ink, one accent. Restrained.
**Layout:** asymmetric editorial grid, pull quotes, drop caps, generous measure, off-center compositions.
**Motion:** subtle, typographic.
**Signature:** real typographic hierarchy, columns, a masthead feel. (Note: a *one-word* serif italic in a sans headline is a tell, see catalog T3. Commit to the contrast fully or not at all.)

## 3. Swiss / International typographic
**Fits:** data products, dashboards, anything that values clarity.
**Type:** one neutral grotesque at several weights (Neue Haas Grotesk, Inter *only if* used with real rigor).
**Palette:** mostly monochrome, one signal color (often red) used only for emphasis.
**Layout:** a strict modular grid, flush-left, mathematical spacing, lots of whitespace as structure.
**Motion:** minimal, functional.
**Signature:** discipline. The grid is the design.

## 4. Retro-futuristic / Y2K / synth
**Fits:** creative tools, music, gaming, launches that want energy.
**Type:** a technical or display face with character (Departure Mono, a wide sans, a chrome display).
**Palette:** dark base with electric accents, or saturated period color. CRT, chrome, neon, used coherently (not the AI "purple glow").
**Layout:** HUD framing, scanlines, grids with depth.
**Motion:** glitch, flicker, terminal-typing, used with restraint.
**Signature:** a coherent era reference, not a sticker pile.

## 5. Organic / natural
**Fits:** wellness, food, sustainability, calm products.
**Type:** humanist sans (Hanken Grotesk, Mr Eaves) or a soft serif.
**Palette:** earth tones, muted greens and clays, warm neutrals. No pure white, no pure black.
**Layout:** soft asymmetry, generous negative space, hand-placed feel.
**Motion:** slow, eased, breathing.
**Signature:** texture (grain, paper), organic shapes that are specific rather than the AI 3D blob.

## 6. Luxury / refined
**Fits:** premium brands, finance, high-end services.
**Type:** a high-contrast serif (Canela, GT Super) with a quiet sans.
**Palette:** deep, restrained. One rich dark, warm metallics or a single jewel tone. Lots of space.
**Layout:** centered can work here when it reads as poise, not default. Wide margins, small confident type, slow reveal.
**Motion:** slow fades, deliberate.
**Signature:** restraint and space as a flex. Nothing rushed.

## 7. Playful / toy
**Fits:** consumer apps, kids, social, anything joyful.
**Type:** a rounded or characterful display (a chunky rounded sans), generous weight.
**Palette:** bright, confident, a real color story (not the timid even spread, see catalog C4).
**Layout:** bouncy, overlapping elements, stickers, depth, big touch targets.
**Motion:** springy, bouncy, reactive.
**Signature:** personality, mascots or marks with a point of view.

## 8. Art deco / geometric
**Fits:** events, hospitality, premium consumer.
**Type:** a geometric display (a deco-influenced face), tall and elegant.
**Palette:** two or three colors with metallic or deep contrast.
**Layout:** symmetry done *intentionally*, strong geometric motifs, framing lines, repeated patterns.
**Motion:** elegant, geometric reveals.
**Signature:** a repeated geometric motif that becomes the brand.

## 9. Industrial / utilitarian / technical
**Fits:** infrastructure, B2B, engineering tools.
**Type:** a mono or a technical grotesque, small and dense.
**Palette:** greyscale with one functional accent, status colors that mean something.
**Layout:** dense, table-driven, information-first, tight spacing where density helps.
**Motion:** near none.
**Signature:** labels, technical readouts, a spec-sheet feel. Density as honesty.

## 10. Maximalist
**Fits:** culture, fashion, bold launches, portfolios.
**Type:** mix display faces with intent, large scale jumps.
**Palette:** many colors, but composed, not timid. Clashing on purpose.
**Layout:** dense, layered, overlapping, scrolling surprises, grid-breaking.
**Motion:** lots, but choreographed.
**Signature:** controlled chaos. Every loud element is a decision.

## 11. Warm minimal (done well)
**Fits:** most SaaS, when the brand wants calm and trustworthy.
**Type:** one good humanist sans, paired with a quiet accent face.
**Palette:** a warm off-white, a true ink, one confident accent. Never grey-on-grey.
**Layout:** clear hierarchy, real whitespace rhythm, left-aligned, asymmetric where it helps.
**Motion:** one orchestrated entrance, restrained micro-interactions.
**Signature:** the details, exact spacing, real component states, considered type scale.
**Caution:** this is the closest direction to the AI default, so it only works if executed with real precision. If you reach for it by reflex, you have not chosen.

## 12. Monospace / terminal
**Fits:** dev tools, CLIs, technical brands.
**Type:** a mono throughout (Berkeley, JetBrains, Commit), paired with a minimal sans if needed.
**Palette:** terminal-inspired but considered: a warm dark, phosphor accent, or light with a single ink.
**Layout:** text-driven, ASCII structure, boxes, alignment to a character grid.
**Motion:** typing, cursor blinks, used sparingly.
**Signature:** the medium is the message. Real terminal craft, not a green-text gimmick.

---

## Quick chooser

- **Dev tool / honest**: Brutalist, Industrial, Monospace
- **Content / voice**: Editorial, Maximalist
- **Data / clarity**: Swiss, Industrial
- **Premium**: Luxury, Art deco
- **Consumer / joyful**: Playful, Organic
- **Calm SaaS**: Warm minimal (only if executed precisely), Organic

When two fit, blend deliberately (e.g. Editorial type on a Swiss grid). When none obviously fits, default to the one the *audience* respects, then commit hard.


````
## Source: `references/ai-tells-catalog.md`

````text
# AI design tells: catalog

The reference catalog for the `avoid-ai-design` skill. Each tell carries a **detection signal**, a one-line reason it **reads as AI**, and a **fix** for both plain HTML/CSS and React/Tailwind/shadcn.

Percentages cited below come from a Playwright analysis of ~1,400 recent Show HN sites ([Krebs, "design slop"](#sources)): 16 deterministic CSS/DOM heuristics, a ~5-10% false-positive rate per the author, on a sample that skews toward solo, AI-built projects. Read them as relative commonness in a slop-prone corner of the web, not ground truth.

**Detectability.** Most tells are code-certain (a literal class, font, or import). A few, marked **👁 needs render**, need the rendered pixels to judge honestly: palette dominance, spacing rhythm, visual hierarchy, motion. Without a render, flag those as inferred and lower-confidence.

## Why AI design converges

A model trained on a decade of Tailwind tutorials, shadcn starters, and GitHub snippets regresses to the visual median of that corpus. It does not choose indigo; indigo is the average. The fixes here all do the same thing: replace a default with a decision. Read each "why" as "no one chose this," and each fix as "choose."

**Severity:** **P0** screams AI on sight. **P1** is an obvious smell. **P2** is cosmetic. Fix P0 and P1 on every pass.

---

## Typography

### T1: Inter (or the system stack) for everything · P0
**Detection:** `font-family` is Inter, `-apple-system`, `system-ui`, Roboto, or Arial, with no second face. No display font, no contrast.
**Why AI:** Inter is the default in nearly every AI tool and component library. Anthropic's own frontend guidance lists it first under "avoid." A single neutral sans with no pairing means nothing was chosen.
**Fix (HTML/CSS):** Pair a characterful display face for headings with a clean body face. Load via `@font-face` or a font host. Set them on `:root` as `--font-display` and `--font-body`.
```css
:root { --font-display: "Fraunces", Georgia, serif; --font-body: "Hanken Grotesk", system-ui, sans-serif; }
h1, h2, h3 { font-family: var(--font-display); }
body { font-family: var(--font-body); }
```
**Fix (React/Tailwind):** Map two fonts to `fontFamily` in `tailwind.config` (`font-display`, `font-sans`), load them with `next/font` or a `<link>`, and apply `font-display` to headings. Do not leave Geist/Inter as the only face.

### T2: The "tasteful free font" cluster · P1
**Detection:** Space Grotesk, Geist, Syne, Sora, Instrument Serif, or Fraunces used as the *only* gesture toward design. ~15.8% of analyzed sites used one of this small set.
**Why AI:** This is the second-order default. Models reach for the same small set of "indie-startup" Google Fonts to look non-generic, so the non-generic choice became generic. Anthropic calls out **Space Grotesk** by name as overused across its generations.
**Fix:** Keep the font only if it fits the chosen direction, and pair it. Otherwise pick from a wider pool: grotesques (Neue Haas, Aktiv, Söhne, Hanken), serifs (Fraunces, GT Sectra, Tiempos, Newsreader), or a mono (Berkeley, Commit) used with intent. The rule: never ship the font the last three projects shipped.

### T3: Serif-italic accent word in a sans headline · P1
**Detection:** A sans headline with one word in italic serif. "The *modern* way to ship."
**Why AI:** This is a recognizable Claude signature, its go-to move for instant "editorial" flavor. It reads as a template because it is one.
**Fix:** If you want emphasis, earn it through weight, size, or color within the chosen type system, not a borrowed serif italic. Use a real serif/sans contrast only if the whole design commits to it, not as a one-word garnish.

### T4: Geist untouched on a Next.js site · P1
**Detection:** `GeistSans` / `GeistMono` from `next/font`, unchanged, on a deployed site.
**Why AI:** Geist is the Next.js 15+ default. Shipping it untouched says "deployed the starter, never themed it."
**Fix:** Replace or pair Geist deliberately. Keep Geist Mono for code if you like it, but give headings a face that belongs to the brand.

### T5: Reflexive all-caps eyebrow labels · P2
**Detection:** Every section opens with an uppercase, letter-spaced micro-label. ~10.5% used all-caps headlines.
**Why AI:** The "dark SaaS" default eyebrow, applied to every section without thought.
**Fix:** Use eyebrows sparingly. Vary section openers: a number, a short question, a lowercase kicker, or nothing.

---

## Color & gradients

### C1: The purple/indigo-to-blue diagonal gradient · P0
**Detection:** `linear-gradient(135deg, ...)` from indigo/violet to blue in the hero, CTA, or as a background glow.
**Why AI:** The canonical tell, "the Purple Problem." It traces to Tailwind UI defaulting buttons to `bg-indigo-500`; Adam Wathan publicly owned the downstream effect in 2025. The color was never tied to a brand.
**Fix (HTML/CSS):** Choose a dominant brand color and one sharp accent. If you want a gradient, keep it tonal within a single hue, or build a duotone from the brand colors, not the stock indigo-to-violet.
```css
:root { --ink:#101010; --paper:#f4f1ea; --accent:#e4572e; } /* a decision, not a default */
```
**Fix (React/Tailwind):** Replace `bg-gradient-to-br from-indigo-500 to-purple-600` with committed palette tokens via CSS variables. Never use indigo/violet as the unchosen accent. A flat, confident color beats a timid gradient.

### C2: Indigo / violet CTA buttons · P1
**Detection:** Primary buttons are `bg-indigo-600` / `bg-violet-500`. ~10.7% of sites.
**Why AI:** Same root as C1. The accent defaulted instead of being chosen.
**Fix:** Tie the primary action to the brand's dominant or accent color. Give it a real hover and active state (see K7).

### C3: "VibeCode purple" dark theme · P1
**Detection:** Dark background, low-contrast medium-grey body text, purple accent.
**Why AI:** The unmodified "modern dark mode" cluster. Low body contrast also fails accessibility.
**Fix:** Pick a dark palette with intent: a warm near-black, a real text color at AA+ contrast, and an accent that means something. Avoid grey-on-grey body text.

### C4: Timid, evenly distributed palette · P0/P1 · 👁 needs render
**Detection:** Several colors at similar weight, no clear dominant, no sharp accent.
**Why AI:** AI spreads color evenly and avoids commitment. Intentional brands do the opposite: one dominant color carries the page, an accent punctuates it.
**Fix:** Use the 60/30/10 discipline. One dominant, one secondary, one accent used sparingly for emphasis. Commit.

### C5: Colored glow box-shadows · P2
**Detection:** Cards or buttons with a vibrant colored shadow (e.g. `shadow-indigo-500/50`). ~4.3% of sites.
**Why AI:** Decoration with no function. A glow that says nothing.
**Fix:** Use shadow for elevation, not color theater. If you want atmosphere, build it into the background, not as a glow under every card.

### C6: Gradient headline text · P0
**Detection:** `bg-clip-text text-transparent bg-gradient-to-r ...` on a heading, often the indigo-to-violet again.
**Why AI:** A 2024-era default flourish that doubles down on C1 and usually weakens legibility and contrast.
**Fix:** Make headings solid ink or the brand color. For emphasis use weight, size, or one accent word, not a gradient fill.

---

## Layout & composition

### L1: The centered hero template · P0
**Detection:** Pill badge, centered H1, centered subhead, one or two centered CTAs (~23.5% of sites center the title). Centering alone is not a tell; the badge + centered hero + three-card combo is.
**Why AI:** The default "landing page" skeleton. The composition makes no spatial decision.
**Fix (HTML/CSS):** Break symmetry. Try a left-aligned hero with an asymmetric visual, an oversized type-driven hero, a split layout, or an editorial grid where content sits off-center. Let one element be dramatically larger.
**Fix (React/Tailwind):** Replace the `flex flex-col items-center text-center` hero with a `grid` that places headline, supporting text, and media on an intentional grid. Drop the pill badge unless it carries real news.

### L2: Three identical icon-topped feature cards · P0
**Detection:** A row of three (or six) cards, each with a small icon, a short title, and a line of text, all the same height and padding. ~20% of sites.
**Why AI:** The most clichéd SaaS pattern. Identical cards read as machine-laid-out.
**Fix:** Vary the layout. Alternate text-and-visual rows, use a feature with one large showcase and smaller supporting points, or write the features as prose with inline emphasis. If a grid is right, vary card size and content density so it does not read as a template.

### L3: Bento grid as the default composition · P1/P2
**Detection:** A mixed-size tile grid used because it is trendy, not because the content needs it.
**Why AI:** A real 2025 pattern, now saturated. Reads AI when it is the reflex composition rather than a choice driven by the content.
**Fix:** Use a bento grid only when tiles genuinely differ in importance and the sizes encode that. Otherwise pick a layout that fits the content's actual hierarchy.

### L4: The generic stat / social-proof strip · P1
**Detection:** A band of round numbers: "10,000+ users · 99.9% uptime · 4.9★". ~12.2% of sites.
**Why AI:** The numbers are placeholders, often for a product with no users. Hollow proof.
**Fix:** Use real numbers or cut the strip. A single specific, true metric beats four invented ones.

### L5: Numbered 1-2-3 "How it works" · P2
**Detection:** A three-step sequence with big numerals. ~9.4% of sites.
**Why AI:** Formulaic filler structure.
**Fix:** Keep it only if the process genuinely has ordered steps. Otherwise show the product doing the thing.

### L6: The default page shell · P1
**Detection:** Every section wrapped in `container mx-auto px-4` or `max-w-7xl mx-auto`, nothing else.
**Why AI:** The reflex Tailwind shell: one width, centered, forever. No spatial decision.
**Fix:** Vary container width by section role. Let some content go full-bleed, some stay narrow and editorial. Width is a tool, not a constant.

### L7: Pricing as three tiers with a "Most Popular" ring · P1
**Detection:** Three cards, the middle one scaled or ringed, a "Most Popular" badge.
**Why AI:** The canonical SaaS pricing template, shipped without regard to the actual plans.
**Fix:** Let structure follow the real offer: two plans, a table, or one plan with add-ons. If a highlight is right, earn it with design, not a default ring.

### L8: The default four-column footer · P1
**Detection:** Four equal link columns, a newsletter input, a row of social icons.
**Why AI:** The universal generated footer, the same whether or not the links exist.
**Fix:** Build the footer from what the site actually has. Two columns and a line is often enough. Drop the newsletter box unless it is real.

---

## Components

### K1: Untouched shadcn/ui defaults · P0
**Detection:** Default `zinc`/`slate` base from `components.json`, default `--radius`, unstyled Card/Button/Badge. ~23.5% of sites shipped these unmodified.
**Why AI:** The framework-level tell. The starter was deployed without theming.
**Fix:** Theme shadcn before shipping. Change the base color and radius in `components.json`/CSS variables, restyle the primitives you use most (Button, Card), and set your own type scale. shadcn is a starting point, not a look.

### K2: `rounded-2xl shadow-lg` on everything · P1
**Detection:** Uniform large border-radius and a soft shadow (often ~0.1 opacity) on every surface.
**Why AI:** Identical radius plus identical padding plus identical card heights flattens hierarchy into a template.
**Fix:** Use radius and elevation to express hierarchy, not as a global default. Vary radius by element role. Let some surfaces be flat, some sharp. Reserve strong shadows for things that genuinely float.

### K3: Glassmorphism / `backdrop-blur` by reflex · P1
**Detection:** Frosted, semi-transparent nav and cards with `backdrop-blur`. ~17% of sites.
**Why AI:** A genuine trend, but applied to everything without reason. Glass on glass on glass.
**Fix:** Use a blurred translucent surface only where layering is real (a nav over scrolling content). Everywhere else, use a solid surface with a considered color.

### K4: Colored left/top border-accent cards · P1
**Detection:** Cards with a colored left or top border stripe. ~13% of sites.
**Why AI:** As Krebs puts it, "colored left borders are almost as reliable a sign of AI-generated design as em-dashes are for text."
**Fix:** Drop the stripe. If a card needs emphasis, use weight, scale, background, or position. Differentiate by content, not a ribbon.

### K5: Pill badge above the title · P2
**Detection:** A small capsule, often with a sparkle emoji: "✨ New: v2 is here". ~4.7% of sites.
**Why AI:** A default ornament that announces nothing.
**Fix:** Remove it unless it carries real, dated news. If it does, style it to the brand, not the stock pill.

### K6: Lucide icon in a rounded-square chip · P1
**Detection:** A Lucide icon centered in a tinted `rounded-xl` square, one per feature.
**Why AI:** Lucide ships with shadcn; the rounded-square chip is the stock "feature icon" treatment, used unedited.
**Fix:** Choose an icon set that fits the direction (or commission/draw simple custom marks). Drop the chip, or make the icon treatment a real design decision (line weight, size, color, position). Consider numbers or no icons at all.

### K7: Missing component states · P1
**Detection:** Hover states that do nothing, buttons that snap with no transition, forms with no focus/error/required/disabled/loading states.
**Why AI:** The polish gap. Generated UI renders the happy path and skips the states a craftsperson would build.
**Fix (HTML/CSS):** Add `:hover`, `:focus-visible`, `:active`, and `:disabled` styles, and a `transition`. Design error and empty states.
**Fix (React/Tailwind):** Implement `hover:`, `focus-visible:`, `disabled:`, and loading/error variants. Wire real validation states into forms.

### K8: Untouched `--radius` · P1
**Detection:** shadcn's default `--radius: 0.5rem` left as-is across every component.
**Why AI:** The radius is a fingerprint; the default one says the theme was never touched. (Related to K1.)
**Fix:** Set a radius that fits the direction: sharp (0) for brutalist or editorial, soft for playful. Vary it by element role.

### K9: The default dark SaaS card · P1
**Detection:** `bg-zinc-950` / `bg-gray-900` surfaces with `border-white/10` hairlines and a faint shadow.
**Why AI:** The unmodified "modern dark" card that every generated dark UI ships.
**Fix:** Choose a real dark palette (a warm or cool near-black with intent) and separate surfaces by more than a 10%-white border.

---

## Spacing

### S1: Uniform padding, no rhythm · P2 · 👁 needs render
**Detection:** The same `gap` and `p-*` on most things; whitespace distributed evenly.
**Why AI:** Even spacing makes a flat hierarchy. Nothing is emphasized because everything breathes the same.
**Fix:** Use a spacing scale to create rhythm. Give sections distinct vertical space by importance. Use whitespace as composition: crowd some things, isolate others.
**Note:** This is the softest category. Sources describe it as "uniform" without naming values. Weight it below the font, color, and component tells.

---

## Motion

### M1: The same fade-up-on-scroll on everything · P2 · 👁 needs render
**Detection:** Every section reveals with an identical fade-and-rise.
**Why AI:** Reflexive, not choreographed. The default AOS reveal.
**Fix:** Pick one or two high-impact moments. One well-staggered page-load entrance delivers more than a uniform reveal on every block. Vary easing and intent.

### M2: Scattered micro-interactions, no orchestration · P2 · 👁 needs render
**Detection:** Many small random hovers and bounces, no coherent motion language.
**Why AI:** Motion sprinkled on rather than designed.
**Fix:** Define a motion language: shared easing, shared duration scale, a clear entrance. One orchestrated load beats scattered fidgets.

### M3: The copied "Linear glow" · P2 · 👁 needs render
**Detection:** A dark hero with a blurred animated gradient glow behind a product shot.
**Why AI:** "The Linear effect," lifted wholesale onto an unrelated product.
**Fix:** Borrow the principle (atmosphere, depth), not the exact effect. Build atmosphere that fits your own direction.

---

## Icons

### I1: Lucide untouched
See **K6**. The default set used as-is, one per feature card.

### I2: Emoji as feature bullets or in the nav · P1
**Detection:** Emoji standing in for icons in features or navigation. ~3.8% had emoji in nav.
**Why AI:** A lazy substitute for real iconography.
**Fix:** Use a real icon set chosen for the direction, or custom marks. Reserve emoji for genuinely casual, human contexts, never as the system's iconography.

### I3: The overused Lucide glyph set · P1
**Detection:** `Sparkles` (beside "AI"), `ArrowRight`, `Zap`, `Rocket`, `CheckCircle2`, `Star`, straight from `lucide-react`. The `Sparkles` + "AI" pairing is the 2024-26 signature.
**Why AI:** The same handful of icons in the same roles, unedited. `Sparkles` for "AI" is the most worn of all.
**Fix:** Pick icons for meaning, not availability. Retire `Sparkles` for AI. Match weight and style to the direction, or draw a few simple custom marks.

---

## Copy & microcopy

### CP1: Vague aspirational headline · P1
**Detection:** "Build the future of work." "Your all-in-one platform." "Scale without limits." "Elevate your workflow."
**Why AI:** Brand-agnostic filler that could front any product. Says nothing specific.
**Fix:** Write what the product actually does, for whom, in concrete terms. Specificity is the opposite of slop.

### CP2: Generic superlatives and hedging · P2
**Detection:** "best-in-class," "cutting-edge," "seamless," "powerful," "may help you."
**Why AI:** The microcopy equivalent of beige.
**Fix:** Replace with a concrete claim, a number, or a verb. For full prose, run the text through the `avoid-ai-writing` skill.

### CP3: Arrow glyphs stapled to text · P1
**Detection:** Unicode arrows (→ ← ↑ ↓) pasted into button labels, links, or headings: "Get started →", "Learn more →", "Read the docs →".
**Why AI:** The typographic cousin of the em-dash. A reflexive flourish welded onto every CTA. A real button does not need an arrow character glued to its label.
**Fix:** Drop the glyph. If a control genuinely needs a directional affordance, use a real icon component sized and aligned to the text, only where it adds meaning, never a raw arrow character in the copy.

---

## Imagery

### IM1: Stock "diverse team at a laptop" · P1
**Detection:** A bright open-plan office, a smiling team around a screen.
**Why AI:** The visual default for "company."
**Fix:** Use real product screenshots, real photography, or a considered illustration style that fits the direction.

### IM2: AI 3D glossy blobs · P1
**Detection:** Plastic-looking abstract 3D shapes as hero or section art, with a tell-tale glossy sheen.
**Why AI:** Generated filler with no subject.
**Fix:** Show the actual product, or commission art with a point of view. If you use abstract forms, make them specific to the brand.

### IM3: Corporate Memphis blob-people · P2 (precursor)
**Detection:** Flat illustrations of people with tiny heads, long bendy limbs, no faces, flat bright fills.
**Why AI:** A pre-AI corporate trend (Buck's "Alegria," 2017) now widely declared dead, but still reproduced by image tools as "friendly corporate." Lineage, not a fresh AI tell.
**Fix:** Choose an illustration style with a real voice, or skip illustration for photography or product UI.

### IM4: Placeholder identities and media · P1
**Detection:** DiceBear / boring-avatars / `pravatar.cc` avatars; `aspect-video bg-muted rounded-xl` standing in for a real demo or screenshot.
**Why AI:** Generated stand-ins where real content belongs. Code-detectable, and a strong "nothing real here yet" signal.
**Fix:** Use real avatars and a real product screenshot or recording. If you must use a placeholder, make it obviously intentional, not a stock avatar service.

---

## What not to over-flag

A pattern is a tell when it is a **default reached for without reason**, not whenever it appears. Calibrate:

- **One gradient, used well and tied to the brand, is not slop.** C1 is about the *unchosen* indigo-to-violet, not gradients in general.
- **Glassmorphism and bento grids** are legitimate when the content calls for them. Flag them only as reflexive defaults.
- **Spacing (S1)** is a soft signal. Do not lead an audit with it.
- **Corporate Memphis** is pre-AI context, not evidence a model made something.
- A confident, intentional design that happens to be minimal is not "timid." Restraint executed well is a decision. Reward it.

---

## Sources

1. Adrian Krebs, "Show HN submissions… the same vibe-coded look" (design slop study, ~1,400 sites): https://adriankrebs.ch/blog/design-slop/
2. GIGAZINE, write-up of the design-slop study: https://gigazine.net/gsc_news/en/20260423-design-slop/
3. Anthropic, "Prompting for frontend aesthetics" (Claude Cookbook): https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
4. "Why Every AI-Built Website Looks the Same (Blame Tailwind's Indigo-500)": https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
5. "Why Your AI Keeps Building the Same Purple Gradient Website": https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
6. Daryl Ginn, "The Linear effect": https://rectangle.substack.com/p/the-linear-effect
7. "AI Slop Web Design: Spotting and Fixing Generic Websites" (925studios): https://www.925studios.co/blog/ai-slop-web-design-guide
8. "Your AI Slop Bores Me" (Know Your Meme): https://knowyourmeme.com/memes/sites/your-ai-slop-bores-me
9. "Claude Design: Build Branded Interfaces Without Generic AI Aesthetics" (MindStudio): https://www.mindstudio.ai/blog/claude-design-avoid-generic-ai-aesthetics
10. "Corporate Memphis" (Wikipedia): https://en.wikipedia.org/wiki/Corporate_Memphis

*The "colored left borders ≈ em-dashes" line is from source 1. Per-pattern percentages are from sources 1–2. The Tailwind `indigo-500` origin and Adam Wathan's 2025 acknowledgment are from sources 4–5.*


````
## Source: `SKILL.md`

````text
---
name: avoid-ai-design
description: Audit and rewrite frontend UI to remove generic AI design patterns ("AI slop"). Use this skill when asked to "de-slop a UI", "make a design look less AI-generated", "audit a component or page for AI design tells", or "fix Claude/Codex-generated frontend that looks generic". Covers HTML/CSS and React/Tailwind/shadcn. Supports a detection-only mode that flags patterns without rewriting.
version: 0.2.0
license: MIT
compatibility: Any AI coding assistant that supports the agentskills.io SKILL.md format (Claude Code, Cursor, VS Code Copilot, Codex CLI, etc.). No external tools or APIs required; uses a screenshot tool if one is available.
metadata:
  author: ungspirit
  tags: design ui frontend ai-slop tailwind shadcn react
  agentskills_spec: "1.0"
---

# Avoid AI Design: Audit & Rewrite

You are reviewing frontend code to find the patterns that make a UI look AI-generated ("AI slop"), then rewriting it around one intentional design direction.

This is the design counterpart to the `avoid-ai-writing` skill. It targets two stacks: plain **HTML/CSS/JS** and **React + Tailwind + shadcn/ui**.

The point is not to chase novelty. It is to replace defaults with decisions. A purple gradient is not bad because purple is bad; it is bad because no one chose it. Every fix below trades a reflex for an intention.

**Code shows half of it; pixels show the rest.** Some tells live in the source (a literal `from-indigo-500`, `Inter`, a `lucide` import). Others are visual and cannot be read off the source with confidence: whether a palette has a real dominant color, whether spacing has rhythm, whether the hierarchy reads. So render the UI when you can (step 2). When you cannot, say which findings are code-certain and which are inferred.

## Modes

**`rewrite`** (default): Audit the code, commit to a direction, then rewrite it.

**`detect`**: Audit and score only. No edits. Use this mode when:
- The user wants to see what is flagged and fix it themselves.
- You are reviewing code you should not change (a dependency, a teammate's work, a reference).
- The user asks for a quick scan.

Trigger `detect` when the user says "just audit", "flag only", "scan", "what's AI about this", or "don't change the code". Default to `rewrite`.

## Workflow (rewrite mode)

1. **Scope.** Read the actual files first. Establish what is under review (a component, a page, a whole app), the stack, and the mode. Never judge from the prompt alone.
2. **Render if you can.** Design is visual. If a screenshot or preview tool is available (a browser or preview MCP, a headless renderer, a dev server you can capture), render the artifact and judge the visual tells from pixels: palette dominance, spacing rhythm, visual hierarchy, motion. Read the source too, for the code-level tells. If nothing can render it, audit the source alone and mark the visual tells as **inferred, lower-confidence** rather than asserting them.
3. **Audit.** Walk every category in `references/ai-tells-catalog.md`. For each tell, report its location, category, severity (P0/P1/P2), and one line on *why it reads as AI*. Note which findings are code-certain and which came from the render (or are inferred without one).
4. **Commit to a direction.** Read `references/aesthetic-directions.md`. Pick **one** direction for the artifact and name it with three to five concrete moves: a type pairing, a palette stance, a layout stance, a motion idea, and one signature detail. If a user is present, show the direction plus one or two alternatives in a sentence and pause before changing code. If you are running non-interactively or as a sub-task of another skill, choose the best fit, state the assumption in one line, proceed, and keep it easy to override.
5. **Calibrate depth.** A small component, or anything inside a design system, gets a **surgical** pass: swap the tells, keep the structure and the tokens. A standalone page or artifact gets a **rebuild** around the direction. A full rebuild overlaps with the `frontend-design` skill; if it is available and the work is ground-up, hand it the committed direction rather than duplicating its job here.
6. **Rewrite.** Edit the real files. Preserve functionality, props, state, routing, data flow, accessibility, and the meaning of the copy. Do not add dependencies silently; name any you introduce.
7. **Re-audit and judge.** Run the catalog over the result. A clean catalog pass (no P0) is **necessary but not sufficient** (see "What success means").

## What success means

"Less obviously AI" is not the goal. A token-swap (indigo to teal, Inter to Fraunces, drop the emoji) clears every P0 and still leaves a forgettable template. Judge the result against three tests:

1. **Justified.** Every change serves the committed direction, not a different reflex.
2. **Coherent.** The type pairing, palette stance, layout, and signature detail reinforce one another. One committed idea, executed.
3. **Not a re-run.** You did not reach for the same "safe" default as recent passes. If this looks like the last de-slop you did (the warm-paper-serif move, one stock accent), it failed the second-order-default check. Vary deliberately.

A page can pass the catalog and still fail all three. The catalog catches clichés; these tests catch mediocrity.

## Severity tiers

Tiers triage by **who notices**, not by how much the pattern annoys you. Context can move a tell up or down.

- **P0, a layperson recognizes it as AI-made.** The purple-to-blue gradient, Inter for everything, an untouched shadcn base theme, gradient (`bg-clip-text`) headline text, reflexive glassmorphism. These are the memes.
- **P1, a designer or developer recognizes it.** `rounded-2xl shadow-lg` on every surface, the default page shell (`container mx-auto px-4`, `max-w-7xl`), icon-in-a-rounded-square, the default four-column footer, dead hover/focus states, arrow glyphs stapled to CTAs, default-blue or indigo buttons, "Elevate your workflow" copy.
- **P2, craft and polish gaps.** Flat spacing with no rhythm, no motion, or the same `fade-in-up` on everything.

Context matters: a centered hero is P0 on a generic SaaS page and fine in a luxury layout. Missing `:focus-visible` is also an accessibility defect, so treat it as high priority whatever its tier.

## Context profiles

Adjust strictness to where the UI lives. Auto-detect from the stack and structure; state which profile you are using.

| Profile | How to treat it |
|---|---|
| `landing` / `artifact` | Full strength. Reward boldness. This is where a real direction matters most. |
| `marketing-page` | Full strength on type, color, layout, and copy. |
| `app-component` | Surgical. Fix the tells, keep the component's contract and structure. |
| `inside-design-system` | Surgical only. Respect existing tokens and primitives. Do not fight the system; flag system-level tells separately as advice. |
| `dashboard` | Favor density, legibility, and information hierarchy over decoration. |

## Guardrails

- **Never break working code.** Props, state, routing, data fetching, and accessibility survive intact. Behavior is not yours to change.
- **Do not trade one cliché for another.** The "Space Grotesk trap": models reach for the same "tasteful" non-default every time (Space Grotesk, a slate palette, one stock gradient). A second-order default is still a default. Vary your choices across runs and justify them by context.
- **Respect hard constraints.** An existing design system, brand guidelines, or a named framework outranks your taste. Work within them.
- **Do not manufacture problems.** If the UI is already distinctive and intentional, say so and stop. A clean audit is a valid result.
- **Keep the copy's meaning.** You may sharpen generic microcopy, but do not invent claims or change what the product says about itself.

## Self-reference escape hatch

When the code is *about* AI design patterns (a demo, a teaching example, a "what not to do" gallery, or this skill's own docs), illustrative slop is intentional. Treat it as exempt only when there is a concrete signal: a sibling comment that marks it (e.g. `slop-example`), a path under `examples/`, `fixtures/`, `__mocks__/`, or `stories/`, or text explicitly labeled illustrative. Flag patterns in the real interface only.

## Beyond HTML and React

The catalog is written for HTML/CSS and React/Tailwind/shadcn because that is what AI tools emit most. The principle is framework-agnostic: a default left untouched is the tell. Untouched MUI (Roboto and blue), Chakra, Bootstrap (`btn-primary` blue), or Mantine defaults read as AI for the same reason. Apply the same audit, swapping the specific class and token names.

## Output format

### rewrite mode

1. **Audit.** Every tell found, grouped by severity, each with its location, a one-line reason, and a code-certain / inferred tag.
2. **Direction.** The single direction you are committing to, with its defining moves, plus one or two alternatives in a sentence. If interactive, this is where you pause.
3. **Rewrite.** The edited code, at the calibrated depth.
4. **What changed.** A short summary of the meaningful moves, not a line-by-line diff.
5. **Re-audit and judgment.** A second pass over your own output: confirm no P0 survived, then judge it against the three success tests. Fix anything that fails.

### detect mode

1. **Audit.** Every tell found, grouped by severity (P0/P1/P2), with locations and a code-certain / inferred tag.
2. **Assessment.** For each flag, whether it is a clear problem or a judgment call. Some patterns are fine in context (one gradient, used well, is not slop). Say which to fix and which to leave.

## Don't over-design

The goal is a UI that looks like a person with taste made it, not a UI that is loud for its own sake. Restraint executed well beats maximalism applied blindly. If the original is already strong, make the few cuts it needs and stop. Match the intensity of the rewrite to the artifact: a settings panel does not need a hero animation.


````
<!-- END SECTION: SKILL_md -->
