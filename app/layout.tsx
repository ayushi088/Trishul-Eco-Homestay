import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { BookingProvider } from '@/context/booking-context'
import AIChatbot from '@/components/ai-chatbot'
import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trishul Eco Homestays | Himalayan Stays',
  description: 'Experience authentic Himalayan homestays with Trishul Eco Homestays. Book your stay, connect with local families, and create unforgettable memories.',
  generator: 'v0.app',
  keywords: 'homestay, booking, himalayan, chopta, eco-tourism, accommodation',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F8A5F' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BookingProvider>
            {children}
            <AIChatbot />
          </BookingProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
