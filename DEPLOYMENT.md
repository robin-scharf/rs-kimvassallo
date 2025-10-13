# Deployment Guide

## Frontend - Cloudflare Pages (FREE)

### Prerequisites
1. Deploy Strapi backend first (see Backend section below)
2. Get your Strapi API URL

### Deploy to Cloudflare Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Cloudflare Account**
   - Go to https://pages.cloudflare.com/
   - Sign up for free

3. **Connect Your Repository**
   - Click "Create a project"
   - Connect your GitHub account
   - Select `rs-kimvassallo` repository

4. **Configure Build Settings**
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm install && npm run build`
   - Build output directory: `frontend/out`
   - Root directory: `frontend`

5. **Add Environment Variable**
   - Click "Add variable"
   - Name: `NEXT_PUBLIC_STRAPI_API_URL`
   - Value: `https://your-strapi-url.com/api` (replace with your actual Strapi URL)

6. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://rs-kimvassallo.pages.dev`

7. **Custom Domain (Optional)**
   - Go to Custom domains
   - Add `www.kimvassallo.com` (or your domain)
   - Follow DNS instructions

### Local Build Test
```bash
cd frontend
pnpm build
```
The static files will be in `frontend/out/`

---

## Backend - Coolify (Self-Hosted)

Coolify is a self-hosted alternative to Heroku/Railway.

### Prerequisites
- Coolify instance running (you mentioned you have this)
- PostgreSQL database available (can create in Coolify)

### Deploy Strapi to Coolify

1. **Push Code to Git**
   ```bash
   git add .
   git commit -m "Prepare for Coolify deployment"
   git push origin main
   ```

2. **Create New Application in Coolify**
   - Go to your Coolify dashboard
   - Click "New Resource" → "Application"
   - Source: Select your Git provider (GitHub)
   - Repository: `robin-scharf/rs-kimvassallo`
   - Branch: `main`

3. **Configure Build Settings**
   - Base Directory: `backend`
   - Build Pack: **Dockerfile**
   - Port: `1337`
   - Dockerfile Location: `backend/Dockerfile`

4. **Add PostgreSQL Database**
   - In Coolify, click "New Resource" → "Database" → "PostgreSQL"
   - Or link to existing PostgreSQL database
   - Note the connection URL

5. **Set Environment Variables**
   In Coolify Application Settings → Environment Variables, add:
   
   ```bash
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   
   # Database (PostgreSQL)
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   
   # Security Keys (generate with: openssl rand -base64 32)
   APP_KEYS=key1,key2,key3,key4
   API_TOKEN_SALT=your-random-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   JWT_SECRET=your-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   
   # Optional: Seed Token for API seeding
   SEED_TOKEN=your-secure-seed-token
   ```

   **Generate secure keys:**
   ```bash
   # Generate 4 APP_KEYS (comma separated)
   openssl rand -base64 32
   openssl rand -base64 32
   openssl rand -base64 32
   openssl rand -base64 32
   
   # Generate other secrets
   openssl rand -base64 32  # API_TOKEN_SALT
   openssl rand -base64 32  # ADMIN_JWT_SECRET
   openssl rand -base64 32  # JWT_SECRET
   openssl rand -base64 32  # TRANSFER_TOKEN_SALT
   openssl rand -base64 32  # SEED_TOKEN (optional)
   ```

6. **Configure Domain**
   - In Coolify, set your domain (e.g., `api.kimvassallo.com`)
   - Enable SSL/TLS (Let's Encrypt automatic)

7. **Deploy**
   - Click "Deploy" in Coolify
   - Wait for build to complete (2-5 minutes)
   - Check logs for any errors

8. **Seed Database (First Time)**
   Option A - Via API:
   ```bash
   curl -X POST https://your-coolify-url.com/api/seed/run \
     -H "x-seed-token: your-secure-seed-token"
   ```
   
   Option B - Via Coolify Console:
   - Go to your application in Coolify
   - Click "Console" or "Execute Command"
   - Run: `pnpm seed`

9. **Access Admin Panel**
   - Go to `https://your-coolify-url.com/admin`
   - Create your first admin account
   - Start managing content!

### Troubleshooting Coolify

**Build fails:**
- Check Coolify build logs
- Ensure `backend/Dockerfile` exists
- Verify base directory is set to `backend`

**Database connection fails:**
- Verify `DATABASE_URL` format: `postgresql://user:password@host:port/dbname`
- Check PostgreSQL is running in Coolify
- Ensure network connectivity between containers

**Port not accessible:**
- Ensure PORT is set to `1337`
- Check Coolify port mapping
- Verify domain/SSL configuration

---

## Backend - Railway (FREE Tier)

Railway offers $5 free credit per month (enough for a small site).

### Deploy Strapi to Railway

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `rs-kimvassallo` repository

3. **Configure Service**
   - Root directory: `backend`
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm start`

4. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set `DATABASE_URL`

5. **Set Environment Variables**
   Click "Variables" and add:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-random-string-32-chars>
   API_TOKEN_SALT=<generate-random-string-32-chars>
   ADMIN_JWT_SECRET=<generate-random-string-32-chars>
   APP_KEYS=<generate-random-string-32-chars>,<another-32-chars>
   DATABASE_CLIENT=postgres
   ```

   Generate secure random strings:
   ```bash
   openssl rand -base64 32
   ```

6. **Update Database Config**
   Railway sets `DATABASE_URL` automatically. Make sure `backend/config/database.ts` uses it.

7. **Deploy**
   - Railway will auto-deploy
   - Get your URL: `https://rs-kimvassallo-production.up.railway.app`
   - Use this URL in your frontend env variable

8. **Seed Database (First Time)**
   - Go to Railway service
   - Click "Settings" → "Deploy Triggers"
   - Or SSH in and run: `pnpm seed`

---

## Alternative: Render (FREE Tier)

### Backend on Render
1. Go to https://render.com/
2. Create account
3. New → Web Service
4. Connect GitHub repo
5. Configure:
   - Name: `kimvassallo-backend`
   - Root Directory: `backend`
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`
   - Add PostgreSQL database
   - Add environment variables (same as Railway)
6. Deploy

---

## Database Migration (SQLite → PostgreSQL)

Update `backend/config/database.ts` to use PostgreSQL in production:

```typescript
export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: env('DATABASE_CLIENT') === 'postgres' 
      ? {
          connectionString: env('DATABASE_URL'),
          ssl: env('DATABASE_SSL', false) ? {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          } : false,
        }
      : {
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
    useNullAsDefault: true,
  },
});
```

Add to backend package.json:
```json
"dependencies": {
  "pg": "^8.11.3"
}
```

---

## Quick Checklist

### Before Deployment:
- [ ] Backend: Change admin password from default
- [ ] Backend: Set all environment variables
- [ ] Backend: Test API endpoints work
- [ ] Frontend: Update `NEXT_PUBLIC_STRAPI_API_URL`
- [ ] Frontend: Test build locally with `pnpm build`
- [ ] Both: Commit and push to GitHub

### After Deployment:
- [ ] Backend: Access admin at `https://your-backend.com/admin`
- [ ] Backend: Upload content and images
- [ ] Backend: Set permissions for Public role
- [ ] Frontend: Verify site loads at Cloudflare URL
- [ ] Test all pages work
- [ ] Add custom domain (optional)

---

## Costs

- **Cloudflare Pages**: FREE (unlimited)
- **Railway**: $5/month credit FREE (enough for small sites)
- **Render**: FREE tier available
- **GitHub**: FREE

Total: **$0/month** for small traffic sites!
