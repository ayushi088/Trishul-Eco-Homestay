'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '@/context/booking-context'
import { Calendar, Users, Home, ArrowRight, ArrowLeft, CheckCircle, ShieldAlert, Sparkles, Receipt, Download, MailCheck, ShieldCheck } from 'lucide-react'

export default function BookPage() {
  const { booking, updateBooking, resetBooking } = useBooking()
  const [step, setStep] = useState(1)

  // Step 1 Form Data
  const [fullName, setFullName] = useState(booking.guestName || '')
  const [email, setEmail] = useState(booking.guestEmail || '')
  const [phone, setPhone] = useState(booking.guestPhone || '')
  const [checkIn, setCheckIn] = useState(booking.checkIn ? new Date(booking.checkIn).toISOString().split('T')[0] : '')
  const [checkOut, setCheckOut] = useState(booking.checkOut ? new Date(booking.checkOut).toISOString().split('T')[0] : '')
  const [guests, setGuests] = useState(booking.guests ? booking.guests.toString() : '2')

  // Step 2 Perks Data
  const [insurance, setInsurance] = useState(false)
  const [guide, setGuide] = useState(false)
  const [meals, setMeals] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [discountCodeApplied, setDiscountCodeApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Step 3 Payment details
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Pricing calculations
  const nightlyRate = 2500
  let nightsCount = 1
  if (checkIn && checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = end.getTime() - start.getTime()
    nightsCount = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const subtotal = nightlyRate * nightsCount
  const insuranceFee = insurance ? 250 * parseInt(guests) : 0
  const guideFee = guide ? 1200 * nightsCount : 0
  const mealsFee = meals ? 600 * nightsCount * parseInt(guests) : 0
  
  const rawTotal = subtotal + insuranceFee + guideFee + mealsFee
  const discount = discountCodeApplied ? Math.round(rawTotal * 0.1) : 0
  const serviceFee = Math.round((rawTotal - discount) * 0.08)
  const tax = Math.round((rawTotal - discount) * 0.12)
  const finalTotal = rawTotal - discount + serviceFee + tax

  // Handle coupon checks
  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault()
    if (coupon.toUpperCase() === 'TRISHUL10') {
      setDiscountCodeApplied(true)
      setDiscountAmount(discount)
      alert('Coupon Applied! You received a 10% discount.')
    } else {
      alert('Invalid coupon code. Try TRISHUL10')
    }
  }

  // Handle Stripe mock checkout
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(4)
      updateBooking({
        guestName: fullName,
        guestEmail: email,
        guestPhone: phone,
      })
    }, 2000)
  }

  const handleDownloadInvoice = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Wizard Progress Stepper */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider relative">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-border z-0" />
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center gap-1.5">
                <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                  step === s
                    ? 'bg-primary border-primary text-white scale-110 shadow-sm'
                    : step > s
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-card border-border text-muted-foreground'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                <span className={step === s ? 'text-primary font-black' : ''}>
                  {s === 1 ? 'Details' : s === 2 ? 'Perks' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Wizard contents. Width 8 */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card border border-border rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 text-left"
                >
                  <h2 className="text-xl font-extrabold text-foreground">Guest Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john.doe@gmail.com"
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Check In</label>
                        <input
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Check Out</label>
                        <input
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Total Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (fullName && email && phone && checkIn && checkOut) {
                        setStep(2)
                      } else {
                        alert('Please fill out all contact info and stay dates.')
                      }
                    }}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm uppercase"
                  >
                    <span>Add Travel Add-ons</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Perks & Coupon */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card border border-border rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 text-left"
                >
                  <h2 className="text-xl font-extrabold text-foreground">Himalayan Add-ons & Perks</h2>
                  
                  <div className="space-y-4">
                    {/* Insurance */}
                    <label className="flex items-start gap-4 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={insurance}
                        onChange={() => setInsurance(!insurance)}
                        className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-sm text-foreground flex items-center gap-1">Travel Insurance <span className="text-[10px] text-primary uppercase font-bold bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">Highly Recommended</span></p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Protects against mountain emergency evacuations and trip cancellations. (₹250 per guest)</p>
                      </div>
                    </label>

                    {/* Guide */}
                    <label className="flex items-start gap-4 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={guide}
                        onChange={() => setGuide(!guide)}
                        className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-sm text-foreground">Local Guided Trekking Guide</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Accompaniment of a certified local Garhwali trek guide for Tungnath & Chopta trails. (₹1,200 total)</p>
                      </div>
                    </label>

                    {/* Meal Pack */}
                    <label className="flex items-start gap-4 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={meals}
                        onChange={() => setMeals(!meals)}
                        className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-sm text-foreground">Garhwali Meal Package</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Authentic local organic breakfast, lunch, and dinner buffet prepared in wood-fire hearths. (₹600 per guest/night)</p>
                      </div>
                    </label>
                  </div>

                  {/* Coupon widget */}
                  <div className="pt-6 border-t border-border/50">
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Have a discount coupon?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Try: TRISHUL10"
                        className="flex-grow px-4 py-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground uppercase font-semibold"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {discountCodeApplied && (
                      <span className="inline-block mt-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">
                        Code TRISHUL10 applied successfully!
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-4 border border-border hover:bg-muted text-foreground rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    
                    <button
                      onClick={() => setStep(3)}
                      className="flex-grow py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-xs sm:text-sm uppercase tracking-wide"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-card border border-border rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6 text-left"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <h2 className="text-xl font-extrabold text-foreground">Secure Payment Gateway</h2>
                    <span className="text-[10px] text-emerald-600 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      Stripe Encrypted
                    </span>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Expiration Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">CVC / CVV</label>
                        <input
                          type="password"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          placeholder="•••"
                          className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-4 border border-border hover:bg-muted text-foreground rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-grow py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wide"
                      >
                        {isProcessing ? 'Processing payment...' : `Authorize Pay ₹${finalTotal}`}
                        <ShieldCheck className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Confirmation screen */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-card border border-border rounded-[28px] p-8 text-center shadow-xl space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-black text-foreground">Himalayan Booking Confirmed!</h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                      Your stay at Mountain View Cottage has been successfully confirmed. A WhatsApp and Email notification has been dispatched to {email}.
                    </p>
                  </div>

                  {/* Mail & Whatsapp alert simulator */}
                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 text-left max-w-md mx-auto items-center">
                    <MailCheck className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-extrabold text-xs text-foreground">Automated Host Notification Dispatch</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">Host Rajesh Kumar has received your details and is preparing for your check-in on {checkIn}.</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 max-w-md mx-auto">
                    <button
                      onClick={handleDownloadInvoice}
                      className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Print Invoice</span>
                    </button>
                    <button
                      onClick={() => {
                        resetBooking()
                        window.location.href = '/dashboard'
                      }}
                      className="flex-1 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow"
                    >
                      Go to My Dashboard
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Summary sidebar. Column width 4 */}
          {step < 4 && (
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-card border border-border shadow-md rounded-[24px] p-6 space-y-6 text-left">
                <h3 className="font-extrabold text-lg flex items-center gap-2 text-foreground">
                  <Receipt className="w-5 h-5 text-primary" />
                  Stay Summary
                </h3>

                <div className="space-y-4 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1584488289688-210e890b900d?w=200&h=200&fit=crop"
                      className="w-14 h-14 rounded-xl object-cover border border-border"
                      alt=""
                    />
                    <div>
                      <p className="font-bold text-sm text-foreground">Mountain View Villa</p>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase">Chopta, Uttarakhand</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground/60">Check In</p>
                      <p className="text-foreground">{checkIn || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground/60">Check Out</p>
                      <p className="text-foreground">{checkOut || 'TBD'}</p>
                    </div>
                  </div>
                </div>

                {/* Price Summary list */}
                <div className="space-y-2.5 text-xs font-semibold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Rate (₹2,500 x {nightsCount} nights)</span>
                    <span className="text-foreground">₹{subtotal}</span>
                  </div>
                  
                  {insurance && (
                    <div className="flex justify-between">
                      <span>Travel Insurance addon</span>
                      <span className="text-foreground">₹{insuranceFee}</span>
                    </div>
                  )}
                  {guide && (
                    <div className="flex justify-between">
                      <span>Local Trek Guide</span>
                      <span className="text-foreground">₹{guideFee}</span>
                    </div>
                  )}
                  {meals && (
                    <div className="flex justify-between">
                      <span>Garhwali Meals pack</span>
                      <span className="text-foreground">₹{mealsFee}</span>
                    </div>
                  )}

                  {discountCodeApplied && (
                    <div className="flex justify-between text-emerald-500 font-extrabold">
                      <span>10% Coupon discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2.5 border-t border-border/50">
                    <span>SaaS booking fee (8%)</span>
                    <span className="text-foreground">₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST taxes (12%)</span>
                    <span className="text-foreground">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-foreground pt-3 border-t border-border">
                    <span>Final Amount</span>
                    <span className="text-primary">₹{finalTotal}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-muted/60 border border-border/60 rounded-xl text-[10px] text-muted-foreground font-semibold leading-relaxed">
                  <span>Pay with Stripe / credit card simulated verification check. Booking supports local mountain community development.</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}
