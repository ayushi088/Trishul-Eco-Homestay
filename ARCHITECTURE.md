# Trishul Eco Homestays - Architecture & Implementation Guide

## Project Overview

This is a production-ready Airbnb-style booking platform for Himalayan homestays. The project is built with Next.js 16, React 19, TypeScript, and Tailwind CSS, following best practices for scalability, maintainability, and performance.

## Current Implementation Status

### Completed (MVP Frontend)
- ✅ Design system with Trishul color palette
- ✅ Responsive navbar with theme toggle
- ✅ Hero section with animations
- ✅ Featured homestays with cards
- ✅ Why choose Trishul section
- ✅ Guest testimonials carousel
- ✅ Footer with navigation
- ✅ Homestays listing page with filters, search, and sorting
- ✅ Homestay details page with gallery and booking widget
- ✅ Experiences page with activity cards
- ✅ Login/Register pages
- ✅ Booking form page
- ✅ User dashboard with booking management
- ✅ Comprehensive README with setup instructions

### In Progress / To Do
- Authentication system integration
- Admin dashboard
- Backend API development
- Payment processing
- Email notifications
- Database schema and migrations

## Technical Architecture

### Frontend Stack

```
Next.js 16 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS v4
├── Framer Motion (animations)
├── React Hook Form (form handling)
├── Zod (validation)
├── Lucide React (icons)
├── TanStack Query (state/caching)
└── Axios (HTTP client)
```

### Color System (Design Tokens)

```css
--primary: #0B6B4A        /* Forest Green - Main brand color */
--primary-dark: #064E3B   /* Dark Green - Hover states */
--accent: #10B981         /* Emerald - Highlights and CTAs */
--background: #F8FAF9     /* Light off-white - Main background */
--foreground: #111827     /* Dark gray - Text color */
--text-secondary: #4B5563 /* Muted gray - Secondary text */
--border: #E5E7EB         /* Light gray - Borders */
--card: #FFFFFF           /* White - Card backgrounds */
```

### Component Hierarchy

```
App/
├── Navbar (sticky, global)
│   ├── Logo
│   ├── Navigation links
│   ├── Theme toggle
│   └── Book Now CTA
├── Main Content
│   ├── [Page-specific components]
│   └── Hero/Featured/Details sections
└── Footer (global)
    ├── Company info
    ├── Quick links
    ├── Support
    └── Contact
```

### File Organization

```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles & theme
├── homestays/
│   ├── page.tsx              # Listing page
│   └── [id]/page.tsx         # Details page
├── experiences/page.tsx        # Experiences
├── login/page.tsx             # Login form
├── register/page.tsx          # Register form
├── book/page.tsx              # Booking form
└── dashboard/page.tsx         # User dashboard

components/
├── navbar.tsx                 # Main navigation
├── footer.tsx                 # Footer
├── hero-section.tsx           # Hero banner
├── featured-homestays.tsx     # Featured listings
├── homestay-card.tsx          # Reusable card
├── why-choose-trishul.tsx    # Features
├── testimonials.tsx           # Reviews carousel
└── ui/                        # shadcn components
```

## Key Features & Implementation Details

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Tested on devices: mobile, tablet, desktop, ultra-wide

### 2. Animation & UX
- Framer Motion for smooth transitions
- Entrance animations on scroll
- Hover effects on cards and buttons
- Smooth transitions on theme change
- Carousel animations for testimonials

### 3. Navigation Flow
```
Home → Browse Homestays → View Details → Book → Payment → Dashboard

Alternate paths:
- Login/Register
- Experiences
- Contact/Support
```

### 4. Data Flow Architecture

```
User Input
    ↓
React Hook Form (validation with Zod)
    ↓
TanStack Query (state management)
    ↓
Axios HTTP Client
    ↓
Backend API (planned)
    ↓
Database (PostgreSQL/Prisma)
```

### 5. State Management Strategy

```
Local Component State:
- Modal open/close states
- Form input values
- Carousel/tab positions
- Filter selections

Global State (TanStack Query - future):
- User authentication
- Homestay listings (cached)
- User bookings
- Cart/checkout data

localStorage (minimal use):
- Theme preference
- Recently viewed items
```

