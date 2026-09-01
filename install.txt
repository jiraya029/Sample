# Allow TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Install NuGet package provider
Install-PackageProvider -Name NuGet -Force

# Trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# Install Azure PowerShell
Install-Module -Name Az -Repository PSGallery -Force -AllowClobber

# Import the module
Import-Module Az

# Verify installation
Get-Module -ListAvailable Az*

# Login to Azure
Connect-AzAccount

# Show subscriptions
Get-AzSubscription
