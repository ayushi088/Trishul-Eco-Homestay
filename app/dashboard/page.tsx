'use client'

import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import {
  Home,
  Calendar,
  Heart,
  Star,
  Bell,
  LogOut,
  Settings,
  ChevronRight,
} from 'lucide-react'

const TABS = [
  { id: 'bookings', name: 'My Bookings', icon: Calendar },
  { id: 'wishlist', name: 'Wishlist', icon: Heart },
  { id: 'reviews', name: 'My Reviews', icon: Star },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'settings', name: 'Settings', icon: Settings },
]

const MY_BOOKINGS = [
  {
    id: 1,
    title: 'Mountain View Villa',
    location: 'Chopta',
    checkIn: '2024-07-15',
    checkOut: '2024-07-20',
    guests: 4,
    price: 12500,
    status: 'CONFIRMED',
    image: 'https://images.unsplash.com/photo-1584488289688-210e890b900d?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Cozy Valley Homestay',
    location: 'Auli',
    checkIn: '2024-08-10',
    checkOut: '2024-08-15',
    guests: 2,
    price: 9000,
    status: 'PENDING',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&h=200&fit=crop',
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [userName] = useState('John Doe')
  const [userEmail] = useState('john@example.com')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-300'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl shadow-md p-6 border border-border sticky top-24">
              {/* User Info */}
              <div className="mb-8 pb-8 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-1">
                  {userName}
                </h2>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                {TABS.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Logout */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === 'bookings' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  My Bookings
                </h1>

                {MY_BOOKINGS.length > 0 ? (
                  <div className="space-y-4">
                    {MY_BOOKINGS.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6"
                      >
                        {/* Image */}
                        <div className="sm:w-40 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-foreground">
                                {booking.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {booking.location}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Check-in
                              </p>
                              <p className="font-semibold text-foreground">
                                {booking.checkIn}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Check-out
                              </p>
                              <p className="font-semibold text-foreground">
                                {booking.checkOut}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Guests
                              </p>
                              <p className="font-semibold text-foreground">
                                {booking.guests}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Total Price
                              </p>
                              <p className="font-semibold text-primary">
                                ₹{booking.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                              View Details
                            </button>
                            <button className="flex-1 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                              Cancel Booking
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-4">
                      No bookings yet
                    </p>
                    <a
                      href="/homestays"
                      className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Browse Homestays
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  My Wishlist
                </h1>
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-4">
                    No wishlist items yet
                  </p>
                  <a
                    href="/homestays"
                    className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Explore Homestays
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  My Reviews
                </h1>
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-4">
                    No reviews yet
                  </p>
                  <p className="text-muted-foreground">
                    Complete a stay to leave a review
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  Notifications
                </h1>
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No notifications
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  Settings
                </h1>
                <div className="bg-card rounded-2xl shadow-md p-6 space-y-6">
                  {/* Profile Settings */}
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Profile Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userName}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={userEmail}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                        />
                      </div>
                      <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Change Password
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                        />
                      </div>
                      <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
