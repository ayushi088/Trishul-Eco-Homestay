# Trishul Eco Homestays - Setup & Development Guide

## Project Overview

Trishul Eco Homestays is a modern, production-ready booking platform for Himalayan homestays. Built with Next.js, TypeScript, Tailwind CSS, and designed with a focus on user experience, performance, and scalability.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context + Custom Hooks
- **Data Fetching**: SWR / React Query
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend (Planned)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Better Auth
- **Payments**: Razorpay
- **File Upload**: Cloudinary
- **Email**: Nodemailer

## Project Structure

```
trishul/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Homepage
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── book/                 # Booking page
│   ├── homestays/            # Homestays listing
│   │   └── [id]/             # Homestay details
│   ├── experiences/          # Experiences page
│   ├── login/                # Login page
│   ├── register/             # Register page
│   ├── dashboard/            # User dashboard
│   └── globals.css           # Global styles
├── components/               # Reusable components
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx           # Footer
│   ├── hero-section.tsx     # Hero banner
│   ├── homestay-card.tsx    # Card component
│   ├── featured-homestays.tsx
│   ├── why-choose-trishul.tsx
│   └── testimonials.tsx
├── context/                 # React Context
│   └── booking-context.tsx  # Booking state management
├── lib/                     # Utilities & helpers
│   ├── utils.ts             # Helper functions
│   ├── hooks.ts             # Custom React hooks
│   ├── config.ts            # Configuration constants
│   └── mock-data.ts         # Mock data for development
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trishul-homestays
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Theme
NEXT_PUBLIC_THEME=light

# Stripe (when implementing payments)
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key

# Other services
NEXT_PUBLIC_APP_NAME=Trishul
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Key Features Implemented

### ✅ Frontend Features

1. **Navigation & Layout**
   - Sticky navbar with dark mode toggle
   - Responsive mobile menu
   - Footer with links and contact info

2. **Homepage**
   - Hero section with call-to-action
   - Featured homestays showcase
   - Why Choose Trishul section
   - Customer testimonials carousel
   - Footer with newsletter signup

3. **Homestays Listing**
   - Search functionality
   - Advanced filtering (price, guests, room type)
   - Sorting options
   - Pagination
   - Wishlist/favorites

4. **Homestay Details**
   - Image gallery
   - Description and amenities
   - Availability calendar
   - Reviews and ratings
   - Host information
   - Booking widget (sticky)

5. **Experiences Page**
   - Experience cards
   - Price and rating display
   - Booking CTAs

6. **Authentication Pages**
   - Login form
   - Register form
   - Form validation with Zod

7. **Customer Dashboard**
   - Booking history
   - Upcoming reservations
   - Cancel booking functionality
   - Profile management
   - Order tracking
   - Wishlist

8. **Additional Pages**
   - About page with mission/vision
   - Contact page with form and FAQ
   - Book page for direct booking

### 📋 Features Ready for Backend Integration

1. **Booking Management**
   - Booking creation and confirmation
   - Payment integration (Razorpay)
   - Email notifications

2. **User Management**
   - User authentication
   - Profile management
   - Wishlist management

3. **Admin Dashboard**
   - Homestay management
   - Booking management
   - User management
   - Payment tracking

## Styling & Design System

### Color Palette
- **Primary**: `#0B6B4A` (Forest Green)
- **Primary Dark**: `#064E3B`
- **Accent**: `#10B981` (Emerald)
- **Background**: `#F8FAF9`
- **Text**: `#111827`
- **Secondary Text**: `#4B5563`
- **Border**: `#E5E7EB`

### Typography
- **Heading Font**: Geist (default)
- **Body Font**: Geist Sans
- **Mono Font**: Geist Mono

### Component Radius
- **Buttons**: 14px
- **Cards**: 20px
- **Inputs**: 12px

## Performance Optimization

1. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting

2. **Image Optimization**
   - Next.js Image component usage
   - WebP format support
   - Lazy loading

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

4. **Caching**
   - Browser caching headers
   - SWR for data fetching

## Testing

```bash
# Run tests (when configured)
pnpm test

# Build check
pnpm build
```

## Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** with automatic CI/CD

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Useful Commands

```bash
# Development
pnpm dev                  # Start dev server
pnpm build               # Build for production
pnpm start               # Run production build
pnpm lint                # Run ESLint

# Maintenance
pnpm update              # Update dependencies
pnpm audit               # Check for vulnerabilities
```

## API Endpoints (Backend Implementation)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Homestays
- `GET /api/homestays` - List all homestays
- `GET /api/homestays/:id` - Get homestay details
- `POST /api/homestays` - Create homestay (admin)
- `PUT /api/homestays/:id` - Update homestay
- `DELETE /api/homestays/:id` - Delete homestay

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List user bookings
- `GET /api/bookings/:id` - Get booking details
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/homestay/:id` - Get homestay reviews

## Best Practices

1. **Code Organization**
   - Keep components small and reusable
   - Use custom hooks for logic
   - Separate concerns (UI vs logic)

2. **Performance**
   - Use React.memo for expensive components
   - Optimize re-renders
   - Code split where possible

3. **Security**
   - Never expose secrets in frontend code
   - Use environment variables
   - Validate user input
   - Implement rate limiting on backend

4. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels
   - Test with screen readers
   - Maintain color contrast

5. **Version Control**
   - Meaningful commit messages
   - Feature branches
   - Code reviews before merge

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   pnpm dev -p 3001
   ```

2. **Dependencies not installing**
   ```bash
   pnpm install --force
   ```

3. **Build errors**
   ```bash
   pnpm clean
   pnpm install
   pnpm build
   ```

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)

## License

This project is proprietary. All rights reserved.

## Contact

For questions or support, contact: hello@trishulechomestays.com
