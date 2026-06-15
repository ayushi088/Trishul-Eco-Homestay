'use client'

import Link from 'next/link'
import { Mountain, Phone, Mail, MapPin, Heart, Star, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#0B6B4A' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Column 1: Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6" />
              <span className="text-xl font-bold">Trishul</span>
            </div>
            <p className="text-sm text-green-100">
              Premium Direct Booking Platform
            </p>
            <p className="text-sm text-green-100">
              Supporting Local Mountain Communities
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-100 hover:text-white transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-green-100 hover:text-white transition text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-green-100 hover:text-white transition text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <p className="text-green-100 text-sm">Chopta, Uttarakhand, India</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <p className="text-green-100 text-sm">+91 9876543210</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@trishulhomestays.com" className="text-green-100 hover:text-white text-sm">
                  info@trishulhomestays.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <Star className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8" />

        {/* Copyright */}
        <div className="text-center text-green-100 text-sm">
          © {currentYear} Trishul Eco-Homestays. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
