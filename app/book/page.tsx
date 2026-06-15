'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Calendar, Users, Home, ArrowRight } from 'lucide-react'

export default function BookPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomPreference: '',
    specialRequests: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking:', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book Your Stay
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill in the details below to reserve your Himalayan experience
            </p>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Personal Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Personal Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Dates */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-primary" />
                      Your Dates
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Preferences */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      Preferences
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Number of Guests
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num} guest{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Room Preference
                        </label>
                        <select
                          name="roomPreference"
                          value={formData.roomPreference}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                          required
                        >
                          <option value="">Select a room type</option>
                          <option value="single">Single Room</option>
                          <option value="double">Double Room</option>
                          <option value="family">Family Suite</option>
                          <option value="deluxe">Deluxe Villa</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Any special requirements or requests?"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input min-h-24 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                  >
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Home className="w-6 h-6 text-primary" />
                  Summary
                </h2>

                <div className="space-y-4 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nightly Rate</span>
                    <span className="font-semibold text-foreground">₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of Nights</span>
                    <span className="font-semibold text-foreground">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">-</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-semibold text-foreground">TBD</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">TBD</span>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    You won&apos;t be charged until you confirm the booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
