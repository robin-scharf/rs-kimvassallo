# kimvassallo.com

Astro 5 + Tailwind 4 static site. Content via [Pages CMS](https://pagescms.org). Hosted on Cloudflare Pages.

## Local dev

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build      # → ./dist (static)
pnpm preview    # local preview server
pnpm deploy     # wrangler pages deploy ./dist
```

## Content editing

1. Push this repo to GitHub.
2. Go to <https://app.pagescms.org>, sign in with GitHub, pick this repo.
3. Edit `Site settings`, `Home`, `About`, `Services`, `Blog`, `FAQ`, `Policies` from the UI — each change is a commit on `main`, which triggers a CF Pages deploy.

The CMS schema lives in [`.pages.yml`](./.pages.yml). Add a field there to add a field in the editor.

## Hosting

- Cloudflare Pages project provisioned via [terraform](./terraform).
- Wrangler config in [`wrangler.jsonc`](./wrangler.jsonc) supports local `pnpm deploy` against the same project.

## Structure

```
src/
  content/          markdown + json content (edited by CMS)
    settings.json   site-wide settings (nav, footer, contact)
    site/           singleton pages (home, about, contact)
    services/       services collection
    blog/           blog posts
    faq/            FAQ items
    policies/       privacy, cookies, practice policy
  pages/            astro routes
  layouts/Base.astro
  components/       Header, Footer
  styles/global.css
.pages.yml          Pages CMS schema
terraform/          CF Pages + DNS IaC
wrangler.jsonc      CF Pages deploy config
```

## Performance choices

- Static output, no runtime — CF Pages serves from the edge cache.
- Tailwind v4 via Vite, automatic critical CSS inlining (`build.inlineStylesheets: "auto"`).
- Astro `prefetch` on viewport for instant navigation.
- Fonts loaded from Google Fonts with `display=swap`, preconnect hints.
- `image()` schema integration — replace placeholder images via CMS and Astro generates responsive `srcset` + AVIF/WebP automatically.
- No client JS by default; interactive widgets use native `<details>` for zero-JS disclosure.
- `prefers-reduced-motion` respected.
