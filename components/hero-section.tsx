'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Calendar, Users, MapPin, Star, Sparkles, ShieldCheck } from 'lucide-react'

export default function HeroSection() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (destination) query.set('location', destination)
    if (checkIn) query.set('checkin', checkIn)
    if (checkOut) query.set('checkout', checkOut)
    if (guests) query.set('guests', guests)
    
    router.push(`/homestays?${query.toString()}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const stats = [
    { value: '500+', label: 'Eco Homestays', suffix: 'verified' },
    { value: '10,000+', label: 'Happy Guests', suffix: 'hosted' },
    { value: '4.8★', label: 'Average Rating', suffix: 'high trust' },
  ]

  const popularLocations = ['Chopta', 'Auli', 'Munsiyari', 'Kedarkantha']

  return (
    <div className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
      
      {/* Visual Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1200&fit=crop')`,
        }}
      />
      {/* High-end gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30 dark:from-background dark:via-background/60 dark:to-black/80" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover the Unexplored Himalayas</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground"
            variants={itemVariants}
          >
            Experience the Soul of <span className="text-primary bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Chopta</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Stay with local families, wake up to panoramic Himalayan views, and experience true mountain hospitality with sustainable stays.
          </motion.p>
        </motion.div>

        {/* Floating Airbnb-style Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl bg-card border border-border shadow-2xl rounded-[24px] p-4 sm:p-6 mb-12 backdrop-blur-xl bg-card/90"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Destination */}
            <div className="flex flex-col px-3 py-2 hover:bg-muted/40 rounded-2xl transition-colors border-b md:border-b-0 md:border-r border-border text-left">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-foreground text-sm font-semibold border-none focus:ring-0 focus:outline-none outline-none select-none"
              >
                <option value="" className="bg-card">Where are you going?</option>
                {popularLocations.map((loc) => (
                  <option key={loc} value={loc} className="bg-card text-foreground">{loc}</option>
                ))}
              </select>
            </div>

            {/* Check In */}
            <div className="flex flex-col px-3 py-2 hover:bg-muted/40 rounded-2xl transition-colors border-b md:border-b-0 md:border-r border-border text-left">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Check In
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-foreground text-sm font-semibold border-none focus:ring-0 focus:outline-none outline-none"
              />
            </div>

            {/* Check Out */}
            <div className="flex flex-col px-3 py-2 hover:bg-muted/40 rounded-2xl transition-colors border-b md:border-b-0 md:border-r border-border text-left">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-foreground text-sm font-semibold border-none focus:ring-0 focus:outline-none outline-none"
              />
            </div>

            {/* Guests & Search Button */}
            <div className="flex items-center justify-between pl-3 gap-2">
              <div className="flex flex-col text-left flex-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" /> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-foreground text-sm font-semibold border-none focus:ring-0 focus:outline-none outline-none"
                >
                  <option value="1" className="bg-card">1 Guest</option>
                  <option value="2" className="bg-card">2 Guests</option>
                  <option value="4" className="bg-card">4 Guests</option>
                  <option value="6" className="bg-card">6 Guests</option>
                </select>
              </div>
              <button
                type="submit"
                className="p-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center active:scale-95 group/btn"
              >
                <Search className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
              </button>
            </div>

          </form>
        </motion.div>

        {/* Statistics Block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-12 max-w-2xl w-full border-t border-border pt-8 text-center"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">{stat.label}</p>
              <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold bg-muted text-primary px-1.5 py-0.5 rounded">
                {stat.suffix}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
