'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '@/context/booking-context'
import {
  Star, MapPin, Users, Wifi, Wind, Utensils, Tv, Heart, Share2,
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info,
  Compass, Eye, ArrowRight, ShieldCheck, Check, MessageSquare
} from 'lucide-react'

const HOMESTAY_DETAILS = {
  id: '1',
  title: 'Mountain View Villa',
  location: 'Chopta, Uttarakhand',
  price: 2500,
  rating: 4.8,
  reviews: 156,
  guests: 6,
  bedrooms: 3,
  bathrooms: 2,
  description:
    'Experience the breathtaking beauty of the Himalayas in our cozy mountain villa. Located in the heart of Chopta, this homestay offers stunning views, warm hospitality, and authentic Himalayan cuisine.',
  images: [
    'https://images.unsplash.com/photo-1584488289688-210e890b900d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424e492?w=1200&h=800&fit=crop',
  ],
  amenities: [
    { icon: Wifi, name: 'High-speed WiFi' },
    { icon: Wind, name: 'Room Heaters' },
    { icon: Utensils, name: 'Local Organic Kitchen' },
    { icon: Tv, name: 'Smart TV' },
  ],
  rules: [
    'Check-in: 12:00 PM',
    'Check-out: 11:00 AM',
    'No loud parties after 10 PM',
    'Pets allowed upon prior notice',
    'Smoking permitted in outdoor garden only',
  ],
  host: {
    name: 'Rajesh Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
    verified: true,
    joined: 'Joined in 2021',
    rate: '100% Response Rate',
    time: 'Response Time: < 1 hour',
    desc: 'Local mountaineer and nature lover. I love sharing traditional Garhwali meals and stories of our mountains with guests.'
  },
  attractions: [
    { name: 'Tungnath Temple Trek', distance: '4.5 km away' },
    { name: 'Deoriatal Lake Hike', distance: '12 km away' },
    { name: 'Kanchula Kharak Sanctuary', distance: '6 km away' },
  ],
  reviews_list: [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Amazing place! The host Rajesh was very welcoming and the views of Chaukhamba peaks from the room window were spectacular. Daily Mandua roti and local ghee dinner was the highlight!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      date: 'June 2026',
      helpful: 24,
    },
    {
      id: 2,
      name: 'Rahul Patel',
      rating: 4.8,
      text: 'Beautiful location, great hosts, and extremely cozy room heaters. The WiFi was surprisingly fast and reliable for working remotely in the mountains.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: 'May 2026',
      helpful: 18,
    },
  ],
}

