'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextType {
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    
    // Auto remove after 3.5s
    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const success = (msg: string) => addToast(msg, 'success')
  const error = (msg: string) => addToast(msg, 'error')
  const info = (msg: string) => addToast(msg, 'info')

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      
      {/* Toast container overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success'
            const isError = toast.type === 'error'
            
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`p-4 rounded-2xl border shadow-2xl flex items-start justify-between gap-3 pointer-events-auto bg-card text-left ${
                  isSuccess
                    ? 'border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20'
                    : isError
                    ? 'border-rose-500/25 bg-rose-500/5 dark:bg-rose-950/20'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex gap-3">
                  {isSuccess ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : isError ? (
                    <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs sm:text-sm font-semibold text-foreground leading-normal">
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground p-0.5 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
