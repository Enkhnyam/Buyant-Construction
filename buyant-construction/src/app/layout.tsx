import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buyant Construction - Монголын гэр бүлийн барилгын үйлчилгээ',
  description: 'Professional construction services and legal consultation in Mongolia. Full-service home building and legal documentation services.',
  keywords: 'construction, Mongolia, legal services, residential building, А маягт, барилга, хуулийн үйлчилгээ',
  authors: [{ name: 'Buyant Construction Team' }],
  icons: {
    icon: [
      { url: '/logoMainRound.png', type: 'image/png' },
      { url: '/logoMainRound.png', type: 'image/png', sizes: '32x32' },
      { url: '/logoMainRound.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/logoMainRound.png',
    apple: '/logoMainRound.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Buyant Construction - Монголын гэр бүлийн барилгын үйлчилгээ',
    description: 'Professional construction services and legal consultation in Mongolia',
    type: 'website',
    locale: 'mn_MN',
    alternateLocale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
