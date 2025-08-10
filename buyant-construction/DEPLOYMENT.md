# Buyant Construction - Deployment Guide

## 🐳 Phase 1: Local Docker Testing

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ for local development

### Local Testing Steps

1. **Build and test locally:**
   ```bash
   docker-compose up --build
   ```

2. **Verify the application:**
   - Open http://localhost:3000
   - Test admin login functionality
   - Test file uploads
   - Verify all pages load correctly

3. **Check container logs:**
   ```bash
   docker-compose logs -f app
   ```

## 🚀 Phase 2: Coolify Deployment

### Repository Setup
1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Ensure the following files are committed:
   - `Dockerfile`
   - `.dockerignore`
   - `next.config.ts` (with `output: 'standalone'`)
   - `package.json`
   - `prisma/schema.prisma`

### Coolify Configuration

#### Build Settings
- **Source**: Your Git repository
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: 3000
- **Health Check Path**: `/api/health`

#### Environment Variables
```bash
# Required
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com

# Optional
NEXT_TELEMETRY_DISABLED=1
```

#### Volume Mounts
- **Database**: Mount your PostgreSQL data directory
- **Uploads**: Mount `/app/public/uploads` for persistent file storage

### Database Migration (SQLite → PostgreSQL)

1. **Update Prisma schema:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Create new migration:**
   ```bash
   npx prisma migrate dev --name postgresql-migration
   ```

3. **Update environment variables in Coolify**

## 🔧 Troubleshooting

### Common Issues

1. **Build fails with "standalone not found"**
   - Ensure `output: 'standalone'` is in `next.config.ts`
   - Check that the build completes successfully

2. **Database connection errors**
   - Verify `DATABASE_URL` format
   - Ensure database is accessible from container

3. **File upload issues**
   - Check volume mount permissions
   - Verify upload directory exists

4. **Health check fails**
   - Check if `/api/health` endpoint is accessible
   - Review application logs

### Logs and Debugging

```bash
# View container logs
docker-compose logs -f app

# Access container shell
docker-compose exec app sh

# Check file permissions
docker-compose exec app ls -la /app/public/uploads
```

## 📋 Pre-Deployment Checklist

- [ ] Dockerfile created and tested locally
- [ ] Next.js config updated with `output: 'standalone'`
- [ ] .dockerignore file created
- [ ] Health check endpoint created at `/api/health`
- [ ] Local Docker testing completed successfully
- [ ] All environment variables documented
- [ ] Database migration plan ready
- [ ] File upload paths configured correctly

## 🔄 Deployment Workflow

1. **Local Testing**: `docker-compose up --build`
2. **Code Review**: Ensure all changes are committed
3. **Push to Git**: Deploy to your repository
4. **Coolify Setup**: Configure build and environment
5. **Deploy**: Trigger deployment in Coolify
6. **Verify**: Check health endpoint and functionality
7. **Monitor**: Watch logs for any issues

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review Coolify logs and container logs
3. Verify all configuration settings
4. Test locally with Docker Compose first
