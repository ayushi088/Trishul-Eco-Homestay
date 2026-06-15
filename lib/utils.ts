import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Trishul-specific utilities
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export const calculateDays = (checkIn: Date, checkOut: Date): number => {
  const time = checkOut.getTime() - checkIn.getTime()
  return Math.ceil(time / (1000 * 3600 * 24))
}

export const calculateTotalPrice = (
  pricePerNight: number,
  days: number,
  taxRate: number = 0.12
): { subtotal: number; tax: number; total: number } => {
  const subtotal = pricePerNight * days
  const tax = subtotal * taxRate
  const total = subtotal + tax
  return { subtotal, tax, total }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone.replace(/[^\d]/g, ''))
}

export const generateBookingId = (): string => {
  return `TRI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export const getStayDuration = (checkIn: Date, checkOut: Date): string => {
  const days = calculateDays(checkIn, checkOut)
  if (days === 1) return '1 night'
  return `${days} nights`
}

export const getAvailabilityStatus = (available: number): 'AVAILABLE' | 'LIMITED' | 'POPULAR' | 'BESTSELLER' => {
  if (available > 20) return 'AVAILABLE'
  if (available > 10) return 'LIMITED'
  if (available > 5) return 'POPULAR'
  return 'BESTSELLER'
}
