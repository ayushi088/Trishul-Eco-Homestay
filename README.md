# Trishul Eco Homestays - Complete Booking Platform

A production-ready Airbnb-style booking platform for Himalayan homestays built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### For Guests
- Browse and search homestays with advanced filtering
- View detailed homestay information with image galleries
- Secure booking system with multiple payment options
- Customer dashboard to manage bookings
- Guest reviews and ratings
- Wishlist functionality
- Responsive design for all devices

### For Hosts/Admin
- Admin dashboard to manage homestays
- Booking management and status tracking
- Guest and review management
- Revenue analytics
- Email notifications
- Content management

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **State Management**: TanStack React Query
- **Data Fetching**: SWR-ready patterns
- **Icons**: Lucide React

### Backend (Future)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Refresh Tokens
- **Password Hashing**: Bcrypt
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **Payments**: Razorpay + Cash On Delivery

### Design System
- **Primary Color**: #0B6B4A (Forest Green)
- **Dark Primary**: #064E3B
- **Accent**: #10B981 (Emerald)
- **Background**: #F8FAF9
- **Text**: #111827
- **Card Radius**: 20px (rounded-2xl)
- **Button Radius**: 14px (rounded-lg)

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & theme
│   ├── homestays/
│   │   ├── page.tsx            # Homestays listing
│   │   └── [id]/
│   │       └── page.tsx        # Homestay details
│   ├── experiences/
│   │   └── page.tsx            # Experiences page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   └── book/
│       └── page.tsx            # Booking form
├── components/                   # React components
│   ├── navbar.tsx              # Navigation bar
│   ├── footer.tsx              # Footer
│   ├── hero-section.tsx        # Hero banner
│   ├── featured-homestays.tsx  # Featured listings
│   ├── homestay-card.tsx       # Reusable card component
│   ├── why-choose-trishul.tsx  # Features section
│   ├── testimonials.tsx        # Guest testimonials
│   └── ui/                     # shadcn components
├── lib/
│   └── utils.ts                # Utility functions
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.mjs              # Next.js config
├── postcss.config.mjs           # PostCSS config
└── tailwind.config.mjs          # Tailwind config
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Running the Full Stack Application

#### 1. Start the Backend API Server
Navigate to the `backend` folder, install packages, and boot the server on port `5000`:
```bash
cd backend
npm install
npm run dev
```

#### 2. Start the Frontend Client
In the project root directory, install and boot the Next.js development server on port `3000`:
```bash
# If using pnpm
pnpm install
pnpm dev

# Or if using npm
npm install
npm run dev
```

The frontend client will automatically connect to the backend server at `http://localhost:5000`. You can visit the site at `http://localhost:3000`.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/trishul

# Authentication
JWT_SECRET=your-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payments
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Pages & Routes

### Public Pages
- `/` - Home page with hero, featured stays, testimonials
- `/homestays` - Browse all homestays with filters
- `/homestays/[id]` - Detailed homestay view
- `/experiences` - Available experiences and activities
- `/login` - Guest login
- `/register` - Guest registration
- `/book` - Booking form

### Protected Pages (Future)
- `/dashboard` - User dashboard
- `/dashboard/bookings` - My bookings
- `/dashboard/profile` - Profile management
- `/admin` - Admin dashboard
- `/admin/homestays` - Manage homestays
- `/admin/bookings` - Booking management

## Features Implementation

### 1. Home Page
- ✅ Hero section with call-to-action
- ✅ Featured homestays carousel
- ✅ Why choose Trishul section
- ✅ Guest testimonials with carousel
- ✅ Responsive design

### 2. Homestays Listing
- ✅ Grid layout with cards
- ✅ Price filter
- ✅ Location filter
- ✅ Sorting options
- ✅ Search functionality
- ✅ Pagination ready

