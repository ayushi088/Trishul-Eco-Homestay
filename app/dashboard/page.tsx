'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Layout, Calendar, Heart, Star, Bell, LogOut, Settings, 
  ChevronRight, Plus, Users, Landmark, TrendingUp, Sun, CloudRain, 
  MapPin, CheckCircle, Scale, Eye, EyeOff, ShieldAlert, Key, Clipboard, 
  Laptop, History, Edit, FileSpreadsheet, Download, CloudLightning, Languages
} from 'lucide-react'

// Tabs definition
const TABS = [
  { id: 'overview', name: 'Overview & Stats', icon: Layout, role: 'host' },
  { id: 'bookings', name: 'Manage Stays', icon: Calendar, role: 'both' },
  { id: 'listings', name: 'Add Homestay', icon: Plus, role: 'host' },
  { id: 'settings', name: 'Settings & Security', icon: Settings, role: 'both' },
  { id: 'admin', name: 'Admin Panel', icon: Landmark, role: 'admin' },
]

import { 
  getHomestays, 
  createHomestay, 
  updateHomestay, 
  deleteHomestay, 
  getBookings, 
  Homestay, 
  Booking 
} from '@/lib/api'
import { useToast } from '@/components/toast-provider'
import { Loader2, Trash2 } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isHostView, setIsHostView] = useState(true) // Toggle host vs guest
  const [lang, setLang] = useState('EN')

  // API Data State
  const [listings, setListings] = useState<Homestay[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  // Settings State
  const [twoFa, setTwoFa] = useState(false)
  const [apiKey, setApiKey] = useState('trishul_live_9f82d18471b058cfa9')
  const [keyGenerated, setKeyGenerated] = useState(false)

  // Host Listing Add Form State
  const [listingTitle, setListingTitle] = useState('')
  const [listingPrice, setListingPrice] = useState(2000)
  const [listingLocation, setListingLocation] = useState('Chopta')
  const [listingType, setListingType] = useState('Cottage')
  const [listingGuests, setListingGuests] = useState(4)
  const [kycDoc, setKycDoc] = useState('')
  const [smartPricing, setSmartPricing] = useState(true)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  // Edit Listing State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)

  // Charts simulated tooltip
  const [hoveredRevenue, setHoveredRevenue] = useState<{ day: string; value: number } | null>(null)

  const revenueData = [
    { day: 'Mon', value: 12000 },
    { day: 'Tue', value: 18000 },
    { day: 'Wed', value: 15000 },
    { day: 'Thu', value: 24000 },
    { day: 'Fri', value: 22000 },
    { day: 'Sat', value: 32000 },
    { day: 'Sun', value: 28000 }
  ]

  const occupancyRates = [
    { label: 'Chopta Cottage', rate: 88 },
    { label: 'Auli Cabin', rate: 74 },
    { label: 'Munsiyari Stay', rate: 92 }
  ]

  // Load Dashboard Data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const dataListings = await getHomestays()
        setListings(dataListings)
        const dataBookings = await getBookings()
        setBookings(dataBookings)
      } catch (err) {
        console.error(err)
        toast.error('Failed to retrieve operations details from backend server.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const generateApiKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let token = 'trishul_live_'
    for (let i = 0; i < 18; i++) {
      token += chars[Math.floor(Math.random() * chars.length)]
    }
    setApiKey(token)
    setKeyGenerated(true)
    setTimeout(() => setKeyGenerated(false), 2000)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast.info('API Key copied to clipboard!')
  }

  const handleAddHomestay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!listingTitle || !kycDoc) {
      toast.error('Please specify a title and provide KYC document reference.')
      return
    }
    
    try {
      const response = await createHomestay({
        title: listingTitle,
        price: listingPrice,
        location: listingLocation,
        type: listingType,
        guests: listingGuests,
        availability: 'AVAILABLE',
        amenities: ['WiFi', 'Meals', 'Heating'],
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop'
      })
      
      toast.success('Listing created successfully! Initiating KYC reviews.')
      setListings(prev => [...prev, response.data])
      setListingTitle('')
      setKycDoc('')
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to submit stay listing.')
    }
  }

  const handleStartEdit = (id: string, currentPrice: number) => {
    setEditingId(id)
    setEditPrice(currentPrice)
  }

  const handleSavePrice = async (id: string) => {
    try {
      await updateHomestay(id, { price: editPrice })
      toast.success('Listing price updated successfully.')
      setListings(prev => prev.map(item => item.id === id ? { ...item, price: editPrice } : item))
      setEditingId(null)
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to save stay details.')
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this homestay listing?')) return
    try {
      await deleteHomestay(id)
      toast.success('Homestay listing removed successfully.')
      setListings(prev => prev.filter(item => item.id !== id))
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to delete listing.')
    }
  }

  const handleDownloadCsv = () => {
    if (bookings.length === 0) {
      toast.info('No bookings available to export.')
      return
    }
    const headers = ['ID', 'Guest Name', 'Guest Email', 'Guest Phone', 'Homestay', 'Check In', 'Check Out', 'Guests', 'Payout', 'Status']
    const rows = bookings.map(b => [
      b.id, b.guestName, b.guestEmail, b.guestPhone, b.homestayName, b.checkIn, b.checkOut, b.guests, `₹${b.totalPrice}`, b.status || 'Confirmed'
    ])
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'trishul_bookings_export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Bookings logs downloaded successfully.')
  }

  // Translation mapping
  const contentHI = {
    welcome: 'त्रिशूल डैशबोर्ड में आपका स्वागत है',
    addBtn: 'होमस्टे जोड़ें',
    revenue: 'कुल राजस्व',
    occupancy: 'मासिक ऑक्यूपेंसी',
  }
  const contentEN = {
    welcome: 'Welcome to Trishul Dashboard',
    addBtn: 'Add Homestay',
    revenue: 'Total Revenue',
    occupancy: 'Monthly Occupancy',
  }
  const t = lang === 'EN' ? contentEN : contentHI

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow flex pt-20 h-[calc(100vh-80px)]">
        
        {/* 1. Left Collapsible Sidebar */}
        <motion.div
          animate={{ width: sidebarCollapsed ? '76px' : '260px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border-r border-border bg-card flex flex-col justify-between p-4 h-full relative"
        >
          <div className="space-y-6">
            
            {/* View Mode Toggle Switcher */}
            {!sidebarCollapsed && (
              <div className="p-1 bg-muted rounded-xl flex items-center justify-between gap-1 border border-border">
                <button
                  onClick={() => { setIsHostView(true); setActiveTab('overview') }}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isHostView ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Host View
                </button>
                <button
                  onClick={() => { setIsHostView(false); setActiveTab('bookings') }}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isHostView ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Guest View
                </button>
              </div>
            )}

            {/* Navigation links */}
            <nav className="space-y-1.5">
              {TABS.map((tab) => {
                const Icon = tab.icon
                // Filter tabs based on role view
                if (isHostView && tab.id === 'bookings' && !isHostView) return null
                if (!isHostView && (tab.role === 'host' || tab.role === 'admin')) return null
                
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl border border-transparent transition-all text-left ${
                      isActive
                        ? 'bg-primary text-white font-extrabold shadow-sm'
                        : 'text-foreground hover:bg-muted font-medium'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="text-sm">{tab.name}</span>}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Toggle/Collapse Sidebar controls at bottom */}
          <div className="space-y-3">
            {/* English / Hindi Toggle */}
            {!sidebarCollapsed && (
              <button 
                onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground border border-border bg-muted/30 rounded-xl"
              >
                <Languages className="w-4 h-4 text-primary" />
                <span>Language: {lang === 'EN' ? 'English' : 'हिंदी'}</span>
              </button>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2.5 bg-muted/60 hover:bg-muted border border-border/80 rounded-xl text-xs font-bold text-foreground text-center"
            >
              {sidebarCollapsed ? '→' : '← Collapse Sidebar'}
            </button>
          </div>
        </motion.div>

        {/* 2. Main Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* Welcome header bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-left pb-4 border-b border-border">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">{t.welcome}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-semibold">Logged in as Administrator & Host John Doe</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('listings')}
                className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addBtn}</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* OVERVIEW PANEL */}
            {activeTab === 'overview' && isHostView && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: t.revenue, value: '₹1,45,200', growth: '+12.4%', up: true },
                    { label: 'Active Bookings', value: '38 Stays', growth: '+8.2%', up: true },
                    { label: 'Occupancy Rate', value: '84.2%', growth: '-1.5%', up: false },
                    { label: 'Guest Feedbacks', value: '4.85 ★', growth: '+0.5%', up: true }
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-card border border-border p-5 rounded-[22px] shadow-sm relative overflow-hidden text-left"
                    >
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{card.label}</p>
                      <p className="text-2xl font-black text-foreground">{card.value}</p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-3.5 ${
                        card.up ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25' : 'bg-rose-500/10 text-rose-600 border border-rose-500/25'
                      }`}>
                        {card.growth} this month
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Operations & Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Revenue Line Chart. Width 8 */}
                  <div className="lg:col-span-8 bg-card border border-border rounded-[24px] p-6 shadow-sm text-left">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-extrabold text-base text-foreground">Weekly Revenue Trend</h3>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5">SaaS billing platform data analytics</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary rounded-lg">Export CSV</button>
                      </div>
                    </div>

                    {/* Interactive Animated SVG Chart */}
                    <div className="relative h-60 w-full bg-muted/20 border border-border/60 rounded-2xl p-4 flex flex-col justify-end">
                      
                      {/* Floating tooltip */}
                      {hoveredRevenue && (
                        <div className="absolute top-4 left-4 bg-slate-900 text-white border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-bold text-left shadow-lg pointer-events-none">
                          <p>{hoveredRevenue.day}</p>
                          <p className="text-primary mt-0.5">₹{hoveredRevenue.value}</p>
                        </div>
                      )}

                      <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 150">
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0F8A5F" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0F8A5F" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#8080801a" strokeDasharray="3" />
                        <line x1="0" y1="75" x2="500" y2="75" stroke="#8080801a" strokeDasharray="3" />
                        <line x1="0" y1="130" x2="500" y2="130" stroke="#8080801a" strokeDasharray="3" />

                        {/* Chart path Area */}
                        <path
                          d="M 10 130 Q 80 80, 150 110 T 290 50 T 430 30 T 490 60 L 490 148 L 10 148 Z"
                          fill="url(#chartGrad)"
                        />

                        {/* Chart path Line */}
                        <path
                          d="M 10 130 Q 80 80, 150 110 T 290 50 T 430 30 T 490 60"
                          fill="none"
                          stroke="#0F8A5F"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Interaction points */}
                        {revenueData.map((pt, i) => {
                          const x = 10 + i * 80
                          const y = 140 - (pt.value / 35000) * 110
                          return (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#0F8A5F"
                              stroke="#FFFFFF"
                              strokeWidth="2.5"
                              className="cursor-pointer hover:r-7 transition-all"
                              onMouseEnter={() => setHoveredRevenue(pt)}
                              onMouseLeave={() => setHoveredRevenue(null)}
                            />
                          )
                        })}
                      </svg>
                      
                      {/* X axis labels */}
                      <div className="flex justify-between text-[9px] text-muted-foreground font-extrabold uppercase px-1 mt-4">
                        {revenueData.map(d => <span key={d.day}>{d.day}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* Weather & Calendar widgets. Width 4 */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Weather widget */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-slate-800 rounded-[24px] p-5 shadow text-left relative overflow-hidden">
                      <div className="absolute top-2 right-2 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider">Chopta Mountain Live Weather</p>
                          <h4 className="text-3xl font-black mt-1">18°C</h4>
                        </div>
                        <CloudRain className="w-8 h-8 text-blue-400 animate-bounce" />
                      </div>
                      <p className="text-xs text-slate-300 font-semibold leading-relaxed">Partial showers forecast for tomorrow trek trails. Guides alerted.</p>
                    </div>

                    {/* Check-ins timeline calendar */}
                    <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm text-left">
                      <h4 className="font-extrabold text-sm text-foreground mb-4">Upcoming Stays (Today)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2.5 border-l-4 border-emerald-500 bg-muted/40 rounded-xl">
                          <div>
                            <p className="font-bold text-xs text-foreground">John Doe (Group of 4)</p>
                            <span className="text-[10px] text-muted-foreground font-semibold">Check In: 12:00 PM · Room Heaters ready</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2.5 border-l-4 border-amber-500 bg-muted/40 rounded-xl">
                          <div>
                            <p className="font-bold text-xs text-foreground">Sarah Smith (Group of 2)</p>
                            <span className="text-[10px] text-muted-foreground font-semibold">Check Out: 11:00 AM · Paid ₹6,400</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* MANAGE STAYS PANEL */}
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-foreground">Active Bookings</h2>
                  <button onClick={handleDownloadCsv} className="px-3.5 py-2 border border-border bg-card rounded-xl text-xs font-bold hover:bg-muted text-foreground flex items-center gap-1.5 shadow-sm">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Download CSV Logs</span>
                  </button>
                </div>

                <div className="bg-card border border-border rounded-[24px] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border text-xs font-bold text-muted-foreground uppercase">
                          <th className="py-4 px-6">Traveler</th>
                          <th className="py-4 px-6">Homestay</th>
                          <th className="py-4 px-6">Dates</th>
                          <th className="py-4 px-6">Payout</th>
                          <th className="py-4 px-6">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-xs sm:text-sm">
                        {bookings.length > 0 ? (
                          bookings.map((row, idx) => (
                            <tr key={idx} className="hover:bg-muted/10">
                              <td className="py-4 px-6 font-bold text-foreground">{row.guestName}</td>
                              <td className="py-4 px-6 text-muted-foreground font-semibold">{row.homestayName}</td>
                              <td className="py-4 px-6 text-muted-foreground font-semibold">{row.checkIn} - {row.checkOut}</td>
                              <td className="py-4 px-6 font-extrabold text-primary">₹{row.totalPrice}</td>
                              <td className="py-4 px-6">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  row.status === 'Confirmed'
                                    ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25'
                                    : row.status === 'Completed'
                                    ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/25'
                                    : 'bg-amber-500/10 text-amber-600 border border-amber-500/25'
                                }`}>
                                  {row.status || 'Confirmed'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-muted-foreground font-semibold">
                              No active bookings registered in backend system yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADD HOMESTAY TAB */}
            {activeTab === 'listings' && (
              <motion.div
                key="listings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-[24px] p-6 sm:p-8 max-w-2xl mx-auto shadow-lg text-left"
              >
                <h2 className="text-xl font-extrabold text-foreground mb-1">Create New Listing</h2>
                <p className="text-xs text-muted-foreground mb-6 font-semibold">Hosts KYC documentation review checks are automatically initiated on creation.</p>

                <form onSubmit={handleAddHomestay} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Homestay Title</label>
                    <input
                      type="text"
                      required
                      value={listingTitle}
                      onChange={(e) => setListingTitle(e.target.value)}
                      placeholder="e.g. Chopta Forest Edge Retreat"
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Nightly Rate (INR)</label>
                      <input
                        type="number"
                        required
                        value={listingPrice}
                        onChange={(e) => setListingPrice(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Upload Host KYC ID</label>
                      <input
                        type="text"
                        required
                        value={kycDoc}
                        onChange={(e) => setKycDoc(e.target.value)}
                        placeholder="Pan Card / Aadhar Card Number"
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Smart Pricing Switch */}
                  <label className="flex items-start gap-4 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={smartPricing}
                      onChange={() => setSmartPricing(!smartPricing)}
                      className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-sm text-foreground flex items-center gap-1.5">
                        Enable Smart Pricing Suggestions
                        <span className="text-[9px] text-primary uppercase font-bold bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">AI Engine</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Dynamically updates pricing suggestions based on peak season forecasts and guest booking demands.</p>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                    Submit Homestay Proposal
                  </button>

                  <AnimatePresence>
                    {isSubmitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl text-xs font-bold text-center mt-4"
                      >
                        Proposal submitted! Verification KYC review will complete in 12 hours.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Active Listings Table */}
                <div className="mt-12 space-y-4 pt-8 border-t border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Current Active Listings</h3>
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase">
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Location</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Price / Night</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-xs">
                        {listings.map((stay) => (
                          <tr key={stay.id} className="hover:bg-muted/10">
                            <td className="py-3.5 px-4 font-bold text-foreground">{stay.title}</td>
                            <td className="py-3.5 px-4 text-muted-foreground font-semibold">{stay.location}</td>
                            <td className="py-3.5 px-4 text-muted-foreground font-semibold">{stay.type}</td>
                            <td className="py-3.5 px-4 font-semibold text-foreground">
                              {editingId === stay.id ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(parseInt(e.target.value))}
                                    className="w-16 px-1.5 py-1 border border-border bg-input rounded text-xs focus:outline-none"
                                  />
                                  <button onClick={() => handleSavePrice(stay.id)} className="text-[10px] bg-primary text-white px-2 py-1 rounded font-bold shadow-sm">Save</button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span>₹{stay.price}</span>
                                  <button onClick={() => handleStartEdit(stay.id, stay.price)} className="text-[10px] text-primary font-bold hover:underline">Edit</button>
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteListing(stay.id)}
                                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-500/10 rounded-lg transition-colors inline-flex items-center"
                                title="Delete Stay"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* SETTINGS PANEL (API Keys, 2FA, Security logs) */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto space-y-6 text-left"
              >
                
                {/* Profile update block */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-foreground">Profile Details</h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe" className="w-16 h-16 rounded-xl border border-border" alt="" />
                    <div className="flex-grow space-y-2 w-full">
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-4 py-2 border border-border bg-input rounded-lg text-sm text-foreground focus:outline-none"
                      />
                      <input
                        type="email"
                        defaultValue="john.doe@eco-stay.com"
                        className="w-full px-4 py-2 border border-border bg-input rounded-lg text-sm text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* API Keys Widget */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-foreground flex items-center gap-1.5">
                    <Key className="w-5 h-5 text-primary" />
                    Developer API Keys
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Integration keys for embedding Trishul bookings into external custom widgets.</p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={apiKey}
                      className="flex-grow px-4 py-2.5 bg-input border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none select-all"
                    />
                    <button
                      onClick={handleCopyKey}
                      className="px-3 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl text-xs font-bold transition-all"
                      title="Copy Key"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={generateApiKey}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                    >
                      Regenerate Key
                    </button>
                    {keyGenerated && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">New Key Activated!</span>}
                  </div>
                </div>

                {/* Security logs, active devices, 2FA */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-6">
                  <h3 className="font-extrabold text-base text-foreground flex items-center gap-1.5">
                    <History className="w-5 h-5 text-primary" />
                    Security & Sessions
                  </h3>

                  {/* 2FA switch */}
                  <label className="flex items-center justify-between p-3.5 border border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors select-none">
                    <div>
                      <p className="font-bold text-sm text-foreground">Two-Factor Authentication (2FA)</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 font-semibold">Sends a numeric code to your email on new login attempts.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFa}
                      onChange={() => setTwoFa(!twoFa)}
                      className="w-10 h-5 rounded-full bg-slate-200 border-none accent-primary cursor-pointer"
                    />
                  </label>

                  {/* Connected devices */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Connected Devices</p>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-bold text-xs text-foreground">Windows Laptop · Chrome Browser</p>
                          <span className="text-[9px] text-emerald-500 font-extrabold uppercase">Active Session</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold">Chopta, IN</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ADMIN CONTROL PANEL */}
            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-foreground">Global Host Review Operations</h2>
                </div>

                {/* Audit KYC review logs */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-foreground">Pending Host Certifications</h4>
                  
                  <div className="space-y-3">
                    {[
                      { host: 'Amit Patel', doc: 'AADHAR_9104...', stay: 'Alpine Dreams villa', time: 'Received 1 hr ago' },
                      { host: 'Vikram Singh', doc: 'AADHAR_7381...', stay: 'Mountain Echo Cottage', time: 'Received 5 hrs ago' }
                    ].map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/40 transition-colors">
                        <div>
                          <p className="font-bold text-xs text-foreground">{app.host} ({app.doc})</p>
                          <span className="text-[10px] text-muted-foreground font-semibold">Proposing: {app.stay} · {app.time}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => alert('KYC proposal approved')} className="px-3 py-1.5 bg-primary text-white rounded-lg text-[10px] font-bold shadow">Approve</button>
                          <button onClick={() => alert('KYC proposal rejected')} className="px-3 py-1.5 border border-border hover:bg-muted text-foreground rounded-lg text-[10px] font-bold">Reject</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CMS Travel Blogs FAQs */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-foreground">CMS Content Editing</h4>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-3 bg-muted/60 border border-border hover:bg-muted hover:border-primary/20 text-xs font-bold rounded-xl text-foreground text-left flex items-center justify-between">
                      <span>Add new travel blog entry</span>
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="flex-1 px-4 py-3 bg-muted/60 border border-border hover:bg-muted hover:border-primary/20 text-xs font-bold rounded-xl text-foreground text-left flex items-center justify-between">
                      <span>Update homepage accordion FAQs</span>
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      <Footer />
    </div>
  )
}
