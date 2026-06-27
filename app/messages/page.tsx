'use client'

import React, { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Image, Search, ShieldCheck, CheckCheck, Smile, Phone, Video, Info, Paperclip, MoreVertical } from 'lucide-react'

interface Message {
  id: string
  sender: 'host' | 'user'
  text?: string
  image?: string
  time: string
}

interface Chat {
  id: string
  name: string
  avatar: string
  online: boolean
  lastSeen?: string
  unread: number
  lastMessage: string
  typing?: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
      online: true,
      unread: 1,
      lastMessage: 'Let me know what time you will arrive.',
      typing: false,
      messages: [
        { id: '1a', sender: 'host', text: 'Hello John! Welcome to Mountain View Cottage.', time: '10:30 AM' },
        { id: '1b', sender: 'user', text: 'Thank you Rajesh! Looking forward to my stay. Is heating included?', time: '10:35 AM' },
        { id: '1c', sender: 'host', text: 'Yes, we have room heaters in all bedrooms and hot water geysers in the bathrooms.', time: '10:36 AM' },
        { id: '1d', sender: 'host', text: 'Let me know what time you will arrive.', time: '10:37 AM' },
      ]
    },
    {
      id: '2',
      name: 'Priya Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      online: false,
      lastSeen: '1 hr ago',
      unread: 0,
      lastMessage: 'The bonfire and local dinner are set for 7 PM.',
      typing: false,
      messages: [
        { id: '2a', sender: 'user', text: 'Hi Priya, does the Forest Retreat package include the bonfire night?', time: 'Yesterday' },
        { id: '2b', sender: 'host', text: 'Yes, we arrange bonfire and local story-sharing. The bonfire and local dinner are set for 7 PM.', time: 'Yesterday' },
      ]
    },
    {
      id: '3',
      name: 'Neha Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
      online: true,
      unread: 0,
      lastMessage: 'Yes, we have parking space inside the villa.',
      typing: false,
      messages: [
        { id: '3a', sender: 'host', text: 'Welcome to Valley Echo! How can I help you?', time: '2 days ago' },
        { id: '3b', sender: 'user', text: 'Is there parking space available?', time: '2 days ago' },
        { id: '3c', sender: 'host', text: 'Yes, we have parking space inside the villa.', time: '2 days ago' },
      ]
    }
  ])

  const [activeChatId, setActiveChatId] = useState('1')
  const [inputText, setInputText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [attachedImage, setAttachedImage] = useState<string | null>(null)
  
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0]
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChat.messages, activeChat.typing])

  // Clear unread badge
  useEffect(() => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, unread: 0 }
      }
      return chat
    }))
  }, [activeChatId])

  const handleSendMessage = () => {
    if (!inputText.trim() && !attachedImage) return

    const newMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText || undefined,
      image: attachedImage || undefined,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Update active chat's message list
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: attachedImage ? 'Shared an image' : (inputText || ''),
          messages: [...chat.messages, newMsg]
        }
      }
      return chat
    }))

    setInputText('')
    setAttachedImage(null)

    // Trigger host response simulator
    setTimeout(() => {
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, typing: true }
        }
        return chat
      }))
    }, 1000)

    setTimeout(() => {
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          const hostReply: Message = {
            id: Math.random().toString(),
            sender: 'host',
            text: `Thanks for the details! I have noted down your request. Let me know if you need anything else.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          return {
            ...chat,
            typing: false,
            lastMessage: hostReply.text || '',
            messages: [...chat.messages, hostReply]
          }
        }
        return chat
      }))
    }, 2800)
  }

  const simulateAttachImage = () => {
    // Simulated image upload
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop'
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    setAttachedImage(randomImage)
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 flex flex-col h-[calc(100vh-80px)]">
        
        {/* Main Panel grid */}
        <div className="flex-1 flex bg-card border border-border rounded-[24px] overflow-hidden shadow-2xl h-full">
          
          {/* Left Chats Sidebar */}
          <div className="w-full md:w-80 border-r border-border flex flex-col bg-muted/20 h-full">
            <div className="p-4 border-b border-border space-y-4">
              <h2 className="text-xl font-extrabold text-foreground text-left">Messages</h2>
              
              {/* Search contacts */}
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-2 space-y-1">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-2xl border border-transparent transition-all text-left ${
                    chat.id === activeChatId
                      ? 'bg-primary/10 border-primary/10 text-primary'
                      : 'hover:bg-muted/50 text-foreground'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                    />
                    {chat.online ? (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                    ) : (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-slate-400 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm truncate ${chat.id === activeChatId ? 'text-primary' : 'text-foreground'}`}>
                        {chat.name}
                      </p>
                      {chat.unread > 0 && (
                        <span className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-medium mt-1 leading-snug">
                      {chat.typing ? (
                        <span className="text-primary font-bold animate-pulse">Typing...</span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                  </div>
                </button>
              ))}
              {filteredChats.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">No chats found</div>
              )}
            </div>
          </div>

          {/* Right Message Window */}
          <div className="hidden md:flex flex-1 flex-col h-full bg-card">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-11 h-11 rounded-xl object-cover"
                  />
                  {activeChat.online ? (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
                  ) : (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-slate-400 rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <p className="font-extrabold text-foreground text-sm tracking-wide">{activeChat.name}</p>
                    <ShieldCheck className="w-4 h-4 text-primary fill-primary/10" title="Verified Host" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold">
                    {activeChat.online ? 'Online now' : `Last active ${activeChat.lastSeen}`}
                  </span>
                </div>
              </div>

              {/* Top actions */}
              <div className="flex items-center gap-1.5">
                <button className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/5">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'host' && (
                    <img src={activeChat.avatar} className="w-8 h-8 rounded-lg object-cover" alt="" />
                  )}
                  <div className="max-w-[65%] text-left">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-none font-medium'
                          : 'bg-card border border-border text-foreground rounded-tl-none leading-relaxed'
                      }`}
                    >
                      {msg.image && (
                        <div className="rounded-lg overflow-hidden mb-2 max-w-sm border border-border/20">
                          <img src={msg.image} alt="Attachment" className="w-full object-cover" />
                        </div>
                      )}
                      {msg.text && <p>{msg.text}</p>}
                    </div>
                    <span className="text-[9px] text-muted-foreground block mt-1.5 font-bold px-1 flex items-center gap-1">
                      {msg.time}
                      {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-primary" />}
                    </span>
                  </div>
                </div>
              ))}

              {/* Host Typing dots */}
              {activeChat.typing && (
                <div className="flex gap-2.5 items-start justify-start">
                  <img src={activeChat.avatar} className="w-8 h-8 rounded-lg object-cover" alt="" />
                  <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-10">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Attachment preview bar */}
            <AnimatePresence>
              {attachedImage && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-3 bg-muted/30 border-t border-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={attachedImage} className="w-12 h-12 rounded-lg object-cover border border-border" alt="" />
                    <div>
                      <p className="text-xs font-bold text-foreground">image_attachment.jpg</p>
                      <span className="text-[10px] text-muted-foreground font-semibold">Ready to send</span>
                    </div>
                  </div>
                  <button onClick={() => setAttachedImage(null)} className="p-1 hover:bg-muted text-muted-foreground rounded-full">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <div className="p-4 border-t border-border bg-card flex gap-3 items-center">
              <button
                onClick={simulateAttachImage}
                className="p-2.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl transition-colors border border-border bg-card"
                title="Attach Simulated Image"
              >
                <Image className="w-4.5 h-4.5" />
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage()
                }}
                placeholder="Type your message here..."
                className="flex-grow bg-input border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary/50"
              />

              <button
                onClick={handleSendMessage}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg shadow-primary/25"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Fallback layout for Mobile Chat selection */}
          <div className="md:hidden flex flex-col flex-1 items-center justify-center p-6 text-center text-muted-foreground">
            Select a host chat from the list to start messaging. Mobile optimization features are live!
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
