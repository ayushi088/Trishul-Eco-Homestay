# Deployment & Setup Guide - Trishul Eco Homestays

## Pre-Deployment Checklist

- [ ] All pages tested locally
- [ ] No console errors or warnings
- [ ] Images optimized
- [ ] Environment variables configured
- [ ] Build succeeds without errors
- [ ] Performance metrics checked
- [ ] Security audit completed
- [ ] Backup plan in place

## Local Setup & Development

### 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd trishul-homestays

# Install dependencies
pnpm install
# or: npm install / yarn install / bun install

# Start development server
pnpm dev
```

The application will run at `http://localhost:3000`

### 2. Environment Configuration

Create a `.env.local` file:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database (future)
DATABASE_URL=postgresql://user:password@localhost:5432/trishul_dev

# Authentication
JWT_SECRET=your-secret-key-min-32-chars
REFRESH_TOKEN_SECRET=your-refresh-secret-key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@trishul.com

# File Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

### 3. Development Workflow

```bash
# Start dev server with HMR
pnpm dev

# Open browser
open http://localhost:3000

# Make changes - they'll auto-reload
# Edit app/page.tsx or components/

# Run type checking
pnpm tsc --noEmit

# Run linting
pnpm lint

# Build production bundle
pnpm build

# Start production server
pnpm start
```

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/trishul-homestays.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select "Next.js" as framework
   - Configure environment variables
   - Deploy

3. **Automatic Deployments**
   - Push to `main` → Production deployment
   - Push to feature branches → Preview deployments
   - Pull requests → Preview URLs for testing

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

### Option 3: Manual Deployment

```bash
# Build
pnpm build

# Output is in .next/

# Deploy .next/ to any Node.js hosting
# (Railway, Render, AWS, GCP, Azure, etc.)
```

## Environment Variables on Vercel

1. Go to **Settings → Environment Variables**
2. Add variables for each environment:
   - **Preview** (pull request previews)
   - **Development** (git pull requests)
   - **Production** (main branch)

```env
# Production environment
DATABASE_URL=postgresql://...prod...
JWT_SECRET=prod-secret-key
NEXT_PUBLIC_API_URL=https://api.trishul.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=prod-key
```

## Database Setup (Future)

### Using Supabase PostgreSQL

```bash
# 1. Create account at supabase.com
# 2. Create new project
# 3. Get connection string from Project Settings
# 4. Add to .env.local

DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres?schema=public

# 5. Run migrations
pnpm prisma migrate dev

# 6. Seed database (optional)
pnpm prisma db seed
```

### Using Local PostgreSQL

```bash
# Install PostgreSQL
# On macOS: brew install postgresql@15
# On Ubuntu: sudo apt install postgresql

# Start service
pg_ctl -D /usr/local/var/postgres start

# Create database
createdb trishul_dev

# Add connection string
DATABASE_URL=postgresql://localhost:5432/trishul_dev

# Run migrations
pnpm prisma migrate dev
```

## Build & Optimization

### Production Build

```bash
# Build
pnpm build

# Analyze bundle
npx @next/bundle-analyzer

# Test production build locally
pnpm start
```

### Performance Checks

```bash
# Check Web Vitals
lighthouse https://yourdomain.com

# Monitor metrics
# - LCP (Largest Contentful Paint): < 2.5s
# - FID (First Input Delay): < 100ms
# - CLS (Cumulative Layout Shift): < 0.1
```

## SSL & HTTPS

### Automatic (Vercel)
- Vercel automatically provides SSL certificates
- Auto-renewal handled
- HTTPS enforced by default

### Custom Domain
1. Point domain DNS to Vercel
2. Add domain in Vercel Settings
3. SSL certificate auto-generated (30 seconds)

## Monitoring & Analytics

### Vercel Analytics
```
Settings → Analytics
- Core Web Vitals
- Traffic trends
- Deployment history
```

### Error Tracking (Future - Sentry)
```env
SENTRY_AUTH_TOKEN=your-token
NEXT_PUBLIC_SENTRY_DSN=https://...
```

