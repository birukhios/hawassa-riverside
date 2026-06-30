# Hawassa Community Fund - Setup Guide

## Project Overview

Hawassa Community Fund is a modern, mobile-first fundraising website for Hawassa City. It enables donors to contribute to community-driven initiatives with AfroPay Checkout integration.

## Features

✅ Beautiful, responsive design
✅ One-page fundraising campaign
✅ AfroPay Checkout integration
✅ Donation tracking and progress visualization
✅ Admin dashboard for viewing donations
✅ Mobile-first responsive layout
✅ Trust-building elements (security badges, transparency)
✅ Success/failure payment pages

## Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Payment**: AfroPay Checkout

## Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

### Step 2: Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXT_PUBLIC_AFROPAY_PUBLIC_KEY`: Your AfroPay public key
- `AFROPAY_SECRET_KEY`: Your AfroPay secret key
- `AFROPAY_API_URL`: AfroPay API endpoint
- `NEXT_PUBLIC_SITE_URL`: Your site URL

### Step 3: Initialize Database

```bash
npm run prisma migrate dev --name init
```

This creates the SQLite database and runs migrations.

### Step 4: Start Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── donations/           # Donation endpoints
│   │   └── afropay/
│   │       ├── webhook/         # AfroPay webhook handler
│   │       └── verify/          # Payment verification
│   ├── admin/                   # Admin dashboard
│   ├── success/                 # Success page after payment
│   ├── failure/                 # Failure page after payment
│   └── page.tsx                 # Home page
├── components/
│   ├── HeroSection.tsx          # Main hero banner
│   ├── CampaignProgress.tsx     # Progress bar and stats
│   ├── ImpactSection.tsx        # Impact categories
│   ├── StorySection.tsx         # Storytelling section
│   ├── ImpactBreakdown.tsx      # Donation impact breakdown
│   ├── DonationForm.tsx         # Main donation form
│   ├── RecentDonors.tsx         # Recent donations list
│   ├── FAQSection.tsx           # FAQ accordion
│   └── Footer.tsx               # Footer with links
├── lib/
│   ├── afropay.ts              # AfroPay integration utilities
│   ├── constants.ts            # Constants and config
│   └── validations.ts          # Zod schemas
└── app/
    ├── globals.css             # Global styles
    └── layout.tsx              # Root layout
```

## Configuration

### Campaign Settings

Edit `src/lib/constants.ts` to customize:
- Campaign title and description
- Donation amounts
- Impact categories
- FAQ items

### Colors & Branding

Update Tailwind colors in `tailwind.config.ts`:
- Primary blue: `blue-600`
- Success green: `green-600`
- Accent colors: Customize as needed

## AfroPay Integration

### Setting Up AfroPay

1. Sign up at [AfroPay](https://afropay.com)
2. Get your API keys from the dashboard
3. Add keys to `.env.local`
4. Configure webhook URL in AfroPay dashboard: `{YOUR_DOMAIN}/api/afropay/webhook`

### Donation Flow

1. User selects amount and enters details
2. Frontend calls `/api/donations` to create donation record
3. Backend returns AfroPay reference
4. User is redirected to AfroPay Checkout
5. After payment, AfroPay redirects to success/failure page
6. AfroPay sends webhook to verify payment
7. Backend updates donation status in database

## Database Models

### Campaign
- `id`: Unique identifier
- `title`: Campaign name
- `description`: Short description
- `longDescription`: Extended description
- `goalAmount`: Fundraising goal
- `raisedAmount`: Amount raised so far
- `currency`: Currency (ETB)
- `status`: active, completed, paused
- `imageUrl`: Campaign image
- `createdAt`, `updatedAt`: Timestamps

### Donation
- `id`: Unique identifier
- `campaignId`: Associated campaign
- `donorName`: Name of donor (optional if anonymous)
- `donorEmail`: Donor email for receipt
- `donorPhone`: Donor phone number (optional)
- `amount`: Donation amount
- `currency`: Currency (ETB)
- `isAnonymous`: Whether to hide donor name publicly
- `message`: Optional donation message
- `status`: pending, processing, successful, failed, cancelled
- `afroPayReference`: AfroPay transaction reference
- `createdAt`, `updatedAt`: Timestamps

### PaymentTransaction
- `id`: Unique identifier
- `donationId`: Associated donation
- `campaignId`: Associated campaign
- `provider`: Payment provider (afropay)
- `afroPayReference`: AfroPay reference
- `internalReference`: Internal tracking reference
- `amount`: Transaction amount
- `currency`: Transaction currency
- `status`: Payment status
- `gatewayResponse`: Response from payment gateway
- `verifiedAt`: When payment was verified
- `createdAt`, `updatedAt`: Timestamps

## API Endpoints

### Donations
- `POST /api/donations` - Create a new donation
- `GET /api/donations` - List donations (with filters)

### AfroPay
- `POST /api/afropay/webhook` - Handle AfroPay callbacks
- `POST /api/afropay/verify` - Verify payment status

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View total funds raised
- See donor count and statistics
- Track donation status
- Filter donations by status
- Export donation data

**Note**: Add authentication middleware before deploying.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Production Checklist

- [ ] Set up proper database (PostgreSQL recommended)
- [ ] Configure AfroPay API keys
- [ ] Enable HTTPS
- [ ] Add authentication to admin dashboard
- [ ] Set up email notifications
- [ ] Configure backup strategy
- [ ] Add rate limiting to API routes
- [ ] Implement CSRF protection
- [ ] Set up monitoring and logging
- [ ] Review security best practices
- [ ] Add analytics tracking
- [ ] Test payment flows end-to-end

## Security Considerations

1. **API Keys**: Never commit `.env.local` to version control
2. **Payment Verification**: Always verify payments server-side
3. **Webhook Signature**: Verify AfroPay webhook signatures
4. **Admin Access**: Protect `/admin` with authentication
5. **Rate Limiting**: Add rate limits to API endpoints
6. **Input Validation**: All inputs are validated with Zod
7. **CORS**: Configure CORS properly for production

## Troubleshooting

### Database Issues
```bash
npm run prisma db push
npm run prisma studio # View database in UI
```

### Build Errors
```bash
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

## Contributing

To add features:
1. Create a new branch: `git checkout -b feature/feature-name`
2. Make changes
3. Test thoroughly
4. Create a pull request

## Support

For questions or issues:
- Email: support@hawassafund.org
- GitHub Issues: [Project issues]

## License

MIT License - See LICENSE file for details

## Acknowledgments

Built with ❤️ for Hawassa City
Powered by AfroPay Checkout
