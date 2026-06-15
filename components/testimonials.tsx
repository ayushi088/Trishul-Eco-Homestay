'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Our stay at Trishul was absolutely incredible! The family was so welcoming and the views were breathtaking. We felt like we were part of the family.',
  },
  {
    id: 2,
    name: 'Raj Patel',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The authentic experience of staying in a local Himalayan home was unforgettable. Highly recommend for anyone looking for a genuine mountain experience.',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 4,
    text: 'Beautiful location, amazing food, and incredibly kind hosts. This was the perfect escape from city life. We&apos;ll definitely be coming back!',
  },
  {
    id: 4,
    name: 'Arjun Singh',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Trishul helped us plan the perfect family vacation. The staff was incredibly helpful and the homestay exceeded all expectations.',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    )
  }

  const currentTestimonial = TESTIMONIALS[currentIndex]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/5 transition-colors duration-300">
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
            Loved By <span className="text-primary">Mountain Explorers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our happy guests about their unforgettable experiences.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg min-h-[16rem] flex flex-col justify-between"
              >
                <div>
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: currentTestimonial.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed italic font-medium tracking-wide">
                    &quot;{currentTestimonial.text}&quot;
                  </p>
                </div>

                {/* Guest Info */}
                <div className="flex items-center gap-4 border-t border-border/60 pt-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/45 border-2 border-background shadow-md"
                  />
                  <div>
                    <p className="font-bold text-foreground text-base tracking-wide">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Verified Guest</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={goToPrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Indicators */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary w-8 shadow-sm'
                        : 'bg-primary/20 dark:bg-primary/30 w-2.5'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
