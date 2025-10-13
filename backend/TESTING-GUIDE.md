# ✅ Testing Your Kim Vassallo CMS Setup

Follow these steps to verify everything is working correctly.

## Step 1: Start Strapi Development Server

```bash
cd /mnt/d/Code/rs-kimvassallo
pnpm develop
```

**Expected Result**:
- Terminal shows "Server started" message
- Browser opens automatically to `http://localhost:1337/admin`
- You see the Strapi admin registration page

## Step 2: Create Admin Account

In the browser that opened:
1. Enter your email (e.g., `admin@kimvassallo.com`)
2. Enter a password (min 8 characters)
3. Enter your first and last name
4. Click **"Let's start"**

**Expected Result**:
- You're logged into the Strapi admin panel
- You see the dashboard with sidebar menu

## Step 3: Check Content Types

In the admin panel sidebar, look for **"Content Manager"**:

Click on it and verify you see these content types:
- ✅ About
- ✅ Approach
- ✅ Contact
- ✅ Global
- ✅ Home
- ✅ Service (Collection Type)

**Expected Result**:
- All content types are visible but empty (no entries yet)

## Step 4: Seed the Database

Open a **NEW terminal** (keep Strapi running), then:

```bash
cd /mnt/d/Code/rs-kimvassallo
pnpm seed
```

**Expected Result**:
```
Setting up Kim Vassallo website...
Ready to go
```

## Step 5: Verify Content in Admin Panel

Go back to the admin panel and refresh the page. Check each content type:

### ✅ Home
1. Click **Content Manager** → **Home**
2. You should see the entry with:
   - Name: Kim Vassallo
   - Credentials: LCSW-R
   - Tagline: Individual therapy for women

### ✅ About
1. Click **Content Manager** → **About**
2. You should see:
   - Title: About
   - Blocks: 1 rich-text block with content

### ✅ Approach
1. Click **Content Manager** → **Approach**
2. You should see:
   - Title: My Approach
   - Content: Rich text about therapeutic approach

### ✅ Service
1. Click **Content Manager** → **Service**
2. You should see **6 entries**:
   - Women's Issues
   - Women's Health
   - Pregnancy, Prenatal, Postpartum
   - Grief and Loss
   - Life Transitions
   - Relationship Issues

### ✅ Contact
1. Click **Content Manager** → **Contact**
2. You should see:
   - Title: Contact
   - Email: kim@kimvassallo.com
   - Phone: (555) 123-4567
   - Address: New York, NY

### ✅ Global
1. Click **Content Manager** → **Global**
2. You should see:
   - Site Name: Kim Vassallo, LCSW-R
   - Location: New York, NY
   - Offers Online Appointments: Yes
   - Accepts Insurance: Yes

## Step 6: Test API Endpoints

Open a new terminal and test the API endpoints:

> **Note for WSL Users**: If you're running Strapi in WSL and `localhost:1337` doesn't work, you may need to use the WSL network bridge IP instead. Find it with:
> ```bash
> ip route | grep default | awk '{print $3}'
> ```
> Then use that IP (e.g., `http://172.23.112.1:1337`) instead of `localhost:1337` in the commands below.

### Test Home Endpoint
```bash
curl http://localhost:1337/api/home | jq
```

**Expected JSON**:
```json
{
  "data": {
    "id": 1,
    "documentId": "...",
    "name": "Kim Vassallo",
    "credentials": "LCSW-R",
    "tagline": "Individual therapy for women",
    "description": "Specializing in women's health...",
    ...
  }
}
```

### Test Services Endpoint
```bash
curl "http://localhost:1337/api/services?sort=order:asc" | jq
```

