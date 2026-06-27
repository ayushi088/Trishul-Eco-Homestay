'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HomestayCard from '@/components/homestay-card'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, LayoutGrid, LayoutList, Scale, X, HelpCircle, Check, Star, RefreshCw } from 'lucide-react'

interface HomestayData {
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

const ALL_HOMESTAYS: HomestayData[] = [
  {
    id: '1',
    title: 'Mountain View Villa',
    image: 'https://images.unsplash.com/photo-1584488289688-210e890b900d?w=600&h=400&fit=crop',
    price: 2500,
    rating: 4.8,
    reviews: 156,
    guests: 6,
    location: 'Chopta',
    availability: 'AVAILABLE',
    bedrooms: 3,
    bathrooms: 2,
    type: 'Villa',
    amenities: ['WiFi', 'Meals', 'Heating', 'Fireplace'],
  },
  {
    id: '2',
    title: 'Cozy Valley Homestay',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    price: 1800,
    rating: 4.9,
    reviews: 243,
    guests: 4,
    location: 'Auli',
    availability: 'POPULAR',
    bedrooms: 2,
    bathrooms: 1,
    type: 'Cabin',
    amenities: ['WiFi', 'Meals', 'Fireplace'],
  },
  {
    id: '3',
    title: 'Himalayan Retreat',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424e492?w=600&h=400&fit=crop',
    price: 3200,
    rating: 4.7,
    reviews: 89,
    guests: 8,
    location: 'Munsiyari',
    availability: 'BESTSELLER',
    bedrooms: 4,
    bathrooms: 3,
    type: 'Cottage',
    amenities: ['WiFi', 'Meals', 'Heating', 'Hot Tub'],
  },
  {
    id: '4',
    title: 'Forest View Cottage',
    image: 'https://images.unsplash.com/photo-1560448204-e02f7c3ad9d2?w=600&h=400&fit=crop',
    price: 2000,
    rating: 4.6,
    reviews: 134,
    guests: 5,
    location: 'Kedarkantha',
    availability: 'LIMITED',
    bedrooms: 2,
    bathrooms: 2,
    type: 'Cottage',
    amenities: ['WiFi', 'Meals', 'Heating'],
  },
  {
    id: '5',
    title: 'Alpine Adventure Lodge',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    price: 2800,
    rating: 4.9,
    reviews: 198,
    guests: 7,
    location: 'Tungnath',
    availability: 'AVAILABLE',
    bedrooms: 3,
    bathrooms: 2,
    type: 'Lodge',
    amenities: ['WiFi', 'Meals', 'Heating', 'Fireplace', 'Hot Tub'],
  },
  {
    id: '6',
    title: 'Valley Dreams Homestay',
    image: 'https://images.unsplash.com/photo-1578992260653-f73603797146?w=600&h=400&fit=crop',
    price: 1500,
    rating: 4.5,
    reviews: 78,
    guests: 3,
    location: 'Pauri',
    availability: 'AVAILABLE',
    bedrooms: 1,
    bathrooms: 1,
    type: 'Cabin',
    amenities: ['Meals'],
  },
  {
    id: '7',
    title: 'Stone Valley Resort',
    image: 'https://images.unsplash.com/photo-1578974595617-7ec5243b359f?w=600&h=400&fit=crop',
    price: 3500,
    rating: 4.8,
    reviews: 112,
    guests: 10,
    location: 'Auli',
    availability: 'POPULAR',
    bedrooms: 5,
    bathrooms: 4,
    type: 'Villa',
    amenities: ['WiFi', 'Meals', 'Heating', 'Hot Tub'],
  },
  {
    id: '8',
    title: 'Mountain Echo Stay',
    image: 'https://images.unsplash.com/photo-1486046281750-441018d9b21f?w=600&h=400&fit=crop',
    price: 2200,
    rating: 4.7,
    reviews: 145,
    guests: 5,
    location: 'Chopta',
    availability: 'LIMITED',
    bedrooms: 2,
    bathrooms: 2,
    type: 'Cottage',
    amenities: ['WiFi', 'Meals', 'Heating', 'Fireplace'],
  },
]

export default function HomestaysPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [selectedType, setSelectedType] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  
  const [isLoading, setIsLoading] = useState(false)
  const [visibleStays, setVisibleStays] = useState(6)
  const [isScrollLoading, setIsScrollLoading] = useState(false)
  
