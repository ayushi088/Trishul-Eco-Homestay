'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, User, Bot, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Message {
  sender: 'ai' | 'user'
  text: string
  time: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am your Trishul AI assistant. How can I help you plan your Himalayan homestay experience today?',
      time: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const suggestions = [
    'How do I get to Chopta?',
    'Suggest a 3-day budget plan',
    'Which homestay has the best view?',
    'Are pets allowed in retreats?',
  ]

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const newMsg: Message = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response logic
    setTimeout(() => {
      let responseText = "That's a great question! Trishul homestays are located in pristine eco-zones. Let me check the details for you..."
      const lowerText = text.toLowerCase()

      if (lowerText.includes('chopta')) {
        responseText = 'Chopta is located at an altitude of 2,680m in Uttarakhand. You can reach by flying to Dehradun (Jolly Grant Airport) or taking a train to Rishikesh/Haridwar, then taking a taxi. Our "Mountain View Cottage" in Chopta is highly recommended!'
      } else if (lowerText.includes('budget') || lowerText.includes('itinerary') || lowerText.includes('plan')) {
        responseText = 'A great 3-day itinerary: Day 1: Reach Sari/Deoriatal homestay. Day 2: Trek to Chopta & Tungnath temple (highest Shiva temple). Day 3: Culinary session with host and village walk. We recommend "Forest Retreat" in Auli (₹1,800/night).'
      } else if (lowerText.includes('view') || lowerText.includes('best')) {
        responseText = 'For the best Himalayan views, "Mountain View Cottage" in Chopta offers panoramic sunrise sights right from the bedroom window. It has a 4.8★ rating!'
      } else if (lowerText.includes('pet')) {
        responseText = 'Yes, pets are allowed in most cottage listings like the "Forest Retreat" and "Mountain View Cottage". Make sure to review the house rules before booking!'
      } else if (lowerText.includes('book')) {
        responseText = 'Booking is simple! Head to our [Homestays Listing](/homestays) page, select a homestay, specify dates, and proceed with the secure checkout wizard.'
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-toggle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer border border-primary-dark/25 relative group"
            title="Ask Trishul AI"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[360px] sm:w-[400px] h-[520px] bg-card border border-border rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm tracking-wide">Trishul AI Companion</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-green-100 uppercase tracking-wide">AI Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3.5 rounded-[18px] text-left text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none font-medium'
                        : 'bg-card border border-border text-foreground rounded-tl-none leading-relaxed'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block mt-1.5 font-bold ${
                        msg.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold uppercase">
                      U
                    </div>
                  )}
                </div>
              ))}

              {/* Typing state */}
              {isTyping && (
                <div className="flex gap-2.5 items-start justify-start">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-card border border-border p-3.5 rounded-[18px] rounded-tl-none flex items-center gap-1.5 h-10">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions list (only shown initially or if query is empty) */}
            {messages.length === 1 && !isTyping && (
              <div className="p-3 border-t border-border bg-card">
                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mb-2 text-left">Suggested Questions</p>
                <div className="flex flex-col gap-1.5 text-left">
                  {suggestions.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-3 py-1.5 bg-muted/60 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/20 text-xs font-semibold rounded-xl text-foreground/80 transition-colors w-full truncate"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-border bg-card flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputValue)
                }}
                placeholder="Ask me anything..."
                className="flex-grow bg-input border border-border rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-primary/50 text-foreground"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