### Application Monitoring
```bash
# Health check endpoint (future)
GET /api/health

# Response:
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-06-15T10:30:00Z"
}
```

## Backup & Recovery

### Automated Backups
- GitHub is your version control backup
- Vercel keeps deployment history
- Database daily backups (via Supabase)

### Manual Backup

```bash
# Export database
pg_dump postgresql://... > backup.sql

# Export code
git clone --mirror ...
```

## Rollback Procedure

### Quick Rollback (Vercel)
1. Go to Deployments tab
2. Click the previous deployment
3. Click "Promote to Production"

### Manual Rollback
```bash
# Revert last commit
git revert HEAD

# Push
git push origin main

# Vercel auto-deploys
```

## Common Issues & Solutions

### Issue: Build Fails
```bash
# Solution 1: Clear cache
rm -rf .next
pnpm build

# Solution 2: Update dependencies
pnpm update

# Solution 3: Check Node version
node --version  # Should be 18+
```

### Issue: Environment Variables Not Loading
```bash
# Verify .env.local exists
ls -la .env.local

# Restart dev server
pnpm dev

# On Vercel: Check Settings → Environment Variables
```

### Issue: Slow Performance
```bash
# Check bundle size
npx @next/bundle-analyzer

# Check Core Web Vitals
vercel analytics

# Optimize images
# - Use next/image component
# - Compress with Cloudinary
```

### Issue: Database Connection Failed
```bash
# Test connection
psql $DATABASE_URL

# Check .env variables
cat .env.local | grep DATABASE

# Verify PostgreSQL is running
pg_isready
```

## Monitoring Checklist

Daily:
- [ ] Check Vercel deployment status
- [ ] Monitor error rates
- [ ] Check uptime

Weekly:
- [ ] Review Web Vitals
- [ ] Check database performance
- [ ] Review user feedback

Monthly:
- [ ] Security audit
- [ ] Performance analysis
- [ ] Dependency updates
- [ ] Backup verification

## Scaling Considerations

### Database
- Use connection pooling (Supabase)
- Add indexes on frequently queried fields
- Archive old bookings/reviews

### Frontend
- CDN caching (automatic with Vercel)
- Static generation for pages
- Image optimization

### Backend (Future)
- Horizontal scaling with load balancer
- Cache layer with Redis
- Message queue for async tasks

## Security Deployment

Before going live:

1. **SSL/HTTPS**
   - ✅ Automatic on Vercel

2. **Environment Variables**
   - ✅ Never commit secrets
   - ✅ Use .env.local (git ignored)
   - ✅ Set on Vercel dashboard

3. **CORS**
   - Configure allowed origins
   - Test with curl

4. **Rate Limiting**
   - Implement on API routes
   - 100 requests per minute for public endpoints

5. **Input Validation**
   - All forms use Zod validation
   - Server-side validation on backend

6. **Secrets Management**
   - Rotate API keys quarterly
   - Use separate keys for prod/staging
   - Never share secrets in git

## Disaster Recovery Plan

### RTO (Recovery Time Objective): 1 hour
### RPO (Recovery Point Objective): 15 minutes

```
Data Loss → Restore from Supabase backup
Deployment Failure → Revert to previous version
Database Corruption → Restore from backup
Security Breach → Rotate all secrets, force password reset
```

## Post-Deployment Verification

```bash
# 1. Check homepage
curl https://trishul.com

# 2. Verify SSL
curl -I https://trishul.com

# 3. Check redirects
curl -L http://trishul.com  # Should redirect to HTTPS

# 4. Test API connectivity
curl https://trishul.com/api/health

# 5. Verify assets load
# Open DevTools → Network → check image sizes
```

## Continuous Deployment Setup

### GitHub Actions (Optional)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Prisma Docs**: https://www.prisma.io/docs

## Contact

- **Deployment Issues**: devops@trishul.com
- **Application Issues**: dev@trishul.com
- **General Support**: support@trishul.com

---

**Last Updated**: June 15, 2026
**Next Review**: September 15, 2026
