'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Mountain, Flame, Tent, TreePine, ChefHat, Bird } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 1,
    title: 'Mountain Trekking',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Explore stunning mountain trails with experienced guides.',
    activities: ['Guided hikes', 'Peak exploration', 'Sunrise treks', 'Photography'],
  },
  {
    id: 2,
    title: 'Bonfire & Camping',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=400&fit=crop',
    description: 'Enjoy cozy nights around the bonfire under starry skies.',
    activities: ['Campfire', 'Stargazing', 'Songs & stories', 'Starry nights'],
  },
  {
    id: 3,
    title: 'Adventure Camping',
    icon: Tent,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=400&fit=crop',
    description: 'Experience the thrill of camping in the Himalayas.',
    activities: ['Tent camping', 'Outdoor cooking', 'Adventure sports', 'Nature walks'],
  },
  {
    id: 4,
    title: 'Village Exploration',
    icon: TreePine,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Walk through local villages and experience authentic culture.',
    activities: ['Village tours', 'Local markets', 'Cultural exchange', 'Photography'],
  },
  {
    id: 5,
    title: 'Local Cuisine',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop',
    description: 'Learn to cook and enjoy authentic Himalayan meals.',
    activities: ['Cooking class', 'Farm to table', 'Local dishes', 'Food tasting'],
  },
  {
    id: 6,
    title: 'Bird Watching',
    icon: Bird,
    image: 'https://images.unsplash.com/photo-1444464666175-1cff94c84212?w=500&h=400&fit=crop',
    description: 'Discover the rich birdlife of the Himalayan regions.',
    activities: ['Guided tours', 'Photography', 'Nature walks', 'Species spotting'],
  },
]

export default function ExperiencesPage() {
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Himalayan Experiences
          </h1>
          <p className="text-green-100">
            Discover unique activities and adventures
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-border transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${exp.image}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    {/* Activities */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">
                        Includes:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <button className="w-full mt-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
