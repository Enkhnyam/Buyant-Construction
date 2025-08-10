'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LogOut, User, Shield, Home, Building2, Wrench, Star, Image, BarChart3 } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ name?: string; username?: string } | null>(null)

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login'

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        setIsAuthenticated(true)
      } else {
        // Redirect to login if not authenticated
        router.push('/admin/login')
        return
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
      return
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Don't check auth for login page
    if (isLoginPage) {
      setIsLoading(false)
      return
    }
    checkAuth()
  }, [isLoginPage])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setUser(null)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigation = [
    { name: getText('Хяналтын самбар', 'Dashboard'), href: '/admin', icon: BarChart3 },
    { name: getText('Төслүүд', 'Projects'), href: '/admin/projects', icon: Building2 },
    { name: getText('Үйлчилгээнүүд', 'Services'), href: '/admin/services', icon: Wrench },
    { name: getText('Сэтгэгдлүүд', 'Testimonials'), href: '/admin/testimonials', icon: Star },
    { name: getText('Медиа сан', 'Media Library'), href: '/admin/media', icon: Image },
  ]

  function getText(mn: string, en: string) {
    return language === 'mn' ? mn : en
  }

  // If we're on the login page, just render the children without the admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Buyant Construction
              </h1>
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>{getText('Админ хэсэг', 'Admin Panel')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.name || user?.username}</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={getText('Үндсэн хуудас руу буцах', 'Back to main site')}
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title={getText('Гарах', 'Logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
