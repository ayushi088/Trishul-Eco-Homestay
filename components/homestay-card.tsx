'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, MapPin, Heart } from 'lucide-react'

interface HomestayCardProps {
  id: string
  title: string
  image: string
  price: number
  rating: number
  reviews: number
  guests: number
  location: string
  availability: 'AVAILABLE' | 'LIMITED' | 'POPULAR' | 'BESTSELLER'
}

export default function HomestayCard({
  id,
  title,
  image,
  price,
  rating,
  reviews,
  guests,
  location,
  availability,
}: HomestayCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false)

  const badgeStyles = {
    AVAILABLE: 'bg-green-500',
    LIMITED: 'bg-yellow-500',
    POPULAR: 'bg-blue-500',
    BESTSELLER: 'bg-red-500',
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Link href={`/homestays/${id}`}>
        <div className="rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundImage: `url('${image}')`,
              }}
            />

            {/* Availability Badge */}
            <div className={`absolute top-4 left-4 ${badgeStyles[availability]} text-white px-3 py-1 rounded-full text-sm font-bold`}>
              {availability}
            </div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsFavorited(!isFavorited)
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Title */}
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Users className="w-4 h-4" />
              <span>{guests} guests max</span>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-2xl font-bold text-primary">₹{price}</span>
                <span className="text-sm text-muted-foreground ml-1">/night</span>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-200">
                  View Details
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
