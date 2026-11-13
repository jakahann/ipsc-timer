# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Select **"Import Git Repository"**
5. Choose your GitHub repository
6. Vercel will auto-detect settings and deploy ✅

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration (Auto-Deploy)

1. Connect your GitHub to Vercel (one-time setup)
2. Push to main branch
3. Vercel automatically builds and deploys ✅

## Environment Variables

If you need environment variables in production:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_URL`)
3. Redeploy

Example:
```
VITE_API_URL=https://api.example.com
```

## Build Configuration

Vercel uses the following settings (automatically detected from `vercel.json`):

- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Install Command:** `npm install`
- **Framework:** Vite

## Monitoring & Logs

View deployment logs in Vercel Dashboard:
1. Select your project
2. Go to **Deployments**
3. Click a deployment to view logs

## Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update your domain DNS records (Vercel will provide instructions)

## Rollback

To rollback to a previous deployment:
1. Vercel Dashboard → Deployments
2. Find the deployment to rollback to
3. Click "..."  → "Promote to Production"

## Preview URLs

Each deployment gets a unique preview URL:
- Production: `https://yourproject.vercel.app`
- Preview: `https://yourproject-git-branch.vercel.app`

## Troubleshooting

### Build Fails

Check the build logs in Vercel Dashboard:
1. Deployments → Failed deployment → View logs
2. Common issues:
   - Missing dependencies: `npm install`
   - TypeScript errors: Run `npm run build` locally
   - Node version: Check `.nvmrc` or package.json engines

### App Shows 404

This is a client-side routing issue. The `vercel.json` rewrites are configured to handle this.
- Verify `vercel.json` has the rewrites section
- Redeploy with `vercel --prod`

### Slow Build

- Vercel caches `node_modules` between builds
- Large dependencies impact build time
- Check if you have unnecessary packages

## Performance Tips

- Use dynamic imports for large components
- Enable image optimization
- Monitor bundle size: `npm run build` and check dist/ size
- Keep dependencies updated
