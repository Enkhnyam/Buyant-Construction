import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Буянт амины орон сууц - Амины орон сууцны зарын үйлчилгээ',
  description: 'Амины орон сууцны зарын үйлчилгээ - Буянт амины орон сууц',
  authors: [{ name: 'Буянт амины орон сууц Team' }],
  keywords: ['барилга', 'construction', 'mongolia', 'mongol', 'buyant', 'буяант'],
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
    title: 'Буянт амины орон сууц - Амины орон сууцны зарын үйлчилгээ',
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
      <body className={inter.className} suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
