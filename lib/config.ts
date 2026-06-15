// Configuration for Trishul platform

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const API_ROUTES = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Homestays
  HOMESTAYS: {
    LIST: '/homestays',
    GET: (id: number) => `/homestays/${id}`,
    CREATE: '/homestays',
    UPDATE: (id: number) => `/homestays/${id}`,
    DELETE: (id: number) => `/homestays/${id}`,
    SEARCH: '/homestays/search',
  },
  
  // Bookings
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    GET: (id: string) => `/bookings/${id}`,
    UPDATE: (id: string) => `/bookings/${id}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
  
  // Payments
  PAYMENTS: {
    CREATE_ORDER: '/payments/create-order',
    VERIFY: '/payments/verify',
    WEBHOOK: '/payments/webhook',
  },
  
  // Reviews
  REVIEWS: {
    CREATE: '/reviews',
    LIST: (homestayId: number) => `/reviews/homestay/${homestayId}`,
    GET: (id: number) => `/reviews/${id}`,
    UPDATE: (id: number) => `/reviews/${id}`,
    DELETE: (id: number) => `/reviews/${id}`,
  },
  
  // Users
  USERS: {
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    WISHLIST: '/users/wishlist',
    PROFILE: '/users/profile',
  },
  
  // Experiences
  EXPERIENCES: {
    LIST: '/experiences',
    GET: (id: number) => `/experiences/${id}`,
  },
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
}

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  CHECKED_IN: 'CHECKED_IN',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
}

export const PAYMENT_METHODS = {
  RAZORPAY: 'RAZORPAY',
  COD: 'COD',
}

export const ROOM_TYPES = [
  'Bedroom',
  'Deluxe Room',
  'Suite',
  'Dormitory',
]

export const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Heating',
  'AC',
  'Parking',
  'Garden',
  'Terrace',
  'Gym',
  'Library',
  'Fireplace',
  'Hot Tub',
  'Games Room',
  'Mountain View',
  'River View',
]

export const PRICE_RANGES = [
  { label: 'Budget', min: 0, max: 1500 },
  { label: 'Mid-range', min: 1500, max: 3000 },
  { label: 'Premium', min: 3000, max: 5000 },
  { label: 'Luxury', min: 5000, max: Infinity },
]

export const TAX_RATE = 0.12 // 12% GST

export const PLATFORM_FEE_RATE = 0.05 // 5% platform fee

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_DATES: 'Check-out date must be after check-in date',
  REQUIRED_FIELD: 'This field is required',
  LOGIN_FAILED: 'Invalid email or password',
  BOOKING_FAILED: 'Failed to create booking. Please try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Booking confirmed! Check your email for details.',
  PAYMENT_SUCCESS: 'Payment successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  REVIEW_POSTED: 'Thank you for your review!',
}
