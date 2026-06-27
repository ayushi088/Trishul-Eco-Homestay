'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, LogIn, Globe, ShieldAlert, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // OTP Modal State
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [otpCode, setOtpCode] = useState(['', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsOtpOpen(true)
    }
  }

  const handleOtpChange = (index: number, val: string) => {
    const newOtp = [...otpCode]
    newOtp[index] = val.substring(val.length - 1)
    setOtpCode(newOtp)

    // Focus next input automatically
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      const enteredCode = otpCode.join('')
      if (enteredCode === '1234') {
        setIsOtpOpen(false)
        router.push('/dashboard')
      } else {
        alert('Invalid OTP code. Enter 1234 for simulation.')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      {/* Main Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full pt-20">
        
        {/* Left Side: Graphic & Scenic (5 Columns) */}
        <div className="hidden lg:block lg:col-span-5 relative overflow-hidden bg-emerald-950">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-10000 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486046281750-441018d9b21f?w=800&h=1200&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary/50 to-transparent mix-blend-multiply" />
          
          {/* Animated quotes text */}
          <div className="absolute inset-0 flex flex-col justify-between p-12 text-left text-white z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm uppercase tracking-wider">Trishul Premium SaaS</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                Find Your Peace in Chopta Valley.
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-semibold max-w-sm">
                Join our host ecosystem of vetted homestays and experience natural living.
              </p>
            </div>

            <span className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">
              © 2026 Trishul homestays Ltd.
            </span>
          </div>
        </div>

        {/* Right Side: Form (7 Columns) */}
        <div className="lg:col-span-7 flex items-center justify-center p-8 bg-card">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8 text-left"
          >
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
                Welcome Back
                <LogIn className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-semibold">Sign in to manage stays and view analytics dashboards.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@gmail.com"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Authorize Credentials</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border" />
              <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-border" />
            </div>

            {/* Google OAuth mockup button */}
            <button
              onClick={() => {
                setEmail('demo@trishul.com')
                setPassword('Password123')
                setIsOtpOpen(true)
              }}
              className="w-full py-3.5 border border-border hover:bg-muted bg-card text-foreground rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span>Verify with Google Account</span>
            </button>

            <p className="text-xs text-muted-foreground text-center font-semibold pt-4">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary font-bold hover:underline">Register here</a>
            </p>

          </motion.div>
        </div>

      </div>

      {/* OTP Verification Modal Overlay */}
      <AnimatePresence>
        {isOtpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOtpOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-card border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-extrabold text-lg text-foreground mb-1">Enter Verification Code</h3>
              <p className="text-xs text-muted-foreground font-semibold mb-6">A simulated 4-digit code was sent to your phone. (Enter 1234 to log in)</p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex gap-3 justify-center">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otpCode[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-14 bg-input border border-border text-center rounded-xl text-xl font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25"
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOtpOpen(false)}
                    className="flex-1 py-3 border border-border hover:bg-muted text-foreground rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
