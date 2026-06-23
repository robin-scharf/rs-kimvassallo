# Terraform — Cloudflare Pages

Provisions the Pages project + DNS for kimvassallo.com.

## Prereqs

- Terraform 1.6+
- Cloudflare API token with permissions:
  - `Account · Cloudflare Pages · Edit`
  - `Zone · DNS · Edit` (for the target zone)
- Cloudflare account ID + zone ID for the domain
- GitHub repo already pushed (Cloudflare will pull from there)

## Use

```sh
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars

export CLOUDFLARE_API_TOKEN=...
terraform init
terraform plan
terraform apply
```

## After apply

- Cloudflare Pages will start building from the GitHub `main` branch.
- Apex + `www` are bound to the project and proxied through Cloudflare.
- Local deploys still work via `pnpm deploy` (uses wrangler, separate from TF state).
