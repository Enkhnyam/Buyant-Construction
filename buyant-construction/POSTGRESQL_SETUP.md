# PostgreSQL Setup Guide

## Overview
This guide will help you switch from SQLite to PostgreSQL for your Buyant Construction project.

## What Changed
- ✅ Database provider: SQLite → PostgreSQL
- ✅ Dependencies: Removed `sqlite3`, added `pg`
- ✅ Docker: Added PostgreSQL service
- ✅ Environment: Updated connection strings

## Local Development Setup

### Option 1: Use Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database: `createdb buyant_construction_dev`
3. Update `.env.local` with your local PostgreSQL credentials
4. Run: `npm run db:push` to create tables
5. Run: `npm run db:seed` to populate data

### Option 2: Use Docker (Recommended)
1. Start PostgreSQL: `docker-compose up postgres -d`
2. Wait for PostgreSQL to be ready
3. Run: `npm run db:push` to create tables
4. Run: `npm run db:seed` to populate data

## Production (Coolify)
Your Coolify environment is already configured with PostgreSQL:
- Database URL: `postgresql://postgres:w0Z57RhwQlgwY40j90PWfSFJpsLh3lUnFbKcthasVRah1ORgjunJ995olEaEyoar@localhost:5432/postgres`

## Image Handling
- Images are stored in `/public/uploads/` directory
- No database migration needed for images
- Existing images will continue to work
- New images uploaded through admin panel will be saved to the same location

## Database Commands
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database (WARNING: deletes all data)
npm run db:reset
```

## Troubleshooting
- If you get connection errors, check your PostgreSQL is running
- If you get permission errors, check your database user permissions
- For Docker issues, try: `docker-compose down -v` then `docker-compose up postgres -d`

## Notes
- All existing projects will be lost (as requested)
- You can recreate them through the admin panel
- The admin panel functionality will work with PostgreSQL
- No complex migrations needed - clean slate approach
