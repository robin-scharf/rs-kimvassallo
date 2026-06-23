terraform {
  required_version = ">= 1.6"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

provider "cloudflare" {
  # Reads CLOUDFLARE_API_TOKEN from env
}

# Direct-upload Pages project. Deploys come from `wrangler pages deploy`
# (run locally or via the GitHub Action in .github/workflows/deploy.yml).
resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.production_branch
}

resource "cloudflare_pages_domain" "primary" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  name         = var.primary_domain
}

resource "cloudflare_dns_record" "primary" {
  zone_id = var.cloudflare_zone_id
  name    = var.primary_domain
  type    = "CNAME"
  content = "${cloudflare_pages_project.site.name}.pages.dev"
  ttl     = 1
  proxied = true
}

output "pages_subdomain" {
  value = "https://${cloudflare_pages_project.site.subdomain}"
}

output "primary_url" {
  value = "https://${var.primary_domain}"
}
