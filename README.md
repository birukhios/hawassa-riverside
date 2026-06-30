# Hawassa Community Fund

A beautiful, modern fundraising website for Hawassa City, built with Next.js 14, React 19, and TypeScript. Integrated with **AfroPay Checkout** for secure donation processing.

## 🎯 Features

✨ **Beautiful Design**
- Mobile-first responsive layout
- Smooth animations and transitions
- Modern gradient backgrounds
- Clean, professional typography

💰 **Donation System**
- One-page fundraising campaign
- Multiple donation amounts
- Custom donation support
- Anonymous donation option
- Real-time donation tracking

🔒 **Payment Processing**
- Secure AfroPay Checkout integration
- Server-side payment verification
- Donation status tracking
- Webhook support for payment updates
- Success/Failure payment pages

📊 **Campaign Dashboard**
- Progress visualization
- Donor statistics
- Impact breakdown
- Recent donor list
- Admin dashboard for management

🌍 **Trust & Transparency**
- Security badges
- Transparent donation tracking
- Public progress updates
- FAQ section
- Contact information

## 📋 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── donations/           # POST/GET donation endpoints
│   │   └── afropay/
│   │       ├── webhook/         # Payment webhook handler
│   │       └── verify/          # Payment verification
│   ├── admin/                   # Admin dashboard
│   ├── success/                 # Success page
│   ├── failure/                 # Failure page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── HeroSection.tsx
│   ├── CampaignProgress.tsx
│   ├── ImpactSection.tsx
│   ├── StorySection.tsx
│   ├── ImpactBreakdown.tsx
│   ├── DonationForm.tsx
│   ├── RecentDonors.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx
├── lib/
│   ├── afropay.ts              # AfroPay utilities
│   ├── constants.ts            # Configuration
│   └── validations.ts          # Zod schemas
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                      # Static assets
└── .env.local                   # Environment variables
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your AfroPay credentials.

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🎨 Website Sections

1. **Hero Section** - Campaign introduction with CTA
2. **Campaign Progress** - Animated fundraising progress
3. **Impact Areas** - Six impact categories
4. **Storytelling** - Emotional narrative about Hawassa
5. **Impact Breakdown** - Donation amount impact examples
6. **Donation Form** - Main donation interface
7. **Recent Donors** - Live donor feed
8. **FAQ** - Frequently asked questions
9. **Footer** - Links and contact info
10. **Admin Dashboard** - Donation management (/admin)

## 💳 Payment Processing

**Flow:**
1. User fills donation form
2. Frontend calls `/api/donations`
3. Backend creates donation record & gets AfroPay reference
4. User redirected to AfroPay Checkout
5. After payment, redirected to success/failure page
6. AfroPay webhook verifies payment
7. Backend updates donation status

## 🔐 Security

- ✅ Server-side form validation
- ✅ Payment verification on backend
- ✅ Webhook signature validation
- ✅ Environment variable protection
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection

## 📁 Database Models

**Campaign** - Fundraising campaign metadata
**Donation** - Individual donor contributions
**PaymentTransaction** - Payment records from AfroPay

See [SETUP.md](./SETUP.md) for detailed configuration and deployment instructions.

## 💡 Customization

- Update campaign details in `src/lib/constants.ts`
- Modify component text in `src/components/`
- Change colors in Tailwind classes
- Configure AfroPay keys in `.env.local`

## 🚀 Deployment

**Vercel (Recommended):**
- Push to GitHub
- Import in Vercel
- Set environment variables
- Deploy

**Docker:**
```bash
docker build -t hawassa-fund .
docker run -p 3000:3000 hawassa-fund
```

## 📞 Support

- Email: support@hawassafund.org
- See [SETUP.md](./SETUP.md) for detailed documentation

## 📜 License

MIT License - Built with ❤️ for Hawassa City

---

**Next Steps:** See [SETUP.md](./SETUP.md) for complete setup and deployment guide.
