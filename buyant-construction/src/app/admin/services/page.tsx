'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Wrench,
  CheckCircle
} from 'lucide-react'

interface Service {
  id: number
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  shortDescriptionMn: string
  shortDescriptionEn: string
  icon: string
  order: number
  active: boolean
}

interface ServiceFormData {
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  shortDescriptionMn: string
  shortDescriptionEn: string
  icon: string
  order: number
  active: boolean
}

export default function AdminServicesPage() {
  const { language } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    titleMn: '',
    titleEn: '',
    descriptionMn: '',
    descriptionEn: '',
    shortDescriptionMn: '',
    shortDescriptionEn: '',
    icon: '',
    order: 0,
    active: true
  })

  const iconOptions = [
    { value: 'wrench', label: 'Wrench', icon: '🔧' },
    { value: 'building', label: 'Building', icon: '🏗️' },
    { value: 'home', label: 'Home', icon: '🏠' },
    { value: 'file-text', label: 'Document', icon: '📄' },
    { value: 'users', label: 'Users', icon: '👥' },
    { value: 'check-circle', label: 'Check', icon: '✅' },
    { value: 'star', label: 'Star', icon: '⭐' },
    { value: 'award', label: 'Award', icon: '🏆' }
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data.services)
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingService 
        ? `/api/admin/services/${editingService.id}`
        : '/api/admin/services'
      
      const method = editingService ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowForm(false)
        setEditingService(null)
        resetForm()
        fetchServices()
      } else {
        const data = await response.json()
        alert(language === 'mn' 
          ? `Алдаа: ${data.error}` 
          : `Error: ${data.error}`
        )
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert(language === 'mn' 
        ? 'Системийн алдаа гарлаа. Дахин оролдоно уу.' 
        : 'System error occurred. Please try again.'
      )
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      titleMn: service.titleMn,
      titleEn: service.titleEn,
      descriptionMn: service.descriptionMn,
      descriptionEn: service.descriptionEn,
      shortDescriptionMn: service.shortDescriptionMn,
      shortDescriptionEn: service.shortDescriptionEn,
      icon: service.icon,
      order: service.order,
      active: service.active
    })
    setShowForm(true)
  }

  const handleDelete = async (serviceId: number) => {
    if (!confirm(language === 'mn' ? 'Үйлчилгээг устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete this service?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchServices()
      } else {
        const data = await response.json()
        alert(language === 'mn' 
          ? `Алдаа: ${data.error}` 
          : `Error: ${data.error}`
        )
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
      alert(language === 'mn' 
        ? 'Системийн алдаа гарлаа. Дахин оролдоно уу.' 
        : 'System error occurred. Please try again.'
      )
    }
  }

  const resetForm = () => {
    setFormData({
      titleMn: '',
      titleEn: '',
      descriptionMn: '',
      descriptionEn: '',
      shortDescriptionMn: '',
      shortDescriptionEn: '',
      icon: '',
      order: 0,
      active: true
    })
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('Үйлчилгээнүүд', 'Services')}
          </h1>
          <p className="mt-2 text-gray-600">
            {getText(
              'Үйлчилгээнүүдийг удирдах, нэмэх, засах',
              'Manage, add, and edit services'
            )}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {getText('Шинэ үйлчилгээ', 'New Service')}
        </button>
      </div>

      {/* Service Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingService 
                ? getText('Үйлчилгээ засах', 'Edit Service')
                : getText('Шинэ үйлчилгээ', 'New Service')
              }
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingService(null)
                resetForm()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Гарчиг (Монгол)', 'Title (Mongolian)')} *
                </label>
                <input
                  type="text"
                  name="titleMn"
                  value={formData.titleMn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Гарчиг (Англи)', 'Title (English)')} *
                </label>
                <input
                  type="text"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Short Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Товч тайлбар (Монгол)', 'Short Description (Mongolian)')} *
                </label>
                <textarea
                  name="shortDescriptionMn"
                  value={formData.shortDescriptionMn}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Товч тайлбар (Англи)', 'Short Description (English)')} *
                </label>
                <textarea
                  name="shortDescriptionEn"
                  value={formData.shortDescriptionEn}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Full Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Дэлгэрэнгүй тайлбар (Монгол)', 'Full Description (Mongolian)')} *
                </label>
                <textarea
                  name="descriptionMn"
                  value={formData.descriptionMn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Дэлгэрэнгүй тайлбар (Англи)', 'Full Description (English)')} *
                </label>
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Icon and Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Дүрс', 'Icon')}
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{getText('Дүрс сонгох', 'Select Icon')}</option>
                  {iconOptions.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.icon} {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Дараалал', 'Order')}
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                {getText('Идэвхтэй үйлчилгээ', 'Active Service')}
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingService(null)
                  resetForm()
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {getText('Цуцлах', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingService 
                  ? getText('Хадгалах', 'Save Changes')
                  : getText('Үүсгэх', 'Create Service')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Бүх үйлчилгээнүүд', 'All Services')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үйлчилгээ', 'Service')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Товч тайлбар', 'Short Description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Дараалал', 'Order')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Төлөв', 'Status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үйлдэл', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {language === 'mn' ? service.titleMn : service.titleEn}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {language === 'mn' ? service.shortDescriptionMn : service.shortDescriptionEn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active 
                        ? getText('Идэвхтэй', 'Active')
                        : getText('Идэвхгүй', 'Inactive')
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-900"
                        title={getText('Засах', 'Edit')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900"
                        title={getText('Устгах', 'Delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
