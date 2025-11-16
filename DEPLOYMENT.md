# Deployment Guide for Smart Notes

This guide covers deploying Smart Notes to production using various platforms.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested the app locally (`npm run dev`)
- [ ] Created a production Appwrite project (separate from development)
- [ ] Set up production database and collection
- [ ] Obtained a Gemini API key
- [ ] Tested the build process (`npm run build`)
- [ ] Committed your code to a Git repository (GitHub, GitLab, etc.)

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Push to GitHub

```bash
# If you haven't already
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/smart-notes.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Sign up / Login to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your smart-notes repository
   - Vercel will auto-detect Next.js

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add each variable:

   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_production_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_production_database_id
   NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_production_collection_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

   - Environment: Production, Preview, Development (select all)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - You'll get a URL like `https://smart-notes-xyz.vercel.app`

### Step 3: Update Appwrite Platform

1. Go to Appwrite Console
2. Navigate to your production project
3. Go to Settings → Platforms → Add Platform
4. Select "Web App"
5. Add your Vercel domain (e.g., `smart-notes-xyz.vercel.app`)

### Step 4: Test Production

1. Visit your Vercel URL
2. Test signup/login
3. Create notes
4. Test AI features
5. Verify everything works

### Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request
- **Development**: On every commit to other branches

## Option 2: Deploy to Netlify

### Step 1: Build Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy

1. Go to https://netlify.com
2. Click "Add new site" → "Import existing project"
3. Connect to GitHub and select your repository
4. Build settings are auto-detected
5. Add environment variables (same as Vercel)
6. Click "Deploy site"

### Step 3: Update Appwrite

Add your Netlify domain to Appwrite platforms.

## Option 3: Deploy to Appwrite Sites

Coming soon - Appwrite Sites supports static sites and functions.

For now, use Vercel or Netlify for the frontend, with Appwrite handling backend.

## Option 4: Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- Environment variables configured

### Step 1: Environment Setup

1. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

2. **Update environment variables**
   Edit `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_collection_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Step 2: Build and Run with Docker Compose

```bash
# Build and start the application
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the application
docker-compose down
```

### Step 3: Manual Docker Build (Alternative)

```bash
# Build Docker image
docker build -t auralis .

# Run container with environment file
docker run -p 3000:3000 --env-file .env.local auralis
```

### Step 4: Health Check

The application includes a health check endpoint at `/api/health` that Docker uses to monitor container status.

## Environment Variables

All deployment platforms require these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint | Yes |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Production project ID | Yes |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Production database ID | Yes |
| `NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID` | Production collection ID | Yes |
| `GEMINI_API_KEY` | Gemini API key (server-side) | Yes |

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL is automatic

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. SSL is automatic

### Update Appwrite
Don't forget to add your custom domain to Appwrite platforms!

## Production Appwrite Setup

### Create Production Project

1. **New Project**
   - Create a separate project for production
   - Name: "Smart Notes Production"

2. **Database Setup**
   - Create database: "smart-notes-db"
   - Create collection: "notes"
   - Add all attributes (same as development)
   - Set permissions

3. **Enable Auth**
   - Enable Email/Password authentication
   - Configure email templates
   - (Optional) Enable email verification

4. **Add Platform**
   - Add your production domain
   - Add www subdomain if using

5. **Security**
   - Review and tighten permissions
   - Enable rate limiting
   - Set up monitoring

## Post-Deployment

### Testing Production

1. **Authentication**
   - Sign up with a new account
   - Login with credentials
   - Test logout
   - Verify session persistence

2. **Notes**
   - Create a note
   - Edit a note
   - Delete a note
   - Verify data persistence

3. **AI Features**
   - Test note summarization
   - Test AI insights
   - Verify API responses

### Monitoring

1. **Vercel Analytics**
   - Enable in project settings
   - Monitor performance
   - Track user engagement

2. **Appwrite Console**
   - Monitor database usage
   - Check authentication logs
   - Review API calls

3. **Error Tracking**
   - Set up Sentry (optional)
   - Monitor console for errors
   - Set up alerts

### Performance

1. **Next.js Analytics**
   - Monitor Core Web Vitals
   - Optimize slow pages
   - Review bundle size

2. **Database Optimization**
   - Add indexes if needed
   - Monitor query performance
   - Set up caching

## Troubleshooting Production Issues

### Build Failures

**Issue**: Build fails on platform
- Check all environment variables are set
- Verify Node.js version (18+)
- Review build logs for specific errors

### Authentication Not Working

**Issue**: Can't login in production
- Verify production Appwrite project ID
- Check platform domain is added in Appwrite
- Confirm Auth is enabled

### AI Features Not Working

**Issue**: Summarization fails
- Verify Gemini API key is set
- Check API key quota/limits
- Review server logs

### CORS Errors

**Issue**: Appwrite CORS errors
- Add production domain to Appwrite platforms
- Include both www and non-www versions
- Check protocol (https)

## Scaling Considerations

### Vercel
- Automatically scales
- CDN edge caching
- Serverless functions auto-scale

### Database (Appwrite)
- Free tier: Limited requests
- Pro tier: More capacity
- Monitor usage in console

### AI API (Gemini)
- Free tier has quotas
- Implement rate limiting if needed
- Consider caching summaries

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use platform secrets management
   - Rotate API keys periodically

2. **Appwrite**
   - Use separate projects for dev/prod
   - Enable document-level permissions
   - Regular security audits

3. **HTTPS**
   - Always use HTTPS in production
   - Enable HSTS headers
   - Use secure cookies

4. **Updates**
   - Keep dependencies updated
   - Monitor for security advisories
   - Regular npm audit

## Backup Strategy

1. **Appwrite Data**
   - Regular database exports
   - Store backups securely
   - Test restore process

2. **Code**
   - Version control with Git
   - Tag releases
   - Document changes

## Support

If deployment fails:
- Check platform docs (Vercel/Netlify)
- Review Appwrite status page
- Check Next.js deployment guide
- Reach out to platform support

## Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Netlify Deployment Docs](https://docs.netlify.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Appwrite Production Guide](https://appwrite.io/docs)

---

**Recommended**: Deploy to Vercel for the best Next.js experience with minimal configuration.
