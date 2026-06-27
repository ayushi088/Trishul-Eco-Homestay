'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Phone, ArrowRight, Sparkles, ShieldCheck, MailCheck, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  // OTP Modal State
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [otpCode, setOtpCode] = useState(['', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getPasswordStrength = () => {
    const pw = formData.password
    if (!pw) return { label: 'Empty', color: 'bg-slate-200', width: 'w-0' }
    if (pw.length < 5) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' }
    
    // Check numbers and letters
    const hasNumbers = /\D/.test(pw) && /\d/.test(pw)
    const hasCaps = /[A-Z]/.test(pw)
    
    if (pw.length >= 8 && hasNumbers && hasCaps) {
      return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' }
    }
    return { label: 'Fair', color: 'bg-amber-500', width: 'w-2/3' }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.')
      return
    }
    setIsOtpOpen(true)
  }

  const handleOtpChange = (index: number, val: string) => {
    const newOtp = [...otpCode]
    newOtp[index] = val.substring(val.length - 1)
    setOtpCode(newOtp)

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
        alert('Invalid validation code. Enter 1234 to bypass.')
      }
    }, 1500)
  }

  const pwStrength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full pt-20">
        
        {/* Left Side: Scenic Image Column */}
        <div className="hidden lg:block lg:col-span-5 relative overflow-hidden bg-emerald-950">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-10000 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=800&h=1200&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary/50 to-transparent mix-blend-multiply" />
          
          <div className="absolute inset-0 flex flex-col justify-between p-12 text-left text-white z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm uppercase tracking-wider">Trishul Host Community</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                Empowering Himalayan Homestays.
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-semibold max-w-sm">
                Unlock smart pricing models, secure deposits, and direct connections to eco-travelers globally.
              </p>
            </div>

            <span className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">
              © 2026 Trishul homestays Ltd.
            </span>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="lg:col-span-7 flex items-center justify-center p-8 bg-card">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6 text-left"
          >
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
                Create Account
                <User className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-semibold font-sans">Set up your secure profile to begin booking homestays.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@gmail.com"
                    className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none"
                />
                {/* Password strength bar */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden w-full">
                      <div className={`h-full ${pwStrength.color} ${pwStrength.width} transition-all duration-300`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-bold">Strength: {pwStrength.label}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-wider mt-4"
              >
                <span>Register Account</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border" />
              <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-border" />
            </div>

            <button
              onClick={() => {
                setFormData({
                  fullName: 'Demo User',
                  email: 'demo@trishul.com',
                  phone: '+919999988888',
                  password: 'Password123',
                  confirmPassword: 'Password123'
                })
                setIsOtpOpen(true)
              }}
              className="w-full py-3.5 border border-border hover:bg-muted bg-card text-foreground rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span>Sign Up with Google Account</span>
            </button>

            <p className="text-xs text-muted-foreground text-center font-semibold pt-4">
              Already have an account?{' '}
              <a href="/login" className="text-primary font-bold hover:underline">Sign in</a>
            </p>

          </motion.div>
        </div>

      </div>

      {/* Verification OTP Modal */}
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
                <MailCheck className="w-6 h-6" />
              </div>

              <h3 className="font-extrabold text-lg text-foreground mb-1">Verify Email Address</h3>
              <p className="text-xs text-muted-foreground font-semibold mb-6">We sent a 4-digit verification code to your email. (Enter 1234 to verify)</p>

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
                    {isVerifying ? 'Verifying...' : 'Verify Email'}
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
