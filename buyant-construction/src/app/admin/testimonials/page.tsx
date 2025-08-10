'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  X,
  Save,
  ArrowLeft
} from 'lucide-react'
import TestimonialManager from '@/components/admin/TestimonialManager'

interface Testimonial {
  id: number
  clientNameMn: string
  clientNameEn: string
  clientPositionMn: string
  clientPositionEn: string
  companyMn: string
  companyEn: string
  contentMn: string
  contentEn: string
  rating: number
  featured: boolean
  published: boolean
  clientPhoto: string
  createdAt: string
}

interface TestimonialFormData {
  clientNameMn: string
  clientNameEn: string
  clientPositionMn: string
  clientPositionEn: string
  companyMn: string
  companyEn: string
  contentMn: string
  contentEn: string
  rating: number
  featured: boolean
  published: boolean
}

export default function AdminTestimonialsPage() {
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<TestimonialFormData>({
    clientNameMn: '',
    clientNameEn: '',
    clientPositionMn: '',
    clientPositionEn: '',
    companyMn: '',
    companyEn: '',
    contentMn: '',
    contentEn: '',
    rating: 5,
    featured: false,
    published: true
  })
  const [clientPhoto, setClientPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data.testimonials)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setClientPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      
      // Add testimonial data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value))
      })
      
      // Add client photo
      if (clientPhoto) {
        formDataToSend.append('clientPhoto', clientPhoto)
      }

      const url = editingTestimonial 
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : '/api/admin/testimonials'
      
      const method = editingTestimonial ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })

      if (response.ok) {
        setShowForm(false)
        setEditingTestimonial(null)
        resetForm()
        fetchTestimonials()
      } else {
        const data = await response.json()
        alert(language === 'mn' 
          ? `Алдаа: ${data.error}` 
          : `Error: ${data.error}`
        )
      }
    } catch (error) {
      console.error('Failed to save testimonial:', error)
      alert(language === 'mn' 
        ? 'Системийн алдаа гарлаа. Дахин оролдоно уу.' 
        : 'System error occurred. Please try again.'
      )
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      clientNameMn: testimonial.clientNameMn,
      clientNameEn: testimonial.clientNameEn,
      clientPositionMn: testimonial.clientPositionMn,
      clientPositionEn: testimonial.clientPositionEn,
      companyMn: testimonial.companyMn,
      companyEn: testimonial.companyEn,
      contentMn: testimonial.contentMn,
      contentEn: testimonial.contentEn,
      rating: testimonial.rating,
      featured: testimonial.featured,
      published: testimonial.published
    })
    setPhotoPreview(testimonial.clientPhoto)
    setClientPhoto(null)
    setShowForm(true)
  }

  const handleDelete = async (testimonialId: number) => {
    if (!confirm(language === 'mn' ? 'Сэтгэгдлийг устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete this testimonial?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchTestimonials()
      } else {
        const data = await response.json()
        alert(language === 'mn' 
          ? `Алдаа: ${data.error}` 
          : `Error: ${data.error}`
        )
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
      alert(language === 'mn' 
        ? 'Системийн алдаа гарлаа. Дахин оролдоно уу.' 
        : 'System error occurred. Please try again.'
      )
    }
  }

  const resetForm = () => {
    setFormData({
      clientNameMn: '',
      clientNameEn: '',
      clientPositionMn: '',
      clientPositionEn: '',
      companyMn: '',
      companyEn: '',
      contentMn: '',
      contentEn: '',
      rating: 5,
      featured: false,
      published: true
    })
    setClientPhoto(null)
    setPhotoPreview('')
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

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
            {getText('Сэтгэгдлүүд', 'Testimonials')}
          </h1>
          <p className="mt-2 text-gray-600">
            {getText(
              'Сэтгэгдлүүдийг удирдах, нэмэх, засах',
              'Manage, add, and edit testimonials'
            )}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {getText('Шинэ сэтгэгдэл', 'New Testimonial')}
        </button>
      </div>

      {/* Testimonial Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingTestimonial 
                ? getText('Сэтгэгдэл засах', 'Edit Testimonial')
                : getText('Шинэ сэтгэгдэл', 'New Testimonial')
              }
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingTestimonial(null)
                resetForm()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Харилцагчийн нэр (Монгол)', 'Client Name (Mongolian)')} *
                </label>
                <input
                  type="text"
                  name="clientNameMn"
                  value={formData.clientNameMn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Харилцагчийн нэр (Англи)', 'Client Name (English)')} *
                </label>
                <input
                  type="text"
                  name="clientNameEn"
                  value={formData.clientNameEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Албан тушаал (Монгол)', 'Position (Mongolian)')}
                </label>
                <input
                  type="text"
                  name="clientPositionMn"
                  value={formData.clientPositionMn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Албан тушаал (Англи)', 'Position (English)')}
                </label>
                <input
                  type="text"
                  name="clientPositionEn"
                  value={formData.clientPositionEn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Компани (Монгол)', 'Company (Mongolian)')}
                </label>
                <input
                  type="text"
                  name="companyMn"
                  value={formData.companyMn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Компани (Англи)', 'Company (English)')}
                </label>
                <input
                  type="text"
                  name="companyEn"
                  value={formData.companyEn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Сэтгэгдэл (Монгол)', 'Testimonial (Mongolian)')} *
                </label>
                <textarea
                  name="contentMn"
                  value={formData.contentMn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Сэтгэгдэл (Англи)', 'Testimonial (English)')} *
                </label>
                <textarea
                  name="contentEn"
                  value={formData.contentEn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('Үнэлгээ', 'Rating')}
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating}/5
                </span>
              </div>
            </div>

            {/* Client Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('Харилцагчийн зураг', 'Client Photo')}
              </label>
              <div className="flex items-center space-x-4">
                {(photoPreview || editingTestimonial?.clientPhoto) && (
                  <div className="relative">
                    <img
                      src={photoPreview || editingTestimonial?.clientPhoto}
                      alt="Client"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview('')
                        setClientPhoto(null)
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {getText('Онцлох сэтгэгдэл', 'Featured Testimonial')}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {getText('Нийтлэх', 'Published')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingTestimonial(null)
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
                {editingTestimonial 
                  ? getText('Хадгалах', 'Save Changes')
                  : getText('Үүсгэх', 'Create Testimonial')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Бүх сэтгэгдлүүд', 'All Testimonials')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Харилцагч', 'Client')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Сэтгэгдэл', 'Testimonial')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үнэлгээ', 'Rating')}
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
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {testimonial.clientPhoto && (
                        <img
                          src={testimonial.clientPhoto}
                          alt="Client"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {language === 'mn' ? testimonial.clientNameMn : testimonial.clientNameEn}
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'mn' ? testimonial.companyMn : testimonial.companyEn}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {language === 'mn' ? testimonial.contentMn : testimonial.contentEn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {testimonial.featured && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {getText('Онцлох', 'Featured')}
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        testimonial.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {testimonial.published 
                          ? getText('Нийтлэгдсэн', 'Published')
                          : getText('Ноорог', 'Draft')
                        }
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-900"
                        title={getText('Засах', 'Edit')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
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
