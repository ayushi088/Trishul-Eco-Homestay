'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, Users, Wallet, Compass, Share2, Download, Bookmark, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
}

interface TravelPlan {
  destination: string
  budget: number
  groupSize: number
  duration: number
  itinerary: ItineraryDay[]
  homestays: { id: number; name: string; price: number; rating: number }[]
  totalCost: number
}

export default function AITripPlannerPage() {
  const [destination, setDestination] = useState('Chopta')
  const [budget, setBudget] = useState(3000)
  const [guests, setGuests] = useState('2')
  const [duration, setDuration] = useState('3')
  const [preferences, setPreferences] = useState<string[]>([])
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [plan, setPlan] = useState<TravelPlan | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const preferenceOptions = [
    { id: 'nature', label: 'Nature & Serenity' },
    { id: 'adventure', label: 'Adventure Trekking' },
    { id: 'peace', label: 'Peace & Meditation' },
    { id: 'family', label: 'Family Friendly' },
    { id: 'culture', label: 'Local Culture & Food' },
  ]

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setIsSaved(false)
    setPlan(null)

    const loadingStages = [
      'Scanning local homestay capacities...',
      'Mapping Himalayan trail conditions...',
      'Customizing meal plan selections...',
      'Compiling smart budget estimations...',
      'AI Recommendation Engine generating...'
    ]

    let stage = 0
    setLoadingText(loadingStages[0])
    
    const interval = setInterval(() => {
      stage += 1
      if (stage < loadingStages.length) {
        setLoadingText(loadingStages[stage])
      }
    }, 800)

    setTimeout(() => {
      clearInterval(interval)
      setIsGenerating(false)
      
      // Setup mock data response based on preferences
      setPlan({
        destination,
        budget,
        groupSize: parseInt(guests),
        duration: parseInt(duration),
        totalCost: budget * parseInt(duration) * parseInt(guests) + 1200,
        homestays: [
          { id: 1, name: 'Mountain View Cottage', price: 2500, rating: 4.8 },
          { id: 4, name: 'Valley Echo Homestay', price: 2200, rating: 4.6 }
        ],
        itinerary: [
          {
            day: 1,
            title: 'Arrival & Village Acclimatization',
            activities: [
              'Check-in at Chopta Mountain View Cottage (Welcome drink: Rhododendron juice)',
              'Evening guided walk around local Garhwali farmlands',
              'Dinner: Authentic hot Mandua roti and locally grown greens (Lai)'
            ]
          },
          {
            day: 2,
            title: 'Trek to Tungnath & Chandrashila Peak',
            activities: [
              'Early morning drive to trek starting point (Baniyakund)',
              '3.5 km trek to Tungnath temple (highest Shiva temple in the world)',
              'Optional 1.5 km climb to Chandrashila summit for 360 Himalayan views',
              'Evening bonfire and stargazing back at cottage garden'
            ]
          },
          {
            day: 3,
            title: 'Deoriatal Lake Trek & Departure',
            activities: [
              'Morning hike to the mythical Deoriatal lake (reflecting Chaukhamba peaks)',
              'Local Kumaoni cuisine workshop with host Rajesh Kumar',
              'Check-out and departure with memorable local souvenirs'
            ]
          }
        ]
      })
    }, 4200)
  }

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Plan link copied to clipboard!')
  }

  const handleDownload = () => {
    alert('Simulated PDF Itinerary Downloaded!')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 text-xs font-bold text-primary rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI powered travel agent</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-3 tracking-tight">AI Trip Planner</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Design your ideal custom Himalayan getaway in seconds using real-time local host listings and custom routes.
          </p>
        </div>

        {/* Input Form and Result Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Column width 5 */}
          <div className="lg:col-span-5 bg-card border border-border rounded-[24px] p-6 shadow-lg">
            <h2 className="text-lg font-bold text-foreground mb-6 text-left">Planner Settings</h2>
            
            <form onSubmit={handleGenerate} className="space-y-5 text-left">
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/25"
                >
                  <option value="Chopta">Chopta Valley</option>
                  <option value="Auli">Auli Slopes</option>
                  <option value="Munsiyari">Munsiyari Peaks</option>
                  <option value="Kedarkantha">Kedarkantha Trail</option>
                </select>
              </div>

              {/* Guests and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Group Size</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5+ Days</option>
                  </select>
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Daily Budget Limit</label>
                  <span className="text-sm font-bold text-primary">₹{budget} / day</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="8000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mt-1">
                  <span>₹1,500 (Budget)</span>
                  <span>₹8,000 (Luxury)</span>
                </div>
              </div>

              {/* Preference Tags */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3.5">Preferences (Select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {preferenceOptions.map((opt) => {
                    const isSelected = preferences.includes(opt.id)
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => togglePreference(opt.id)}
                        className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'bg-input border-border text-foreground hover:border-primary/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
              >
                {isGenerating ? 'Analyzing Options...' : 'Generate Itinerary'}
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </button>
            </form>
          </div>

          {/* Right Result area: Column width 7 */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isGenerating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card border border-border rounded-[24px] p-12 text-center shadow-lg h-full flex flex-col justify-center items-center min-h-[450px]"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Compass className="w-6 h-6 text-primary absolute top-5 left-5 animate-pulse" />
                  </div>
                  <h3 className="font-extrabold text-foreground text-lg mb-2">Trishul AI Engine Active</h3>
                  <p className="text-sm text-primary font-bold animate-pulse max-w-sm">{loadingText}</p>
                  
                  {/* Shimmer layout */}
                  <div className="w-full space-y-3 mt-8 max-w-md">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/2 mx-auto" />
                    <div className="h-3 bg-muted rounded animate-pulse w-5/6 mx-auto" />
                  </div>
                </motion.div>
              )}

              {plan && !isGenerating && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-left"
                >
                  {/* Summary Box */}
                  <div className="bg-gradient-to-br from-primary to-emerald-600 text-white rounded-[24px] p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-extrabold bg-white/20 border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                          Optimized Itinerary
                        </span>
                        <h3 className="text-2xl font-black mt-1">{plan.destination} Plan</h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-green-100 font-semibold">Est. Total Cost</p>
                        <p className="text-3xl font-black">₹{plan.totalCost}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <p className="text-green-100 font-semibold">Duration</p>
                        <p className="text-lg font-bold">{plan.duration} Days</p>
                      </div>
                      <div>
                        <p className="text-green-100 font-semibold">People</p>
                        <p className="text-lg font-bold">{plan.groupSize} Guests</p>
                      </div>
                      <div>
                        <p className="text-green-100 font-semibold">Style</p>
                        <p className="text-lg font-bold truncate">Nature & culture</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleSave}
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 border border-border bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl transition-all"
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-500">Saved!</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4 text-muted-foreground" />
                          <span>Save Plan</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 border border-border bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl transition-all"
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                      <span>Share Plan</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 border border-border bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl transition-all"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  {/* Suggested Homestays */}
                  <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm">
                    <h4 className="font-extrabold text-foreground text-base mb-4">Recommended Stays</h4>
                    <div className="space-y-3">
                      {plan.homestays.map((stay) => (
                        <div key={stay.id} className="flex items-center justify-between p-3.5 hover:bg-muted/40 border border-border rounded-xl transition-all">
                          <div>
                            <p className="font-bold text-foreground text-sm">{stay.name}</p>
                            <span className="text-xs text-muted-foreground">Rating: {stay.rating}★ · Cozy mountain views</span>
                          </div>
                          <div className="text-right flex items-center gap-3">
                            <div>
                              <p className="text-sm font-extrabold text-primary">₹{stay.price}</p>
                              <span className="text-[10px] text-muted-foreground font-semibold">/ night</span>
                            </div>
                            <Link
                              href={`/homestays/${stay.id}`}
                              className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-all"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day-by-Day Itinerary */}
                  <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-6">
                    <h4 className="font-extrabold text-foreground text-base">Day-by-Day Timeline</h4>
                    <div className="relative border-l border-primary/20 pl-6 ml-3 space-y-8">
                      {plan.itinerary.map((day) => (
                        <div key={day.day} className="relative text-left">
                          {/* Dot indicator */}
                          <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />
                          
                          <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                            Day {day.day}
                          </span>
                          <h5 className="font-bold text-foreground text-base mt-1.5 mb-3">{day.title}</h5>
                          
                          <ul className="space-y-2">
                            {day.activities.map((activity, aIdx) => (
                              <li key={aIdx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-2 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {!plan && !isGenerating && (
                <div className="bg-card border border-border rounded-[24px] p-12 text-center shadow-lg h-full flex flex-col justify-center items-center min-h-[450px]">
                  <Compass className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-extrabold text-foreground text-lg mb-2">No Plan Generated</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
                    Configure your options on the left pane and hit the generate button to view your custom Himalayan itinerary.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
