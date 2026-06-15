'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <User className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
              <p className="text-muted-foreground mt-2">Join Trishul Eco Homestays</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
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

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Email Address
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Phone Number
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

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                  required
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border mt-0.5"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to the{' '}
                  <a href="/terms" className="text-primary hover:text-primary-dark">
                    Terms & Conditions
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center text-sm mt-6">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
