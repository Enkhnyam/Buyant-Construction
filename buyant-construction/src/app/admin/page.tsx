'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  Wrench, 
  Star, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image,
  Settings,
  BarChart3
} from 'lucide-react'

interface DashboardStats {
  projects: number
  services: number
  testimonials: number
  contacts: number
  totalImages: number
}

interface RecentContact {
  id: number
  name: string
  email: string
  service: string
  createdAt: string
}

export default function AdminDashboard() {
  const { language } = useLanguage()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    services: 0,
    testimonials: 0,
    contacts: 0,
    totalImages: 0
  })
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await fetch('/api/admin/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent contacts
      const contactsResponse = await fetch('/api/admin/recent-contacts')
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json()
        setRecentContacts(contactsData.contacts)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-project':
        router.push('/admin/projects')
        break
      case 'new-service':
        router.push('/admin/services')
        break
      case 'new-testimonial':
        router.push('/admin/testimonials')
        break
      case 'media-library':
        router.push('/admin/media')
        break
      default:
        break
    }
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {getText('Админ хэсэг', 'Admin Dashboard')}
        </h1>
        <p className="mt-2 text-gray-600">
          {getText(
            'Буянт Барилгын удирдлагын хэсэгт тавтай морил',
            'Welcome to Buyant Construction management panel'
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Төслүүд', 'Projects')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Wrench className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Үйлчилгээнүүд', 'Services')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Сэтгэгдэл', 'Testimonials')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.testimonials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Холбоо барих', 'Contacts')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.contacts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Image className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Зурагнууд', 'Images')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Хурдан үйлдлүүд', 'Quick Actions')}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('new-project')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
            >
              <Plus className="h-5 w-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">
                {getText('Шинэ төсөл', 'New Project')}
              </span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('new-service')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors group"
            >
              <Plus className="h-5 w-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">
                {getText('Шинэ үйлчилгээ', 'New Service')}
              </span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('new-testimonial')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors group"
            >
              <Plus className="h-5 w-5 text-yellow-600 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">
                {getText('Шинэ сэтгэгдэл', 'New Testimonial')}
              </span>
            </button>
            
            <button 
              onClick={() => handleQuickAction('media-library')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
            >
              <Image className="h-5 w-5 text-indigo-600 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">
                {getText('Медиа сан', 'Media Library')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Management */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {getText('Контент удирдлага', 'Content Management')}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {getText('Төслүүд', 'Projects')}
                  </span>
                </div>
                <button 
                  onClick={() => router.push('/admin/projects')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {getText('Удирдах', 'Manage')} →
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {getText('Үйлчилгээнүүд', 'Services')}
                  </span>
                </div>
                <button 
                  onClick={() => router.push('/admin/services')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  {getText('Удирдах', 'Manage')} →
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    {getText('Сэтгэгдлүүд', 'Testimonials')}
                  </span>
                </div>
                <button 
                  onClick={() => router.push('/admin/testimonials')}
                  className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                >
                  {getText('Удирдах', 'Manage')} →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {getText('Системийн төлөв', 'System Status')}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {getText('Систем', 'System')}
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {getText('Идэвхтэй', 'Active')}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {getText('База', 'Database')}
                  </span>
                </div>
                <span className="text-sm text-blue-600 font-medium">
                  {getText('Холбогдсон', 'Connected')}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {getText('Хэрэглэгч', 'User')}
                  </span>
                </div>
                <span className="text-sm text-purple-600 font-medium">
                  {getText('Нэвтэрсэн', 'Logged In')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Сүүлийн холбоо барих', 'Recent Contacts')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Нэр', 'Name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('И-мэйл', 'Email')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үйлчилгээ', 'Service')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Огноо', 'Date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үйлдэл', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentContacts.length > 0 ? (
                recentContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title={getText('Харах', 'View')}>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title={getText('Засах', 'Edit')}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title={getText('Устгах', 'Delete')}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {getText('Сүүлийн холбоо барих байхгүй байна', 'No recent contacts')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
