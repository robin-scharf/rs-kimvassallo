#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Copy worker.js to _worker.js for Cloudflare Pages
const workerSrc = path.join(__dirname, '../.open-next/worker.js');
const workerDest = path.join(__dirname, '../.open-next/_worker.js');

if (fs.existsSync(workerSrc)) {
  fs.copyFileSync(workerSrc, workerDest);
  console.log('✅ Created _worker.js for Cloudflare Pages');
} else {
  console.error('❌ worker.js not found');
  process.exit(1);
}
