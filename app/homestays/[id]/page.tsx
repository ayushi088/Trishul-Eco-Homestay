'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import {
  Star,
  MapPin,
  Users,
  Wifi,
  Wind,
  Utensils,
  Tv,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const HOMESTAY_DETAILS = {
  id: '1',
  title: 'Mountain View Villa',
  location: 'Chopta',
  price: 2500,
  rating: 4.8,
  reviews: 156,
  guests: 6,
  bedrooms: 3,
  bathrooms: 2,
  description:
    'Experience the breathtaking beauty of the Himalayas in our cozy mountain villa. Located in the heart of Chopta, this homestay offers stunning views, warm hospitality, and authentic Himalayan cuisine.',
  images: [
    'https://images.unsplash.com/photo-1584488289688-210e890b900d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424e492?w=800&h=600&fit=crop',
  ],
  amenities: [
    { icon: Wifi, name: 'WiFi' },
    { icon: Wind, name: 'Air Conditioning' },
    { icon: Utensils, name: 'Kitchen' },
    { icon: Tv, name: 'TV' },
  ],
  rules: [
    'Check-in: 2:00 PM',
    'Check-out: 11:00 AM',
    'No smoking inside',
    'Pets allowed',
    'House parties allowed',
  ],
  reviews_list: [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      text: 'Amazing place! The host was very welcoming and the views were spectacular.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      rating: 4,
      text: 'Beautiful location, great food. Would definitely come back!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
  ],
}

export default function HomestayDetailsPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % HOMESTAY_DETAILS.images.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + HOMESTAY_DETAILS.images.length) %
        HOMESTAY_DETAILS.images.length
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Image Gallery */}
      <div className="relative h-96 bg-muted overflow-hidden">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${HOMESTAY_DETAILS.images[currentImageIndex]}')`,
          }}
        />

        {/* Gallery Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HOMESTAY_DETAILS.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <button
            className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {HOMESTAY_DETAILS.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">
                        {HOMESTAY_DETAILS.rating}
                      </span>
                      <span className="text-muted-foreground">
                        ({HOMESTAY_DETAILS.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      {HOMESTAY_DETAILS.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div>
                  <p className="text-muted-foreground text-sm">Guests</p>
                  <p className="text-2xl font-bold text-foreground">
                    {HOMESTAY_DETAILS.guests}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Bedrooms</p>
                  <p className="text-2xl font-bold text-foreground">
                    {HOMESTAY_DETAILS.bedrooms}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Bathrooms</p>
                  <p className="text-2xl font-bold text-foreground">
                    {HOMESTAY_DETAILS.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Place
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {HOMESTAY_DETAILS.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {HOMESTAY_DETAILS.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
                    >
                      <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-semibold text-foreground">
                        {amenity.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                House Rules
              </h2>
              <ul className="space-y-2">
                {HOMESTAY_DETAILS.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Guest Reviews
              </h2>
              <div className="space-y-6">
                {HOMESTAY_DETAILS.reviews_list.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border">
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.name}
                        </p>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border shadow-lg p-6 sticky top-24 space-y-6">
              {/* Price */}
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Price per night
                </p>
                <p className="text-4xl font-bold text-primary mb-1">
                  ₹{HOMESTAY_DETAILS.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Plus taxes and fees
                </p>
              </div>

              {/* Date Picker Placeholder */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Guests
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} guest{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTA Button */}
              <a
                href="/book"
                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all duration-200 text-center block"
              >
                Book Now
              </a>

              {/* Info */}
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Free cancellation</span> for 30
                  days from booking date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
