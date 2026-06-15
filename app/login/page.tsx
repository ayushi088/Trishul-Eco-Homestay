'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { email, password })
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
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Sign in to your Trishul account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span className="text-foreground">Remember me</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <a
                href="/register"
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Sign up here
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
