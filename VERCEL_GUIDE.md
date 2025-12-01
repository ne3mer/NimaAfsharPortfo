# Vercel Deployment Guide

Your project is now configured for deployment on Vercel with PostgreSQL.

## 1. Database Setup
You have a few excellent options from the Vercel Marketplace.

**Recommended: Neon (Serverless Postgres)**
This is the engine behind Vercel's native Postgres.
1. Select **Neon** from the Marketplace.
2. Click **Add Integration**.
3. Follow the setup steps.
4. It will automatically add the necessary environment variables (`POSTGRES_PRISMA_URL`, etc.) to your project.

**Alternative: Supabase**
1. Select **Supabase**.
2. Follow setup.
3. **Note**: You may need to update `prisma/schema.prisma` to use `DATABASE_URL` instead of `POSTGRES_PRISMA_URL` if Supabase provides different variable names.

**Alternative: Prisma Postgres**
1. Select **Prisma Postgres**.
2. Follow setup.

## 2. Environment Variables
In your Vercel Project Settings -> **Environment Variables**, ensure you have the following:

| Variable | Description |
|----------|-------------|
| `POSTGRES_PRISMA_URL` | Connection string for Prisma (from Vercel Postgres) |
| `POSTGRES_URL_NON_POOLING` | Direct connection string (from Vercel Postgres) |
| `AUTH_SECRET` | A random 32+ character string (run `openssl rand -base64 32` to generate) |
| `NEXTAUTH_URL` | Your production URL (e.g., `https://your-project.vercel.app`) |

## 3. Deployment
1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and run the build.
4. The `postinstall` script (`prisma generate`) will run automatically.

## 4. Database Migration
After deployment, you may need to push your schema to the production database. You can do this from your local machine if you have the production credentials in your `.env`, or use the Vercel CLI.

**Local Migration Command:**
```bash
npx prisma db push
```
*(Ensure your `.env` has the production `POSTGRES_PRISMA_URL` temporarily, or pass it explicitly)*
