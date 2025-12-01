# Vercel Deployment Guide

Your project is now configured for deployment on Vercel with PostgreSQL.

## 1. Database Setup (Vercel Postgres)
1. Go to your Vercel project dashboard.
2. Click on **Storage** tab.
3. Click **Connect Database** -> **Create New** -> **Postgres**.
4. Follow the prompts to create the database.
5. Once created, go to the **.env.local** tab in the database view and copy the variables.

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
