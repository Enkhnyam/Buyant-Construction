'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Menu, X, Globe } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const { language, setLanguage, t, isHydrated } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'mn' ? 'en' : 'mn')
  }

  return (
    <header className="bg-[#F4F2EA] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logoMain.png"
                alt="Буяант Барилга Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
              {isHydrated && (
                <span className="text-xl font-bold text-gray-800">
                  {language === 'mn' ? 'Буяант Барилга' : 'Buyant Construction'}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.href !== '/services') {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#0F425C] hover:text-[#0F425C]/80 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              }

              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-[#0F425C] hover:text-[#0F425C]/80 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-[#0F425C]/10 bg-white shadow-lg py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <Link
                      href="/services/building"
                      className="block px-4 py-2 text-sm text-[#0F425C] hover:bg-gray-50"
                    >
                      {isHydrated && (language === 'mn' ? 'Барилгын үйлчилгээ' : 'Building Service')}
                    </Link>
                    <Link
                      href="/services/legal"
                      className="block px-4 py-2 text-sm text-[#0F425C] hover:bg-gray-50"
                    >
                      {isHydrated && (language === 'mn' ? 'Хуулийн үйлчилгээ' : 'Legal Service')}
                    </Link>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {isHydrated && (
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-[#0F425C] hover:text-[#0F425C]/80 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'mn' ? 'EN' : 'МН'}
                </span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#0F425C] hover:text-[#0F425C]/80 hover:bg-[#0F425C]/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#F4F2EA] border-t border-[#0F425C]/20">
            {navigation.map((item) => {
              if (item.href !== '/services') {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#0F425C] hover:text-[#0F425C]/80 block px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              }

              return (
                <div key={item.name} className="space-y-1">
                  <Link
                    href={item.href}
                    className="text-[#0F425C] hover:text-[#0F425C]/80 block px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <Link
                    href="/services/building"
                    className="text-[#0F425C] hover:text-[#0F425C]/80 block px-5 py-2 text-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isHydrated && (language === 'mn' ? 'Барилгын үйлчилгээ' : 'Building Service')}
                  </Link>
                  <Link
                    href="/services/legal"
                    className="text-[#0F425C] hover:text-[#0F425C]/80 block px-5 py-2 text-sm transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isHydrated && (language === 'mn' ? 'Хуулийн үйлчилгээ' : 'Legal Service')}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
