# Deployment Guide - Hawassa Community Fund

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] Database initialized with `npm run prisma migrate dev`
- [ ] Build succeeds with `npm run build`
- [ ] All tests pass
- [ ] Admin dashboard protected with authentication
- [ ] AfroPay webhook URL configured in dashboard
- [ ] Email notifications configured (optional)
- [ ] Security review completed
- [ ] Analytics integrated (optional)
- [ ] Backup strategy documented

## Deployment Options

### 1. Vercel (Recommended for Production)

**Easiest & Most Recommended**

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hawassa Community Fund"
   git remote add origin https://github.com/yourusername/hawassa-fundraise.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     NEXT_PUBLIC_AFROPAY_PUBLIC_KEY=your_public_key
     AFROPAY_SECRET_KEY=your_secret_key
     AFROPAY_API_URL=https://api.afropay.com
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     DATABASE_URL=file:./dev.db  # Or use PostgreSQL
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Your site is live!

**Advantages:**
- Free tier available
- Automatic SSL
- CDN included
- Fast deployments
- Automatic previews
- No server management

### 2. Docker (Self-Hosted)

**For custom deployments**

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build app
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```

#### Create .dockerignore:

```
node_modules
.next
.git
.env.local
dev.db
```

#### Build and Run:

```bash
# Build image
docker build -t hawassa-fund:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_AFROPAY_PUBLIC_KEY=your_key \
  -e AFROPAY_SECRET_KEY=your_secret \
  -e DATABASE_URL="file:./dev.db" \
  hawassa-fund:latest
```

#### Push to Docker Hub:

```bash
# Tag image
docker tag hawassa-fund:latest yourusername/hawassa-fund:latest

# Login to Docker Hub
docker login

# Push
docker push yourusername/hawassa-fund:latest
```

### 3. Traditional Server (VPS/EC2)

**For full control**

#### Requirements:
- Ubuntu 20.04+ or similar
- Node.js 18+
- Nginx or Apache (reverse proxy)
- SSL certificate (Let's Encrypt)

#### Steps:

1. **SSH into Server**
   ```bash
   ssh ubuntu@your-server-ip
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/hawassa-fundraise.git
   cd hawassa-fundraise
   ```

4. **Install & Build**
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

5. **Configure Environment**
   ```bash
   nano .env.production.local
   ```
   Add your production environment variables.

6. **Start with PM2**
   ```bash
   pm2 start npm --name "hawassa-fund" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable HTTPS (Let's Encrypt)**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

9. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### 4. AWS (EC2 + RDS)

**For scalable deployments**

#### Services:
- EC2 (Compute)
- RDS (Database)
- S3 (Static files)
- CloudFront (CDN)
- Route 53 (DNS)

#### Steps:
1. Launch EC2 instance (Ubuntu 20.04)
2. Follow VPS installation steps above
3. Create RDS PostgreSQL database
4. Update DATABASE_URL to RDS endpoint
5. Configure security groups
6. Set up CloudFront for S3 assets
7. Configure Route 53 DNS

### 5. Render, Heroku, or Railway

**Easy platform alternatives**

#### Render:
```bash
# Connect GitHub repository
# Set environment variables in Render dashboard
# Deploy automatically on push
```

#### Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

## Production Checklist

### Security
- [ ] Review API endpoint security
- [ ] Add rate limiting
- [ ] Enable CORS properly
- [ ] Use HTTPS everywhere
- [ ] Secure AfroPay webhook verification
- [ ] Protect admin dashboard with authentication
- [ ] Review environment variables
- [ ] Add CSRF protection if needed

### Database
- [ ] Use PostgreSQL in production (not SQLite)
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Monitor database performance
- [ ] Plan scaling strategy

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (CloudWatch, DataDog)
- [ ] Monitor uptime
- [ ] Track performance metrics
- [ ] Set up alerts

### Performance
- [ ] Enable image optimization
- [ ] Configure caching headers
- [ ] Use CDN for static assets
- [ ] Monitor page load times
- [ ] Optimize bundle size

### Maintenance
- [ ] Set up automated backups
- [ ] Plan update strategy
- [ ] Document runbooks
- [ ] Set up monitoring dashboards
- [ ] Create incident response plan

## Scaling Considerations

### Database
- Start with SQLite for testing
- Migrate to PostgreSQL for production
- Use connection pooling
- Set up read replicas if needed
- Consider sharding for very large databases

### Server
- Use load balancers (AWS ALB, Nginx)
- Deploy multiple instances
- Use auto-scaling groups
- Monitor server metrics
- Plan for failover

### Storage
- Use S3 or similar for file uploads
- Configure CDN for assets
- Monitor storage costs
- Set up lifecycle policies

## Monitoring & Maintenance

### Tools
- **Error Tracking**: Sentry, Rollbar
- **Logging**: CloudWatch, ELK Stack, LogRocket
- **Monitoring**: Datadog, New Relic, Prometheus
- **Uptime**: StatusPage, Pingdom
- **Analytics**: Google Analytics, Mixpanel

### Key Metrics
- Page load time
- Error rate
- Donation completion rate
- Server uptime
- Database performance
- API response times

## Rollback Plan

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Redeploy automatically (on Vercel/similar)
# Or manually redeploy if needed
```

## Support & Updates

- Monitor GitHub for security updates
- Keep Node.js updated
- Update dependencies regularly
- Review Next.js releases for upgrades
- Test updates in staging first

## Cost Estimate

### Vercel
- Free tier: $0
- Hobby: $0
- Pro: $20/month
- Enterprise: Custom pricing

### AWS
- EC2 (t3.micro): ~$5/month
- RDS (db.t3.micro): ~$15/month
- Data transfer: Variable
- Total: ~$20-50/month

### DigitalOcean
- Basic Droplet: $4-6/month
- Managed PostgreSQL: ~$15/month
- Total: ~$20/month

### Self-hosted VPS
- Linode/Vultr: $5-10/month
- Total: $5-10/month (minimal)

## Troubleshooting

### Build Fails on Deployment
```bash
# Clear cache
rm -rf .next node_modules

# Reinstall
npm install --legacy-peer-deps
npm run build
```

### Database Connection Issues
- Check DATABASE_URL format
- Verify database is accessible
- Check connection limits
- Review security groups/firewall

### Payment Issues
- Verify AfroPay keys
- Check webhook URL
- Review payment logs
- Test with sandbox mode first

### High Memory Usage
- Check for memory leaks
- Monitor database queries
- Review API performance
- Consider scaling

---

**Questions?** See README.md or SETUP.md for more info.