## Pages & Routes Documentation

### Public Pages (No Auth Required)

#### 1. `/` - Home Page
**Components:**
- Navbar + Hero Section
- Featured Homestays Grid
- Why Choose Trishul Section
- Testimonials Carousel
- Footer

**Features:**
- Animated hero with CTA buttons
- Search-to-browse conversion
- Social proof via testimonials
- Call-to-action throughout

#### 2. `/homestays` - Listing Page
**Components:**
- Navbar
- Filter Sidebar (sticky)
- Homestay Cards Grid
- Pagination (ready)
- Footer

**Features:**
- Text search (title, location)
- Price range filter
- Location filter
- Sort options (popular, rating, price)
- Filter reset

#### 3. `/homestays/[id]` - Details Page
**Components:**
- Image gallery with controls
- Details section
- Amenities grid
- House rules list
- Guest reviews
- Sticky booking widget
- Footer

**Features:**
- Image carousel with navigation
- Favorite button (wishlist)
- Share functionality
- Booking widget with date picker
- Guest reviews display

#### 4. `/experiences` - Activities Page
**Components:**
- Experience cards (6 total)
- Icon and description per experience
- CTA buttons

#### 5. `/login` - Login Page
**Features:**
- Email/password fields
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Sign up link

#### 6. `/register` - Registration Page
**Fields:**
- Full name
- Email
- Phone number
- Password
- Confirm password
- Terms acceptance

#### 7. `/book` - Booking Form
**Sections:**
- Personal information
- Dates (check-in/out)
- Preferences (guests, room type)
- Special requests
- Booking summary (sticky)

### Protected Pages (Auth Required - Placeholder)

#### 8. `/dashboard` - User Dashboard
**Tabs:**
- My Bookings (with status badges)
- Wishlist
- My Reviews
- Notifications
- Settings (profile, password)

## Backend Integration Plan

### API Structure

```
/api/auth/
  POST   /register
  POST   /login
  POST   /refresh
  POST   /logout

/api/homestays/
  GET    /           # List with pagination
  GET    /:id        # Details
  POST   /           # Admin: Create
  PUT    /:id        # Admin: Update
  DELETE /:id        # Admin: Delete

/api/bookings/
  POST   /           # Create booking
  GET    /           # User's bookings
  GET    /:id        # Booking details
  PATCH  /:id        # Update status

/api/reviews/
  POST   /           # Create review
  GET    /:homestayId # Get reviews
  DELETE /:id        # Delete review

/api/payments/
  POST   /create-order
  POST   /verify
```

### Database Schema (Future - Prisma)

```prisma
model User {
  id           String @id @default(cuid())
  name         String
  email        String @unique
  phone        String?
  password     String (hashed)
  role         Role @default(GUEST)
  avatar       String?
  wishlist     Homestay[]
  bookings     Booking[]
  reviews      Review[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Homestay {
  id           String @id @default(cuid())
  title        String
  description  String @db.Text
  location     String
  price        Int
  rating       Float @default(0)
  guests       Int
  bedrooms     Int
  bathrooms    Int
  images       String[]
  amenities    String[]
  rules        String[]
  host         User @relation(fields: [hostId])
  hostId       String
  bookings     Booking[]
  reviews      Review[]
  wishlistedBy User[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Booking {
  id           String @id @default(cuid())
  user         User @relation(fields: [userId])
  userId       String
  homestay     Homestay @relation(fields: [homestayId])
  homestayId   String
  checkIn      DateTime
  checkOut     DateTime
  guests       Int
  totalPrice   Int
  status       BookingStatus @default(PENDING)
  payment      Payment?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Review {
  id           String @id @default(cuid())
  user         User @relation(fields: [userId])
  userId       String
  homestay     Homestay @relation(fields: [homestayId])
  homestayId   String
  rating       Int (1-5)
  text         String @db.Text
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Payment {
  id           String @id @default(cuid())
  booking      Booking @relation(fields: [bookingId])
  bookingId    String @unique
  amount       Int
  method       PaymentMethod
  status       PaymentStatus
  transactionId String?
  createdAt    DateTime @default(now())
}

enum Role {
  GUEST
  HOST
  ADMIN
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
}

enum PaymentMethod {
  RAZORPAY
  COD
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
}
```

