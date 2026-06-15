'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HomestayCard from '@/components/homestay-card'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronDown } from 'lucide-react'

const ALL_HOMESTAYS = [
  {
    id: '1',
    title: 'Mountain View Villa',
    image: 'https://images.unsplash.com/photo-1584488289688-210e890b900d?w=500&h=400&fit=crop',
    price: 2500,
    rating: 4.8,
    reviews: 156,
    guests: 6,
    location: 'Chopta',
    availability: 'AVAILABLE' as const,
  },
  {
    id: '2',
    title: 'Cozy Valley Homestay',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop',
    price: 1800,
    rating: 4.9,
    reviews: 243,
    guests: 4,
    location: 'Auli',
    availability: 'POPULAR' as const,
  },
  {
    id: '3',
    title: 'Himalayan Retreat',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424e492?w=500&h=400&fit=crop',
    price: 3200,
    rating: 4.7,
    reviews: 89,
    guests: 8,
    location: 'Munsiyari',
    availability: 'BESTSELLER' as const,
  },
  {
    id: '4',
    title: 'Forest View Cottage',
    image: 'https://images.unsplash.com/photo-1560448204-e02f7c3ad9d2?w=500&h=400&fit=crop',
    price: 2000,
    rating: 4.6,
    reviews: 134,
    guests: 5,
    location: 'Kedarkantha',
    availability: 'LIMITED' as const,
  },
  {
    id: '5',
    title: 'Alpine Adventure Lodge',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop',
    price: 2800,
    rating: 4.9,
    reviews: 198,
    guests: 7,
    location: 'Tungnath',
    availability: 'AVAILABLE' as const,
  },
  {
    id: '6',
    title: 'Valley Dreams Homestay',
    image: 'https://images.unsplash.com/photo-1578992260653-f73603797146?w=500&h=400&fit=crop',
    price: 1500,
    rating: 4.5,
    reviews: 78,
    guests: 3,
    location: 'Pauri',
    availability: 'AVAILABLE' as const,
  },
  {
    id: '7',
    title: 'Stone Valley Resort',
    image: 'https://images.unsplash.com/photo-1578974595617-7ec5243b359f?w=500&h=400&fit=crop',
    price: 3500,
    rating: 4.8,
    reviews: 112,
    guests: 10,
    location: 'Auli',
    availability: 'POPULAR' as const,
  },
  {
    id: '8',
    title: 'Mountain Echo Stay',
    image: 'https://images.unsplash.com/photo-1486046281750-441018d9b21f?w=500&h=400&fit=crop',
    price: 2200,
    rating: 4.7,
    reviews: 145,
    guests: 5,
    location: 'Chopta',
    availability: 'LIMITED' as const,
  },
]

export default function HomestaysPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const locations = Array.from(new Set(ALL_HOMESTAYS.map((h) => h.location)))

  let filtered = ALL_HOMESTAYS.filter((homestay) => {
    const matchesSearch =
      homestay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homestay.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice =
      homestay.price >= priceRange[0] && homestay.price <= priceRange[1]
    const matchesLocation =
      !selectedLocation || homestay.location === selectedLocation

    return matchesSearch && matchesPrice && matchesLocation
  })

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Explore Our Homestays
          </h1>
          <p className="text-green-100">
            Discover {filtered.length} amazing Himalayan homestays
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-md border border-border sticky top-24 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </h3>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search homestays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" className="bg-card text-foreground">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-card text-foreground">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-4 text-foreground">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-primary"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular" className="bg-card text-foreground">Most Popular</option>
                  <option value="rating" className="bg-card text-foreground">Highest Rated</option>
                  <option value="price-low" className="bg-card text-foreground">Price: Low to High</option>
                  <option value="price-high" className="bg-card text-foreground">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setPriceRange([0, 5000])
                  setSelectedLocation('')
                  setSortBy('popular')
                }}
                className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 font-semibold shadow hover:shadow-md active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>

          {/* Homestays Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((homestay) => (
                  <HomestayCard key={homestay.id} {...homestay} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No homestays found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setPriceRange([0, 5000])
                    setSelectedLocation('')
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