  // Compare State
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  // Simulation loading on filter changes
  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [searchTerm, priceRange, selectedLocation, sortBy, selectedType, selectedAmenities])

  // Get distinct values
  const locations = Array.from(new Set(ALL_HOMESTAYS.map((h) => h.location)))
  const propertyTypes = Array.from(new Set(ALL_HOMESTAYS.map((h) => h.type)))
  const allAmenities = ['WiFi', 'Meals', 'Heating', 'Fireplace', 'Hot Tub']

  // Filter Logic
  let filtered = ALL_HOMESTAYS.filter((homestay) => {
    const matchesSearch =
      homestay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homestay.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice =
      homestay.price >= priceRange[0] && homestay.price <= priceRange[1]
    const matchesLocation =
      !selectedLocation || homestay.location === selectedLocation
    const matchesType = !selectedType || homestay.type === selectedType
    const matchesAmenities = selectedAmenities.every(amenity =>
      homestay.amenities.includes(amenity)
    )

    return matchesSearch && matchesPrice && matchesLocation && matchesType && matchesAmenities
  })

  // Sort logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const handleCompareToggle = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 homestays at a time.')
        return prev
      }
      return [...prev, id]
    })
  }

  const loadMoreStays = () => {
    setIsScrollLoading(true)
    setTimeout(() => {
      setVisibleStays(prev => prev + 2)
      setIsScrollLoading(false)
    }, 1000)
  }

  const comparedStays = ALL_HOMESTAYS.filter(h => compareIds.includes(h.id))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary to-emerald-700 text-white py-16 pt-28">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Explore Himalayan Homestays</h1>
          <p className="text-green-100 text-sm sm:text-base font-semibold max-w-xl">
            Filter through authentic stays, compare facilities, and book directly with local hosts for genuine cultural experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Left Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm sticky top-24 space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-extrabold text-lg flex items-center gap-2 text-foreground">
                  <Filter className="w-5 h-5 text-primary" />
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setPriceRange([0, 5000])
                    setSelectedLocation('')
                    setSortBy('popular')
                    setSelectedType('')
                    setSelectedAmenities([])
                  }}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Search Name</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search stays..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-border bg-input text-foreground rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border bg-input text-foreground rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Max Price</label>
                  <span className="text-sm font-bold text-primary">₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border bg-input text-foreground rounded-xl text-sm focus:outline-none"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Amenities</label>
                <div className="space-y-2">
                  {allAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2.5 text-sm font-semibold text-foreground cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="w-4.5 h-4.5 rounded border-border accent-primary cursor-pointer"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 2. Grid/List Container */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-[20px] p-4 shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                Showing <span className="text-foreground">{filtered.length}</span> homestays matching criteria
              </p>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-1.5 border border-border bg-input text-foreground rounded-xl text-xs font-semibold focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Grid/List Toggler */}
                <div className="flex border border-border rounded-xl overflow-hidden p-0.5 bg-muted">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${layout === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
                    title="Grid Layout"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-lg transition-colors ${layout === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted-foreground/10'}`}
                    title="List Layout"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Stream */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                >
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="bg-card border border-border rounded-[24px] p-5 space-y-4 animate-pulse">
                      <div className="h-48 bg-muted rounded-2xl w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-3 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-1/4 mt-4" />
                    </div>
                  ))}
                </motion.div>
              ) : filtered.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                >
                  {filtered.slice(0, visibleStays).map((homestay) => (
                    <HomestayCard
                      key={homestay.id}
                      {...homestay}
                      layout={layout}
                      isCompared={compareIds.includes(homestay.id)}
                      onCompareToggle={(e) => handleCompareToggle(homestay.id, e)}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card border border-border rounded-[24px] p-12 text-center shadow-sm"
                >
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-extrabold text-foreground mb-1">No homestays found</p>
                  <p className="text-sm text-muted-foreground mb-4">Try relaxing your price filters or checking other locations.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More Button */}
            {filtered.length > visibleStays && !isLoading && (
              <div className="pt-4">
                <button
                  disabled={isScrollLoading}
                  onClick={loadMoreStays}
                  className="px-6 py-3 border border-border bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
                >
                  {isScrollLoading ? 'Loading more stays...' : 'Load More Homestays'}
                  <RefreshCw className={`w-3.5 h-3.5 ${isScrollLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 3. Floating Comparison Dock */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border border-border shadow-2xl rounded-[24px] px-6 py-4 flex items-center gap-6 max-w-lg w-11/12"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm text-foreground">Compare Stays</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase">{compareIds.length} of 3 selected</p>
              </div>
            </div>

            <div className="flex gap-2 flex-grow justify-end">
              <button
                onClick={() => setCompareIds([])}
                className="px-3 py-2 border border-border rounded-xl text-xs font-bold hover:bg-muted text-foreground transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                disabled={compareIds.length < 2}
                className="px-4 py-2 bg-primary disabled:bg-primary/50 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Compare Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Full Screen Modal overlay */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-[28px] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
                <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Homestay Comparison Matrix
                </h3>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-1.5 hover:bg-muted text-muted-foreground rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-4 text-xs font-bold text-muted-foreground uppercase w-1/4">Features</th>
                      {comparedStays.map(stay => (
                        <th key={stay.id} className="py-4 px-4 text-left w-1/4">
                          <div className="space-y-2">
                            <img src={stay.image} className="w-24 h-16 object-cover rounded-lg border border-border" alt="" />
                            <p className="font-extrabold text-sm text-foreground line-clamp-1">{stay.title}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/10">
                      <td className="py-4 text-xs font-bold text-muted-foreground uppercase">Price per night</td>
                      {comparedStays.map(stay => (
                        <td key={stay.id} className="py-4 px-4 font-black text-primary text-base">₹{stay.price}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/10">
                      <td className="py-4 text-xs font-bold text-muted-foreground uppercase">Location</td>
                      {comparedStays.map(stay => (
                        <td key={stay.id} className="py-4 px-4 text-sm font-semibold text-foreground">{stay.location}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/10">
                      <td className="py-4 text-xs font-bold text-muted-foreground uppercase">Rating</td>
                      {comparedStays.map(stay => (
                        <td key={stay.id} className="py-4 px-4 text-sm font-semibold text-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span>{stay.rating}</span>
                            <span className="text-muted-foreground text-xs font-normal">({stay.reviews})</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/10">
                      <td className="py-4 text-xs font-bold text-muted-foreground uppercase">Type & Rooms</td>
                      {comparedStays.map(stay => (
                        <td key={stay.id} className="py-4 px-4 text-xs font-semibold text-muted-foreground leading-normal">
                          <p className="text-foreground font-bold">{stay.type}</p>
                          <p>{stay.bedrooms} Bedrooms · {stay.bathrooms} Baths</p>
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-muted/10">
                      <td className="py-4 text-xs font-bold text-muted-foreground uppercase">Amenities</td>
                      {comparedStays.map(stay => (
                        <td key={stay.id} className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {stay.amenities.map(a => (
                              <span key={a} className="text-[10px] bg-muted px-2 py-0.5 rounded font-bold text-foreground/80 border border-border">{a}</span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-muted/20 border-t border-border text-right flex justify-end gap-2">
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="px-4 py-2 border border-border bg-card rounded-xl text-xs font-bold hover:bg-muted text-foreground transition-colors"
                >
                  Close Matrix
                </button>
                <button
                  onClick={() => {
                    setIsCompareModalOpen(false)
                    // Take the first homestay for details
                    window.location.href = `/homestays/${compareIds[0]}`
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Book Compare Lead
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