### 3. Homestay Details
- ✅ Image gallery with navigation
- ✅ Amenities display
- ✅ House rules section
- ✅ Guest reviews
- ✅ Booking widget
- ✅ Favorite/wishlist button

### 4. Booking System
- ⏳ Multi-step form
- ⏳ Date picker
- ⏳ Guest selection
- ⏳ Special requests
- ⏳ Payment processing

### 5. Authentication (Future)
- ⏳ Email/password login
- ⏳ User registration
- ⏳ JWT tokens
- ⏳ Password reset
- ⏳ Social login (optional)

## API Endpoints (Future Backend)

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - User login
POST   /api/auth/refresh       - Refresh token
POST   /api/auth/logout        - User logout
```

### Homestays
```
GET    /api/homestays          - List all homestays
GET    /api/homestays/:id      - Get homestay details
POST   /api/homestays          - Create homestay (admin)
PUT    /api/homestays/:id      - Update homestay (admin)
DELETE /api/homestays/:id      - Delete homestay (admin)
```

### Bookings
```
POST   /api/bookings           - Create booking
GET    /api/bookings           - Get user bookings
PATCH  /api/bookings/:id       - Update booking status
```

### Payments
```
POST   /api/payments/create-order  - Create payment order
POST   /api/payments/verify        - Verify payment
```

### Reviews
```
POST   /api/reviews            - Create review
GET    /api/reviews/:homestayId - Get homestay reviews
```

## Performance Optimization

- ✅ Image lazy loading
- ✅ Code splitting with Next.js
- ✅ CSS optimization with Tailwind
- ✅ Font optimization
- ✅ Dynamic imports for heavy components
- ✅ SWR for client-side caching
- ⏳ CDN optimization
- ⏳ Database query optimization

## Security Features

- ⏳ JWT authentication
- ⏳ CSRF protection
- ⏳ XSS prevention
- ⏳ SQL injection prevention
- ⏳ Rate limiting
- ⏳ CORS configuration
- ⏳ Helmet security headers
- ⏳ Input validation

## Deployment

### Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Railway/Render (Backend)
- Push to GitHub
- Connect repository
- Configure environment variables
- Deploy

## File Uploads (Cloudinary)

Cloudinary is configured for:
- Homestay images
- Guest avatars
- Experience images
- Gallery uploads

## Email Templates (Nodemailer)

Notification emails for:
- Welcome email
- Booking confirmation
- Payment confirmation
- Booking approved/rejected
- Reminders

## Testing

```bash
# Run tests (if configured)
pnpm test

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, email support@trishul.com or open an issue.

## Roadmap

### Phase 1 (Current)
- ✅ Frontend UI/UX
- ✅ Core pages
- ⏳ Admin dashboard

### Phase 2
- Backend API development
- Payment integration
- Authentication system
- Email notifications

### Phase 3
- Admin features
- Analytics dashboard
- Advanced filtering
- Recommendation engine

### Phase 4
- Mobile app
- Video tours
- Virtual tours
- AI chatbot

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Email service configured
- [ ] Payment gateway tested
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Load testing completed
- [ ] Backup strategy implemented

## Performance Targets

- Lighthouse Score: 90+
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- FCP (First Contentful Paint): < 1.8s

## Architecture Notes

This is a **frontend-first** implementation built with Next.js App Router. The backend API would follow RESTful principles with proper authentication, validation, and error handling. The database schema follows normalization principles with relationships between users, homestays, bookings, and reviews.

## Future Enhancements

1. **Search with Elasticsearch** - Advanced search capabilities
2. **Real-time Chat** - WebSocket-based messaging
3. **Video Tours** - 360-degree homestay tours
4. **Maps Integration** - Interactive location maps
5. **Recommendation Engine** - ML-based suggestions
6. **Analytics Dashboard** - Revenue and booking analytics
7. **Mobile App** - React Native/Flutter app
8. **AI Chatbot** - Support automation

---

Built with ❤️ for Himalayan experiences | Made with v0.app
