'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  Users,
  DollarSign,
  Headphones,
  Sparkles,
} from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verified Homestays',
    description: 'Every homestay is carefully vetted and verified for quality and authenticity.',
  },
  {
    icon: Lock,
    title: 'Secure Booking',
    description: 'Your bookings are protected with our secure payment system and guarantee.',
  },
  {
    icon: Users,
    title: 'Local Hosts',
    description: 'Connect directly with local families who share their culture and stories.',
  },
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'We promise the lowest prices for authentic Himalayan homestays.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is always ready to help you.',
  },
  {
    icon: Sparkles,
    title: 'Authentic Experiences',
    description: 'Create unforgettable memories with genuine Himalayan hospitality.',
  },
]

export default function WhyChooseTrishul() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Trishul?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to providing the best homestay experience in the Himalayas.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-8 md:p-10 rounded-2xl bg-card bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/5 shadow-md hover:shadow-xl border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 border border-primary/25 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Active Homestays', value: '150+' },
            { label: 'Happy Travelers', value: '5000+' },
            { label: 'Destinations', value: '25+' },
            { label: 'Avg Rating', value: '4.8⭐' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-card border border-border bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
