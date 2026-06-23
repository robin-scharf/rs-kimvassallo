variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID"
}

variable "cloudflare_zone_id" {
  type        = string
  description = "Cloudflare zone ID for the parent domain"
}

variable "primary_domain" {
  type        = string
  description = "Custom domain to attach (apex or subdomain), e.g. kim.robinscharf.com"
}

variable "project_name" {
  type        = string
  description = "Cloudflare Pages project name (also the *.pages.dev subdomain)"
  default     = "kimvassallo"
}

variable "production_branch" {
  type        = string
  description = "Branch label CF Pages treats as production"
  default     = "main"
}
