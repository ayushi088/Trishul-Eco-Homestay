'use client'

import Link from 'next/link'
import { Mountain, Menu, X, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Mountain className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xl font-bold text-primary">
            Trishul
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
            Home
          </Link>
          <Link href="/homestays" className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
            Homestays
          </Link>
          <Link href="/experiences" className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
            Experiences
          </Link>
          <Link href="/dashboard" className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
            Dashboard
          </Link>
          <Link href="/login" className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
            Login
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-muted text-foreground rounded-lg transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Book Now Button */}
          <Link
            href="/book"
            className="px-6 py-2 rounded-lg font-medium text-white text-sm transition-all duration-200 bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg active:scale-95"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-muted text-foreground rounded-lg transition-colors duration-200"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="absolute top-20 left-0 right-0 bg-background border-b border-border md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/"
                className="block text-foreground/85 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/homestays"
                className="block text-foreground/85 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Homestays
              </Link>
              <Link
                href="/experiences"
                className="block text-foreground/85 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/dashboard"
                className="block text-foreground/85 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="block text-foreground/85 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>

  )
}
