'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mountain } from 'lucide-react'

export default function FeaturedHomestays() {
  const homestays = [
    {
      id: 1,
      badge: 'BESTSELLER',
      title: 'Pine View Homestay',
      location: 'Sari, Chopta',
      description: 'Cozy cottage with panoramic mountain views and local hospitality.',
      amenities: ['WiFi', 'Meals', 'Experiences'],
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      badge: 'POPULAR',
      title: 'Forest Edge Homestay',
      location: 'Baniyakund, Chopta',
      description: 'Stay close to nature with serene forest surroundings.',
      amenities: ['WiFi', 'Meals', 'Experiences'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424e492?w=600&h=400&fit=crop',
    },
  ]

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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {homestays.map((homestay) => (
            <Link
              href={`/homestays/${homestay.id}`}
              key={homestay.id}
              className="group bg-card rounded-2xl shadow-md border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row h-full"
            >
              {/* Left: Image */}
              <div className="w-full sm:w-2/5 relative h-52 sm:h-full min-h-[13rem] overflow-hidden bg-muted">
                <img
                  src={homestay.image}
                  alt={homestay.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded bg-primary shadow-sm"
                >
                  {homestay.badge}
                </span>
              </div>

              {/* Right: Content */}
              <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {homestay.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{homestay.location}</p>
                  <p className="text-sm text-muted-foreground/90 line-clamp-3 mb-4">{homestay.description}</p>
                </div>

                {/* Amenities */}
                <div className="flex gap-2 flex-wrap mt-auto">
                  {homestay.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-muted text-foreground/80 rounded font-medium border border-border"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
