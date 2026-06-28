'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, History, Sparkles, MapPin, X, Laptop } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { searchHomestays } from '@/lib/api'

interface SearchResult {
  id: string
  title: string
  category: 'homestays' | 'experiences' | 'blogs'
  url: string
  subtitle?: string
}

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [history, setHistory] = useState<string[]>([
    'Chopta Trekking',
    'Mountain cottage with heater',
    'Homestays in Auli',
  ])
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Mock Database
  const mockDatabase: SearchResult[] = [
    { id: '1', title: 'Mountain View Villa', category: 'homestays', url: '/homestays/1', subtitle: 'Chopta, Uttarakhand' },
    { id: '2', title: 'Cozy Valley Homestay', category: 'homestays', url: '/homestays/2', subtitle: 'Auli, Uttarakhand' },
    { id: '3', title: 'Himalayan Retreat', category: 'homestays', url: '/homestays/3', subtitle: 'Munsiyari, Uttarakhand' },
    { id: 'e1', title: 'Mountain Trekking Experience', category: 'experiences', url: '/experiences', subtitle: 'Guided Chopta Trails' },
    { id: 'e2', title: 'Bonfire & Folk Music Night', category: 'experiences', url: '/experiences', subtitle: 'Evening local storytelling' },
    { id: 'b1', title: 'Best Time to Visit Chopta', category: 'blogs', url: '/#blog', subtitle: 'Travel guide & tips' },
    { id: 'b2', title: 'Top 5 Eco Homestays in Uttarakhand', category: 'blogs', url: '/#blog', subtitle: 'Responsible tourism list' },
  ]

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timeout = setTimeout(async () => {
      try {
        const data = await searchHomestays(query)
        const formatted = data.map(item => ({
          id: item.id,
          title: item.title,
          category: 'homestays' as const,
          url: `/homestays/${item.id}`,
          subtitle: item.location
        }))
        setResults(formatted)
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleItemClick = (url: string, title: string) => {
    if (!history.includes(title)) {
      setHistory((prev) => [title, ...prev.slice(0, 4)])
    }
    router.push(url)
    onClose()
  }

  const activateVoiceSearch = () => {
    setIsListening(true)
    setTimeout(() => {
      setQuery('Chopta')
      setIsListening(false)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80"
        />

        {/* Search Modal */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-4 border-b border-border gap-3 bg-muted/40">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, homestays, travel blogs..."
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none text-base outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 hover:bg-muted text-muted-foreground rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={activateVoiceSearch}
              className={`p-2 rounded-xl border border-border text-muted-foreground transition-all active:scale-95 ${
                isListening ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' : 'hover:bg-muted hover:text-foreground'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs font-semibold text-muted-foreground">
              <span className="text-[10px]">ESC</span>
            </div>
          </div>

          {/* Voice Search Feedback */}
          {isListening && (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
              <div className="flex gap-1.5 justify-center items-end h-8">
                {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={{ height: [12, 32, 12] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.1 }}
                    className="w-1.5 bg-primary rounded-full"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm font-medium animate-pulse">Listening for voice query...</p>
            </div>
          )}

          {/* Results/Suggestions */}
          {!isListening && (
            <div className="max-h-[350px] overflow-y-auto p-4 space-y-6">
              {isLoading ? (
                <div className="space-y-3 py-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 items-center animate-pulse">
                      <div className="w-10 h-10 bg-muted rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Search Results</h3>
                  <div className="space-y-1">
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.url, item.title)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 border border-transparent hover:border-primary/10 group transition-all text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                            {item.category[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{item.title}</p>
                            {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted group-hover:bg-primary group-hover:text-white px-2.5 py-1 rounded-md transition-colors capitalize font-medium">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : query ? (
                <div className="text-center py-10">
                  <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">No matches found</p>
                  <p className="text-sm text-muted-foreground">Try typing another location or checking your spelling.</p>
                </div>
              ) : (
                <>
                  {/* Recent History */}
                  {history.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" />
                          Recent Searches
                        </h3>
                        <button onClick={() => setHistory([])} className="text-xs text-muted-foreground hover:text-red-500 transition-colors">
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-1">
                        {history.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuery(term)
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted text-foreground text-sm font-medium text-left"
                          >
                            <span className="truncate">{term}</span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Search</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Popular Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Chopta Uttarakhand', 'Auli Luxury Cabin', 'Munsiyari Homestays', 'Local Village Trekking', 'Himalayan Homestays'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3.5 py-1.5 bg-muted hover:bg-primary hover:text-white rounded-full text-xs font-semibold text-foreground/80 transition-all active:scale-95"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Footer Info */}
          <div className="px-4 py-3 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              Press <span className="bg-muted px-1.5 py-0.5 border border-border rounded font-bold">↵</span> to select
            </span>
            <span className="flex items-center gap-1">
              Press <span className="bg-muted px-1.5 py-0.5 border border-border rounded font-bold">Esc</span> to dismiss
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
