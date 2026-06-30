# Quick Start Guide - Hawassa Community Fund

## 🚀 Get Started in 5 Minutes

### 1. Install & Start

```bash
cd /Users/biruk/Documents/afrocrowd-fundraise
npm install --legacy-peer-deps
npm run dev
```

🌐 **Visit:** http://localhost:3000

### 2. View the Website

The website has these main sections:
- ✅ Hero banner with call-to-action
- ✅ Campaign progress (animated)
- ✅ 6 impact categories
- ✅ Emotional story section
- ✅ Donation form
- ✅ Recent donors list
- ✅ FAQ accordion
- ✅ Footer with links
- ✅ Admin dashboard (/admin)

### 3. Key Features to Try

**Donate Section:**
- Click "Donate with AfroPay" button
- Try different amounts (100, 500, 1000, 5000)
- Try custom amount
- Check anonymous option
- Form validates automatically

**Admin Dashboard:**
- Visit http://localhost:3000/admin
- See donation statistics
- Filter by status
- See sample donor data

**Pages:**
- Home: http://localhost:3000
- Success: http://localhost:3000/success
- Failure: http://localhost:3000/failure
- Admin: http://localhost:3000/admin

### 4. Configure AfroPay (Optional)

```bash
# Edit environment file
nano .env.local

# Add your keys:
NEXT_PUBLIC_AFROPAY_PUBLIC_KEY=your_public_key
AFROPAY_SECRET_KEY=your_secret_key
AFROPAY_API_URL=https://api.afropay.com
```

### 5. Test APIs (Optional)

```bash
# Create a donation
curl -X POST http://localhost:3000/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "ETB",
    "donorName": "Test Donor",
    "donorEmail": "test@example.com",
    "isAnonymous": false,
    "campaignId": "hawassa-main-fund"
  }'

# Get donations
curl http://localhost:3000/api/donations?campaignId=hawassa-main-fund
```

---

## 📁 Project Location

```
/Users/biruk/Documents/afrocrowd-fundraise/
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Project overview |
| **SETUP.md** | Detailed setup instructions |
| **DEPLOYMENT.md** | How to deploy |
| **PROJECT_SUMMARY.md** | Complete feature list |
| **QUICK_START.md** | This file |

---

## 🎨 Customization (Quick Tips)

### Change Campaign Title
📄 `src/lib/constants.ts`
```typescript
export const CAMPAIGN_TITLE = "Your Title";
```

### Change Colors
📄 Component files use Tailwind classes:
- `bg-blue-600` → Primary color
- `bg-green-600` → Secondary color
- `bg-red-600` → Accent color

### Change Donation Amounts
📄 `src/lib/constants.ts`
```typescript
export const DONATION_AMOUNTS = [
  { value: 100, label: "ETB 100" },
  // Add more...
];
```

### Edit FAQs
📄 `src/lib/constants.ts`
```typescript
export const FAQS = [
  { question: "...", answer: "..." },
  // Edit or add more
];
```

---

## ⚙️ Build & Deploy

### Development
```bash
npm run dev  # Starts http://localhost:3000
```

### Production Build
```bash
npm run build
npm start    # Test production build
```

### Deploy to Vercel (Recommended)
```bash
git push origin main
# Auto-deploys to Vercel
```

See **DEPLOYMENT.md** for more options.

---

## 🔑 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/donations` | Create donation |
| GET | `/api/donations` | List donations |
| POST | `/api/afropay/webhook` | Handle payment callback |
| POST | `/api/afropay/verify` | Verify payment |

---

## 📊 Admin Dashboard

Access at: **http://localhost:3000/admin**

Shows:
- Total funds raised
- Number of donors
- Successful donations
- Pending donations
- Donations table with filters
- Export button

---

## 🔒 Security Notes

⚠️ **Before Production:**
- [ ] Add authentication to `/admin`
- [ ] Verify AfroPay webhook signatures
- [ ] Use HTTPS in production
- [ ] Protect environment variables
- [ ] Add rate limiting to API routes
- [ ] Review security best practices

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Dependencies Issue
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build Fails
```bash
npm run build
# Check error messages and fix
```

---

## 📞 Support

- 📧 Email: support@hawassafund.org
- 📖 Docs: See README.md, SETUP.md, DEPLOYMENT.md
- 💬 Questions: Check the FAQ section

---

## ✨ What's Included

✅ Beautiful responsive design
✅ 9 main components/sections
✅ Donation form with validation
✅ AfroPay checkout integration
✅ Admin dashboard
✅ Success/failure pages
✅ Database (SQLite + Prisma)
✅ API routes (Next.js)
✅ TypeScript for type safety
✅ Tailwind CSS styling
✅ Form validation (Zod)
✅ Complete documentation

---

## 🎯 Next Steps

1. **Explore** - Visit http://localhost:3000 and test the site
2. **Customize** - Edit content in `src/lib/constants.ts`
3. **Configure** - Add AfroPay keys to `.env.local`
4. **Test** - Use AfroPay sandbox for testing
5. **Deploy** - Follow DEPLOYMENT.md

---

## 🚀 Ready to Launch?

See **DEPLOYMENT.md** for step-by-step deployment instructions for:
- ✅ Vercel (easiest)
- ✅ Docker
- ✅ AWS
- ✅ Self-hosted VPS

---

**Congratulations! Your fundraising website is ready!** 🎉

Start it with: `npm run dev`
Visit: http://localhost:3000