**Expected JSON**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Women's Issues",
      "description": "...",
      "order": 1
    },
    {
      "id": 2,
      "title": "Women's Health",
      "description": "...",
      "order": 2
    },
    ...
  ]
}
```

### Test About Endpoint
```bash
curl "http://localhost:1337/api/about?populate=blocks" | jq
```

**Expected JSON**:
```json
{
  "data": {
    "id": 1,
    "title": "About",
    "blocks": [
      {
        "__component": "shared.rich-text",
        "body": "I am a Licensed Clinical Social Worker..."
      }
    ]
  }
}
```

### Test All Endpoints
```bash
# Home
curl http://localhost:1337/api/home

# About
curl "http://localhost:1337/api/about?populate=blocks"

# Approach
curl http://localhost:1337/api/approach

# Services
curl "http://localhost:1337/api/services?sort=order:asc"

# Contact
curl http://localhost:1337/api/contact

# Global
curl "http://localhost:1337/api/global?populate=defaultSeo"
```

## Step 7: Edit Content

Test editing content in the admin panel:

1. Go to **Content Manager** → **Home**
2. Click on the entry
3. Change the tagline to something else
4. Click **Save**
5. Test the API again:
   ```bash
   curl http://localhost:1337/api/home | jq '.data.tagline'
   ```
6. You should see your new tagline!

## Step 8: Add a New Service

1. Go to **Content Manager** → **Service**
2. Click **Create new entry**
3. Fill in:
   - Title: "Stress Management"
   - Description: "Techniques for managing stress"
   - Order: 7
4. Click **Save**
5. Test the API:
   ```bash
   curl "http://localhost:1337/api/services?sort=order:asc" | jq
   ```
6. You should see 7 services now!

## Step 9: Test Seed API Endpoint (Optional)

The project includes a REST API endpoint to seed the database programmatically. This is useful for automated deployments or resetting the database.

> **Note**: Replace `localhost:1337` with your WSL bridge IP if needed (e.g., `172.23.112.1:1337`)

```bash
# Seed the database via API
curl -X POST http://localhost:1337/api/seed/run \
  -H "x-seed-token: change-me-in-production" \
  | jq
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Database seeded successfully!"
}
```

**Security Note**: 
- The endpoint requires an `x-seed-token` header
- Default token is `change-me-in-production`
- In production, set `SEED_TOKEN` environment variable to a secure value
- If the token is incorrect, you'll get a 401 Unauthorized response

**When to use**:
- Automated deployment scripts
- Resetting development database
- CI/CD pipelines
- Initial production data setup

## 🐛 Troubleshooting

### Seed script says "already imported"
This is normal if you've run it before. To re-seed:
```bash
# Stop Strapi (Ctrl+C)
rm -rf .tmp/data.db
pnpm develop
# Create new admin account
pnpm seed
```

### API returns empty data
Check permissions:
1. Admin panel → **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Check that these are enabled:
   - Home: find
   - About: find
   - Approach: find
   - Service: find, findOne
   - Contact: find
   - Global: find

### Port 1337 already in use
Stop any running Strapi instances:
```bash
# Find process
lsof -i :1337
# Kill process
kill -9 <PID>
```

### Cannot access admin panel
Make sure Strapi is running:
```bash
pnpm develop
```

## ✅ Success Checklist

- [ ] Strapi starts without errors
- [ ] Admin account created
- [ ] All 6 content types visible
- [ ] Seed script runs successfully
- [ ] Home content displays in admin
- [ ] 6 services created
- [ ] API endpoints return data
- [ ] Can edit content in admin panel
- [ ] Edited content shows in API

## 🎉 You're All Set!

If all tests pass, your Kim Vassallo CMS is ready to use! 

### Next Steps:
1. **Customize content** in the admin panel
2. **Upload images** for hero section and about
3. **Build frontend** application to display the content
4. **Style frontend** based on jmurbanlcsw.com design

### Need Help?
- Check `QUICK-START.md` for setup guide
- See `STRUCTURE-OVERVIEW.md` for architecture
- Read `KIM-VASSALLO-README.md` for details
- Visit https://docs.strapi.io for Strapi docs

---

**Happy building! 🚀**
