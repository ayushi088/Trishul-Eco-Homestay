import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export interface Homestay {
  id: string
  title: string
  image: string
  price: number
  rating: number
  reviews: number
  guests: number
  location: string
  availability: 'AVAILABLE' | 'LIMITED' | 'POPULAR' | 'BESTSELLER'
  bedrooms: number
  bathrooms: number
  type: string
  amenities: string[]
}

export interface Booking {
  id?: string
  guestName: string
  guestEmail: string
  guestPhone: string
  homestayId: string
  homestayName: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status?: string
  createdAt?: string
}

// 1. Homestays Endpoints
export async function getHomestays(location?: string): Promise<Homestay[]> {
  const url = location ? `/homestays?location=${encodeURIComponent(location)}` : '/homestays'
  const response = await api.get<Homestay[]>(url)
  return response.data
}

export async function searchHomestays(query: string): Promise<Homestay[]> {
  const response = await api.get<Homestay[]>(`/homestays/search?q=${encodeURIComponent(query)}`)
  return response.data
}

export async function getHomestayById(id: string): Promise<Homestay> {
  const response = await api.get<Homestay>(`/homestays/${id}`)
  return response.data
}

export async function createHomestay(data: Partial<Homestay>): Promise<any> {
  const response = await api.post('/homestays', data)
  return response.data
}

export async function updateHomestay(id: string, data: Partial<Homestay>): Promise<any> {
  const response = await api.put(`/homestays/${id}`, data)
  return response.data
}

export async function deleteHomestay(id: string): Promise<any> {
  const response = await api.delete(`/homestays/${id}`)
  return response.data
}

// 2. Bookings Endpoints
export async function getBookings(): Promise<Booking[]> {
  const response = await api.get<Booking[]>('/bookings')
  return response.data
}

export async function createBooking(data: Booking): Promise<any> {
  const response = await api.post('/bookings', data)
  return response.data
}
