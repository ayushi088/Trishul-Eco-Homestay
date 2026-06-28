'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mountain, Loader2 } from 'lucide-react'
import { getHomestays, Homestay } from '@/lib/api'
import { useToast } from '@/components/toast-provider'

export default function FeaturedHomestays() {
  const [homestays, setHomestays] = useState<Homestay[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true)
        const data = await getHomestays()
        // Take first 2 as featured homestays
        setHomestays(data.slice(0, 2))
      } catch (err) {
        console.error(err)
        toast.error('Failed to load featured homestays from backend.')
      } finally {
        setLoading(false)
      }
    }
    loadFeatured()
  }, [])

  return (
    <section className="w-full bg-background py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Choose Your Himalayan Home
        </h2>

        {/* Divider with Mountain Icon */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="h-px bg-border flex-grow max-w-xs" />
          <Mountain className="w-5 h-5 text-primary" />
          <div className="h-px bg-border flex-grow max-w-xs" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-semibold">Loading homestays...</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {homestays.map((homestay) => (
              <Link
                href={`/homestays/${homestay.id}`}
                key={homestay.id}
                className="group bg-card rounded-[24px] shadow-sm border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row h-full text-left"
              >
                {/* Left: Image */}
                <div className="w-full sm:w-2/5 relative h-52 sm:h-full min-h-[13rem] overflow-hidden bg-muted">
                  <img
                    src={homestay.image}
                    alt={homestay.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/25 rounded-full shadow-sm"
                  >
                    {homestay.availability}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {homestay.title}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">{homestay.location}</p>
                    <p className="text-xs text-muted-foreground/90 line-clamp-3 mb-4 leading-relaxed">
                      Stay with local host families in cozy cottages equipped with room heating and fireplace, enjoying organic Himalayan dinners.
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-1.5 flex-wrap mt-auto pt-2">
                    {homestay.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 bg-muted text-foreground/80 rounded-lg font-bold border border-border"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