export default function HomestayDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { booking, updateBooking } = useBooking()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [view360, setView360] = useState(false)
  const [panPosition, setPanPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  // Booking details hooks
  const [checkIn, setCheckIn] = useState(booking.checkIn ? new Date(booking.checkIn).toISOString().split('T')[0] : '')
  const [checkOut, setCheckOut] = useState(booking.checkOut ? new Date(booking.checkOut).toISOString().split('T')[0] : '')
  const [guests, setGuests] = useState(booking.guests ? booking.guests.toString() : '2')

  // Calculate pricing breakdown
  const nightlyPrice = HOMESTAY_DETAILS.price
  let nightsCount = 0
  if (checkIn && checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = end.getTime() - start.getTime()
    nightsCount = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const subtotal = nightlyPrice * (nightsCount || 1)
  const serviceFee = Math.round(subtotal * 0.08)
  const tax = Math.round(subtotal * 0.12)
  const total = subtotal + serviceFee + tax

  // Handle image index
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HOMESTAY_DETAILS.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HOMESTAY_DETAILS.images.length) % HOMESTAY_DETAILS.images.length)
  }

  // 360-degree view dragging simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diffX = e.clientX - startX
    setPanPosition((prev) => (prev - diffX * 0.4) % 100)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleBookRedirect = () => {
    updateBooking({
      homestayId: parseInt(HOMESTAY_DETAILS.id),
      checkIn: checkIn ? new Date(checkIn) : undefined,
      checkOut: checkOut ? new Date(checkOut) : undefined,
      guests: parseInt(guests),
    })
    router.push('/book')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Title and Top Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 text-left">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-2">
              {HOMESTAY_DETAILS.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-foreground">{HOMESTAY_DETAILS.rating}</span>
                <span>({HOMESTAY_DETAILS.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{HOMESTAY_DETAILS.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-3 bg-card border border-border rounded-xl hover:bg-muted text-foreground transition-all"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="p-3 bg-card border border-border rounded-xl hover:bg-muted text-foreground transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Block (Image Gallery + 360 viewer option) */}
        <div className="relative rounded-[28px] overflow-hidden bg-muted h-[400px] sm:h-[480px] shadow-lg mb-12">
          
          <AnimatePresence mode="wait">
            {!view360 ? (
              <motion.div
                key="slideshow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative cursor-zoom-in"
                onClick={() => setIsFullscreenOpen(true)}
              >
                <img
                  src={HOMESTAY_DETAILS.images[currentImageIndex]}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-background rounded-full transition-all border border-border shadow-md z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-background/80 hover:bg-background rounded-full transition-all border border-border shadow-md z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-6 right-6 bg-background/80 backdrop-blur border border-border px-3 py-1.5 rounded-xl text-xs font-bold">
                  {currentImageIndex + 1} / {HOMESTAY_DETAILS.images.length}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="360view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full relative overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                {/* Simulated Panorama using a wide landscape background */}
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=800')`,
                    backgroundPosition: `${panPosition}% center`,
                    width: '200%',
                  }}
                />
                <div className="relative z-10 bg-slate-900/60 text-white px-5 py-3 rounded-2xl border border-white/10 text-center pointer-events-none backdrop-blur-sm">
                  <Compass className="w-6 h-6 mx-auto mb-2 text-primary animate-spin-slow" />
                  <p className="text-sm font-bold">Simulated 360° Panorama View</p>
                  <p className="text-[10px] text-slate-300 font-semibold mt-1">Drag horizontally to pan camera</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle buttons */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-10">
            <button
              onClick={() => setView360(false)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                !view360
                  ? 'bg-primary border-primary text-white'
                  : 'bg-background/80 hover:bg-background border-border text-foreground'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setView360(true)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
                view360
                  ? 'bg-primary border-primary text-white'
                  : 'bg-background/80 hover:bg-background border-border text-foreground'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>360° View</span>
            </button>
          </div>

        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Column Width 8 */}
          <div className="lg:col-span-8 space-y-10 text-left">
            
            {/* Short Specs */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-card border border-border rounded-2xl text-center">
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase">Guests</p>
                <p className="text-xl font-extrabold text-foreground">{HOMESTAY_DETAILS.guests} max</p>
              </div>
              <div className="border-x border-border">
                <p className="text-xs text-muted-foreground font-bold uppercase">Bedrooms</p>
                <p className="text-xl font-extrabold text-foreground">{HOMESTAY_DETAILS.bedrooms} Rooms</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase">Bathrooms</p>
                <p className="text-xl font-extrabold text-foreground">{HOMESTAY_DETAILS.bathrooms} Baths</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4">About the Stay</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold">
                {HOMESTAY_DETAILS.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {HOMESTAY_DETAILS.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon
                  return (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-muted/30 border border-border/60 rounded-xl">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-bold text-foreground text-sm">{amenity.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Availability Calendar Selector */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-extrabold text-foreground mb-3 flex items-center gap-2">
                <CalendarIcon className="w-5.5 h-5.5 text-primary" />
                Select Availability Calendar
              </h2>
              <p className="text-xs text-muted-foreground font-bold uppercase mb-4">Click check-in / check-out days below</p>
              
              {/* Interactive Calendar layout */}
              <div className="border border-border rounded-2xl p-4 bg-card max-w-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-sm text-foreground">July 2026</span>
                  <div className="flex gap-1.5">
                    <button className="p-1 border border-border rounded-lg hover:bg-muted"><ChevronLeft className="w-3.5 h-3.5" /></button>
                    <button className="p-1 border border-border rounded-lg hover:bg-muted"><ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty cells for padding */}
                  {[...Array(3)].map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {/* Calendar Days */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1
                    const isBooked = [5, 6, 7, 12, 13, 20, 21].includes(day)
                    const dayStr = `2026-07-${day < 10 ? '0' + day : day}`
                    const isSelected = checkIn === dayStr || checkOut === dayStr
                    
                    return (
                      <button
                        key={day}
                        disabled={isBooked}
                        onClick={() => {
                          if (!checkIn || (checkIn && checkOut)) {
                            setCheckIn(dayStr)
                            setCheckOut('')
                          } else if (checkIn && !checkOut) {
                            if (new Date(dayStr) > new Date(checkIn)) {
                              setCheckOut(dayStr)
                            } else {
                              setCheckIn(dayStr)
                            }
                          }
                        }}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          isBooked
                            ? 'text-muted-foreground/30 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary text-white font-extrabold shadow-sm'
                            : 'hover:bg-primary/10 text-foreground'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Attractions and map */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Nearby Attractions & Experience</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  {HOMESTAY_DETAILS.attractions.map((att, index) => (
                    <div key={index} className="flex items-center justify-between p-3.5 border border-border bg-card rounded-xl">
                      <span className="font-bold text-sm text-foreground">{att.name}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-full">{att.distance}</span>
                    </div>
                  ))}
                </div>
                {/* Simulated map frame */}
                <div className="h-44 bg-muted border border-border rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop')` }} />
                  <div className="relative z-10 bg-background/95 border border-border p-3.5 rounded-xl shadow-md text-left max-w-xs">
                    <p className="font-extrabold text-xs text-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> Chopta Road, Uttarakhand</p>
                    <span className="text-[9px] text-muted-foreground block mt-1 font-bold">Directions linked via GPS offline tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Section */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Your Host</h2>
              <div className="flex flex-col sm:flex-row gap-6 p-6 border border-border rounded-[24px] bg-card">
                <div className="flex-shrink-0 text-center sm:text-left">
                  <img src={HOMESTAY_DETAILS.host.avatar} className="w-16 h-16 rounded-2xl object-cover border border-border mx-auto sm:mx-0" alt="" />
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start mt-2 text-xs font-bold text-primary">
                    <ShieldCheck className="w-4 h-4 fill-primary/10" />
                    <span>KYC Verified</span>
                  </div>
                </div>

                <div className="flex-grow space-y-2 text-center sm:text-left">
                  <h4 className="font-black text-lg text-foreground">{HOMESTAY_DETAILS.host.name}</h4>
                  <p className="text-[10px] text-muted-foreground font-extrabold uppercase">{HOMESTAY_DETAILS.host.joined} · {HOMESTAY_DETAILS.host.rate}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{HOMESTAY_DETAILS.host.desc}</p>
                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Link
                      href="/messages"
                      className="px-3.5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Host</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Reviews & Trust</h2>
              <div className="space-y-6">
                {HOMESTAY_DETAILS.reviews_list.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} className="w-10 h-10 rounded-xl object-cover border border-border" alt="" />
                        <div className="text-left">
                          <p className="font-bold text-sm text-foreground">{review.name}</p>
                          <span className="text-[10px] text-muted-foreground font-semibold">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium mb-3 text-left">
                      {review.text}
                    </p>
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar. Column Width 4 */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-card border border-border shadow-xl rounded-[24px] p-6 space-y-6 text-left">
              <div>
                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mb-1">Per Night Cost</p>
                <p className="text-4xl font-black text-primary">₹{HOMESTAY_DETAILS.price}</p>
              </div>

              {/* Input checkins */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Check In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Check Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Guests count</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground font-semibold focus:outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                  </select>
                </div>
              </div>

              {/* Price Breakdown details */}
              <div className="space-y-2.5 pt-4 border-t border-border text-xs font-semibold text-muted-foreground">
                <div className="flex justify-between">
                  <span>₹{nightlyPrice} x {nightsCount || 1} nights</span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>SaaS Booking fee (8%)</span>
                  <span className="text-foreground">₹{serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Taxes (12%)</span>
                  <span className="text-foreground">₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-foreground pt-2.5 border-t border-border/60">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Book button redirect */}
              <button
                onClick={handleBookRedirect}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm uppercase tracking-wide mt-2"
              >
                <span>Reserve Room Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3.5 bg-primary/5 border border-primary/15 rounded-xl text-[10px] text-muted-foreground font-semibold leading-relaxed">
                <span>Free cancellation up to 7 days before checkin date. Supporting the local Garhwali community.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full Screen Image Lightbox Modal */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreenOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden z-10 flex flex-col items-center"
            >
              <button
                onClick={() => setIsFullscreenOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-xl transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={HOMESTAY_DETAILS.images[currentImageIndex]}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                alt=""
              />

              {/* Image selectors indicators */}
              <div className="flex gap-2 mt-6">
                {HOMESTAY_DETAILS.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-primary w-8' : 'bg-white/40 w-2.5'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