## Performance Optimization

### Current Optimizations
- Image lazy loading via browser defaults
- CSS is minified by Tailwind v4
- Next.js automatic code splitting
- Static generation for home/experience pages
- Dynamic imports for heavy components
- Font optimization via next/font

### Planned Optimizations
- ISR (Incremental Static Regeneration) for homestays
- Image optimization via next/image
- Database query caching with Redis
- CDN configuration
- Gzip compression
- HTTP/2 Server Push
- Service Worker for offline capability

## Security Implementation

### Frontend Security
- Input validation with Zod
- XSS prevention via React auto-escaping
- CSRF tokens in forms
- Secure cookie handling
- CSP headers configuration

### Backend Security (Planned)
- JWT with secure signing
- Refresh token rotation
- Rate limiting on auth endpoints
- Password hashing with bcrypt
- SQL injection prevention via Prisma
- CORS configuration
- Helmet for security headers
- Input sanitization

## Deployment Strategy

### Development
```bash
pnpm dev          # Local development
```

### Staging
- Vercel Preview Deployment
- Automatic on pull requests
- Environment: staging.trishul.com

### Production
- Vercel Production Deployment
- Main branch automatic deployment
- Environment: trishul.com
- CDN: Vercel Edge Network

## Monitoring & Analytics

- Vercel Analytics
- Web Vitals monitoring
- Error tracking (Sentry planned)
- User analytics (Google Analytics/Mixpanel)
- Booking funnel tracking
- Conversion rate monitoring

## Testing Strategy

### Unit Tests (Planned)
- Component tests with Jest
- Utility function tests
- Form validation tests

### Integration Tests (Planned)
- API integration tests
- Payment processing tests
- Booking workflow tests

### E2E Tests (Planned)
- Booking complete flow
- User authentication flow
- Admin operations

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Focus management
- Alt text for all images

## Future Enhancements

1. **Real-time Updates**
   - WebSocket for live availability
   - Push notifications
   - Real-time chat with hosts

2. **Search Enhancement**
   - Elasticsearch for full-text search
   - Advanced filtering
   - Search suggestions

3. **Machine Learning**
   - Recommendation engine
   - Dynamic pricing
   - Demand forecasting

4. **Additional Features**
   - Video tours (360°)
   - Virtual tours
   - Trip planning tools
   - Blog/content management
   - Social sharing
   - Referral program

5. **Mobile Apps**
   - React Native mobile app
   - Push notifications
   - Offline booking
   - One-tap login

## Development Workflow

```bash
# 1. Start dev server
pnpm dev

# 2. Make changes in components/pages
vim app/homestays/page.tsx

# 3. Changes hot-reload
# (Check http://localhost:3000 in browser)

# 4. Build for production
pnpm build

# 5. Test production build
pnpm start

# 6. Deploy to Vercel
vercel
```

## Common Tasks

### Adding a New Page
1. Create folder in `app/`
2. Create `page.tsx` in the folder
3. Add route to navbar if needed
4. Create components in `components/`

### Creating a Component
1. Create file in `components/`
2. Export as default
3. Use TypeScript interfaces for props
4. Test for responsiveness

### Adding New Colors
1. Update CSS variables in `app/globals.css`
2. Update color palette documentation
3. Ensure contrast ratios meet WCAG

### Deploying Updates
1. Commit and push to main branch
2. Vercel automatically deploys
3. Preview available on Vercel dashboard
4. Monitor Web Vitals post-deployment

## Support & Resources

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Slack Channel**: #trishul-dev (internal)
- **Design System**: Figma link (private)
- **API Documentation**: (Backend will provide)

---

**Last Updated**: June 15, 2026
**Version**: 1.0.0-MVP
**Maintained By**: Development Team
