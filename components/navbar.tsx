'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mountain, Menu, X, Moon, Sun, Bell, User, Search, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import GlobalSearch from './global-search'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Booking Confirmed: Mountain View cottage is ready!', time: '2 mins ago', read: false },
    { id: 2, text: 'Special Offer: 10% off on Chopta homestays with code TRISHUL10', time: '1 hour ago', read: false },
    { id: 3, text: 'Local Host Rajesh sent you check-in guidelines.', time: '5 hours ago', read: true },
  ])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Homestays', href: '/homestays' },
    { name: 'AI Planner', href: '/ai-planner' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Mountain className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Trishul
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-muted/30 p-1.5 rounded-full border border-border">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute inset-0 bg-primary rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all text-xs font-semibold"
            >
              <div className="flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                <span>Search...</span>
              </div>
              <span className="bg-background text-muted-foreground border border-border px-1.5 py-0.5 rounded font-bold">Ctrl K</span>
            </button>
            
            <button
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-2.5 rounded-xl bg-muted/40 hover:bg-muted border border-border text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Center */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95`}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
                      <span className="font-bold text-sm text-foreground">Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary font-semibold hover:underline">
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3.5 border-b border-border last:border-b-0 hover:bg-muted/40 transition-colors ${
                            !n.read ? 'bg-primary/5 dark:bg-primary/10' : ''
                          }`}
                        >
                          <p className="text-xs text-foreground font-semibold leading-normal">{n.text}</p>
                          <span className="text-[10px] text-muted-foreground block mt-1 font-semibold">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 bg-card hover:bg-muted border border-border text-foreground rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-xl overflow-hidden border border-border focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all duration-200 hover:scale-105"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-2xl shadow-xl z-50 p-2 space-y-1"
                  >
                    <div className="px-3 py-2 border-b border-border mb-1 text-left">
                      <p className="font-bold text-sm text-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground truncate">john.doe@eco-stay.com</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl text-foreground hover:bg-muted transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">My Dashboard</span>
                    </Link>
                    <Link
                      href="/dashboard?tab=settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl text-foreground hover:bg-muted transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">Settings</span>
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Drawer Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 bg-card hover:bg-muted border border-border text-foreground rounded-xl transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-20 left-0 right-0 bg-background border-b border-border md:hidden shadow-lg overflow-hidden z-40 transition-colors duration-300"
            >
              <div className="px-6 py-4 space-y-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                      pathname === link.href
                        ? 'bg-primary text-white'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/book"
                  className="block text-center py-3 bg-primary text-white rounded-xl text-sm font-bold shadow hover:bg-primary-dark transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Global K modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
