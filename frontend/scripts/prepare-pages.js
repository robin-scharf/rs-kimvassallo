#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// Copy worker.js to _worker.js for Cloudflare Pages
const workerSrc = path.join(__dirname, '../.open-next/worker.js')
const workerDest = path.join(__dirname, '../.open-next/_worker.js')

if (fs.existsSync(workerSrc)) {
  fs.copyFileSync(workerSrc, workerDest)
  console.log('✅ Created _worker.js for Cloudflare Pages')

  // Create a wrangler.toml in the output directory with compatibility flags
  const wranglerConfig = `compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]
`

  const wranglerPath = path.join(__dirname, '../.open-next/wrangler.toml')
  fs.writeFileSync(wranglerPath, wranglerConfig)
  console.log('✅ Created wrangler.toml in .open-next with nodejs_compat flag')
} else {
  console.error('❌ worker.js not found')
  process.exit(1)
}
