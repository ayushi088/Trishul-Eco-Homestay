'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Users, MapPin, Heart, Plus, Scale } from 'lucide-react'

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
  layout?: 'grid' | 'list'
  isCompared?: boolean
  onCompareToggle?: (e: React.MouseEvent) => void
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
  layout = 'grid',
  isCompared = false,
  onCompareToggle,
}: HomestayCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false)

  const badgeStyles = {
    AVAILABLE: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25',
    LIMITED: 'bg-amber-500/10 text-amber-600 border border-amber-500/25',
    POPULAR: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/25',
    BESTSELLER: 'bg-rose-500/10 text-rose-600 border border-rose-500/25',
  }

  const isList = layout === 'list'

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-card border border-border rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative text-left"
    >
      <div className={`flex flex-col ${isList ? 'sm:flex-row h-full' : 'h-full'}`}>
        
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-muted ${isList ? 'w-full sm:w-2/5 min-h-[220px] sm:min-h-full' : 'h-52 sm:h-56'}`}>
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />

          {/* Availability Badge */}
          <div className={`absolute top-4 left-4 ${badgeStyles[availability]} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md`}>
            {availability}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorited(!isFavorited)
            }}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-background/80 hover:bg-background border border-border/50 text-foreground transition-all active:scale-90 shadow-sm"
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground'
              }`}
            />
          </button>

          {/* Compare Selector Checkbox */}
          {onCompareToggle && (
            <button
              onClick={onCompareToggle}
              className={`absolute bottom-4 left-4 px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
                isCompared
                  ? 'bg-primary border-primary text-white font-extrabold'
                  : 'bg-background/80 hover:bg-background border-border/50 text-foreground'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 flex flex-col justify-between ${isList ? 'w-full sm:w-3/5' : 'flex-grow'}`}>
          <div>
            
            {/* Title */}
            <Link href={`/homestays/${id}`}>
              <h3 className="font-extrabold text-lg text-foreground hover:text-primary transition-colors line-clamp-1 mb-2 leading-snug">
                {title}
              </h3>
            </Link>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{location}</span>
            </div>

            {/* Rating and capacity */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold mb-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-foreground">{rating}</span>
                <span>({reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                <span>{guests} guests max</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
              Beautiful eco homestay offering home-cooked organic meals, mountain trails, and a traditional fireplace.
            </p>

          </div>

          {/* Price and Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <div>
              <p className="text-2xl font-black text-primary tracking-tight">₹{price}</p>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">per night</span>
            </div>
            <Link
              href={`/homestays/${id}`}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              View Details
            </Link>
          </div>

        </div>

      </div>
    </motion.div>
  )
}
