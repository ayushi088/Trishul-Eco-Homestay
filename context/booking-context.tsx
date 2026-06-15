'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface BookingState {
  homestayId?: number
  checkIn?: Date
  checkOut?: Date
  guests?: number
  roomPreference?: string
  specialRequests?: string
  guestName?: string
  guestEmail?: string
  guestPhone?: string
}

interface BookingContextType {
  booking: BookingState
  updateBooking: (data: Partial<BookingState>) => void
  resetBooking: () => void
  completeBooking: () => BookingState | null
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<BookingState>({})

  const updateBooking = (data: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...data }))
  }

  const resetBooking = () => {
    setBooking({})
  }

  const completeBooking = (): BookingState | null => {
    if (
      booking.homestayId &&
      booking.checkIn &&
      booking.checkOut &&
      booking.guests &&
      booking.guestName &&
      booking.guestEmail &&
      booking.guestPhone
    ) {
      return booking
    }
    return null
  }

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        resetBooking,
        completeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return context
}
