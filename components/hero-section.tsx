'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <motion.div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop')`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: '80px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dynamic Overlay: Subtle white overlay in light mode, dark overlay in dark mode */}
      <div className="absolute inset-0 bg-white/55 dark:bg-black/65 transition-colors duration-300" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading - EXACTLY two lines with improved contrast */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-950 dark:text-white drop-shadow-sm transition-colors"
          variants={itemVariants}
        >
          Experience the Soul of
          <br />
          Chopta
        </motion.h1>

        {/* Subtitle with strong contrast */}
        <motion.p
          className="text-lg md:text-xl text-slate-800 dark:text-slate-200 mb-8 max-w-2xl mx-auto drop-shadow-sm leading-relaxed transition-colors"
          variants={itemVariants}
        >
          Stay with local families, wake up to Himalayan views, and create unforgettable memories.
        </motion.p>

        {/* Scroll to Explore */}
        <motion.div className="mb-12" variants={itemVariants}>
          <p className="text-sm font-semibold text-slate-700 dark:text-white/80 tracking-widest uppercase mb-3 transition-colors">
            Scroll to Explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-slate-800 dark:text-white/90 mx-auto transition-colors" />
          </motion.div>
        </motion.div>

        {/* Buttons with improved states */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/book"
              className="inline-block px-8 py-3 font-semibold text-white rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Book Your Stay
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/experiences"
              className="inline-block px-8 py-3 font-semibold text-slate-900 dark:text-white bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 border-2 border-slate-900 dark:border-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            >
              Explore Experiences
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
