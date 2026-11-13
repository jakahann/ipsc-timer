# 🚀 Deploy to Vercel

Your code has been pushed to GitHub! Now deploy to Vercel.

## Option 1: One-Click Vercel Deploy (Recommended - Easiest)

Click this button to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jakahann/ipsc-timer)

This will:
1. Ask you to connect your GitHub account (if not already connected)
2. Clone your repository
3. Auto-detect settings from vercel.json
4. Deploy automatically ✅

## Option 2: GitHub Integration (Automatic Deployment)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Click **"Import Git Repository"**
5. Search for and select `ipsc-timer`
6. Click **"Import"**
7. Vercel auto-configures settings and deploys ✅

After this, every time you push to GitHub, Vercel auto-deploys!

## Option 3: Vercel CLI (Local Machine)

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Option 4: Manual Command Line

From your local machine:

```bash
cd /Users/jarno/Projects/hackathon/ipsc-timer

# Build locally first
npm run build

# Deploy using Vercel CLI
vercel --prod --confirm
```

## View Your Deployment

After deployment, Vercel will provide:
- **Production URL**: `https://ipsc-timer.vercel.app` (or your domain)
- **Preview URLs**: Unique URL for each deployment
- **Dashboard**: https://vercel.com/dashboard

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Select your project
2. Go to **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS instructions provided by Vercel

## Environment Variables (If Needed)

1. Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Add any needed variables (e.g., `VITE_API_URL`)
3. Redeploy with `vercel --prod`

---

**Status**: ✅ Code pushed to GitHub - Ready for Vercel deployment
