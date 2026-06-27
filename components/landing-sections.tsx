'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Check, Send, Bookmark, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

// 1. Popular Destinations Component
export function PopularDestinations() {
  const destinations = [
    { name: 'Chopta', stays: '45+ Stays', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', desc: 'Mini Switzerland of India with pristine meadows.' },
    { name: 'Auli', stays: '32+ Stays', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=600&h=400&fit=crop', desc: 'India’s premier ski resort with towering peaks.' },
    { name: 'Munsiyari', stays: '18+ Stays', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', desc: 'Gateway to the Johar Valley and Panchachuli view.' },
    { name: 'Kedarkantha', stays: '22+ Stays', image: 'https://images.unsplash.com/photo-1560448204-e02f7c3ad9d2?w=600&h=400&fit=crop', desc: 'Snow trekking hub with magical pine forests.' },
  ]

  return (
    <section className="py-20 bg-background border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              Explore Popular Destinations
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Handpicked locations offering unmatched natural beauty, hiking trails, and cozy homestays.
            </p>
          </div>
          <Link href="/homestays" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm">
            <span>Browse all destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative h-[380px] rounded-[24px] overflow-hidden border border-border bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Text info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left">
                <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full w-max mb-2 backdrop-blur-md">
                  {dest.stays}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-primary transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {dest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 2. Travel Blog Component
export function TravelBlog() {
  const blogs = [
    {
      title: 'A Complete Travel Guide to Chopta (2026 Edition)',
      excerpt: 'Discover the best trekking routes, hidden viewpoints, and local homestays in the mini-Switzerland of India.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      category: 'Trekking Guides',
      date: 'June 18, 2026',
      readTime: '5 min read',
    },
    {
      title: 'Responsible Eco-Tourism in the Himalayas',
      excerpt: 'How homestays are helping local mountain economies conserve natural resources while sharing heritage.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
      category: 'Eco Travel',
      date: 'May 24, 2026',
      readTime: '7 min read',
    },
    {
      title: 'Top Traditional Himalayan Foods You Must Try',
      excerpt: 'From Kumaoni Raita to Gahat ki Dal, explore the flavors of local Uttarakhand kitchens prepared by your hosts.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      category: 'Food & Culture',
      date: 'April 10, 2026',
      readTime: '4 min read',
    },
  ]

  return (
    <section id="blog" className="py-20 bg-muted/30 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            From The Travel Blog
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Himalayan travel guides, sustainable tourism stories, and recipes directly from our local hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left"
            >
              <div className="h-52 overflow-hidden bg-muted">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-4 mb-2 hover:text-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-4 border-t border-border/60 font-semibold mt-auto">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3. FAQ Section Component
export function FAQSection() {
  const faqs = [
    { q: 'How does booking a homestay work?', a: 'Browse our collection, select your dates and number of guests, and confirm your booking. Once confirmed, you will receive a WhatsApp/email notification with your host’s direct contact information and directions.' },
    { q: 'Is Himalayan food included in my booking?', a: 'Yes! Most of our homestays include local authentic breakfasts and dinners in their nightly rates. You can also order custom traditional Kumaoni/Garhwali meals at a very nominal price.' },
    { q: 'Are amenities like hot water and heaters available?', a: 'Yes, while mountain resources are precious, all our premium homestays are equipped with geysers or traditional wood-fired water heating systems. Room heaters can also be provided upon request.' },
    { q: 'What is the cancellation policy?', a: 'We offer free cancellation up to 7 days before check-in for a 100% refund. Cancellations made within 7 days are subject to a 50% charge to support the host family who prepared for your arrival.' },
    { q: 'Can I book custom local treks and experiences?', a: 'Absolutely! Our hosts can connect you with certified local guides for trekking, village walks, bonfire nights, and cultural culinary workshops. You can add these during step 2 of the booking wizard.' },
  ]

  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-20 bg-background border-t border-border/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Got questions about stays, bookings, and policies? We have answers.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-bold text-foreground text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-border/40 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// 4. Newsletter Component
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      setIsSubmitted(true)
      setEmail('')
    }, 1200)
  }

  return (
    <section className="py-20 bg-background border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-primary to-emerald-600 px-8 py-12 md:p-16 text-white text-center shadow-xl">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Join Our Travel Newsletter
            </h2>
            <p className="text-green-100 text-sm sm:text-base mb-8 leading-relaxed">
              Get exclusive member discounts, hidden trail itineraries, and homestay openings directly in your inbox. No spam, ever.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-grow px-5 py-4 rounded-2xl bg-white text-slate-900 border-none focus:outline-none placeholder:text-slate-400 font-medium text-sm focus:ring-4 focus:ring-white/20 transition-all outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-950 font-bold rounded-2xl text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isPending ? 'Subscribing...' : 'Subscribe'}
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 border border-white/20 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">Thank you! You are subscribed.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
