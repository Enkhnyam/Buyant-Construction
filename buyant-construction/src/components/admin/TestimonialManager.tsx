'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Plus, Edit, Trash2, X, Save, Loader2, Star, Upload, User, Eye, EyeOff } from 'lucide-react'

interface Testimonial {
  id?: number
  clientName: string
  clientTitle: string
  contentMn: string
  contentEn: string
  rating: number
  featured: boolean
  published: boolean
  clientPhoto?: string
  createdAt?: string
  updatedAt?: string
}

interface TestimonialFormData {
  clientName: string
  clientTitle: string
  contentMn: string
  contentEn: string
  rating: number
  featured: boolean
  published: boolean
  clientPhoto?: File
}

interface TestimonialManagerProps {
  testimonials: Testimonial[]
  onTestimonialsChange: (testimonials: Testimonial[]) => void
}

export default function TestimonialManager({ 
  testimonials, 
  onTestimonialsChange 
}: TestimonialManagerProps) {
  const { language } = useLanguage()
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<TestimonialFormData>({
    clientName: '',
    clientTitle: '',
    contentMn: '',
    contentEn: '',
    rating: 5,
    featured: false,
    published: true
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleRatingChange = (newRating: number) => {
    setFormData(prev => ({ ...prev, rating: newRating }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, clientPhoto: file }))
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, clientPhoto: undefined }))
    setPhotoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const newTestimonial: Testimonial = {
        id: editingTestimonial?.id || Date.now(),
        clientName: formData.clientName,
        clientTitle: formData.clientTitle,
        contentMn: formData.contentMn,
        contentEn: formData.contentEn,
        rating: formData.rating,
        featured: formData.featured,
        published: formData.published,
        clientPhoto: photoPreview || editingTestimonial?.clientPhoto,
        createdAt: editingTestimonial?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      let updatedTestimonials: Testimonial[]
      
      if (editingTestimonial) {
        // Update existing testimonial
        updatedTestimonials = testimonials.map(t => 
          t.id === editingTestimonial.id ? newTestimonial : t
        )
      } else {
        // Add new testimonial
        updatedTestimonials = [...testimonials, newTestimonial]
      }

      onTestimonialsChange(updatedTestimonials)
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      contentMn: testimonial.contentMn,
      contentEn: testimonial.contentEn,
      rating: testimonial.rating,
      featured: testimonial.featured,
      published: testimonial.published
    })
    setPhotoPreview(testimonial.clientPhoto || null)
    setShowForm(true)
  }

  const handleDelete = (testimonialId: number) => {
    if (!confirm(getText(
      'Сэтгэгдлийг устгахдаа итгэлтэй байна уу?',
      'Are you sure you want to delete this testimonial?'
    ))) {
      return
    }

    const updatedTestimonials = testimonials.filter(t => t.id !== testimonialId)
    onTestimonialsChange(updatedTestimonials)
  }

  const toggleFeatured = (testimonialId: number) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === testimonialId ? { ...t, featured: !t.featured } : t
    )
    onTestimonialsChange(updatedTestimonials)
  }

  const togglePublished = (testimonialId: number) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === testimonialId ? { ...t, published: !t.published } : t
    )
    onTestimonialsChange(updatedTestimonials)
  }

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientTitle: '',
      contentMn: '',
      contentEn: '',
      rating: 5,
      featured: false,
      published: true
    })
    setPhotoPreview(null)
    setEditingTestimonial(null)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
            }`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {getText('Сэтгэгдлүүд', 'Testimonials')}
          </h3>
          <p className="text-sm text-gray-500">
            {getText(
              `${testimonials.length} сэтгэгдэл`,
              `${testimonials.length} testimonials`
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
                  {getText('Харилцагчийн нэр', 'Client Name')} *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Албан тушаал', 'Job Title')}
                </label>
                <input
                  type="text"
                  name="clientTitle"
                  value={formData.clientTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                      alt="Client photo"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="client-photo-upload"
                  />
                  <label
                    htmlFor="client-photo-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {getText('Зураг оруулах', 'Upload Photo')}
                  </label>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('Үнэлгээ', 'Rating')} *
              </label>
              <div className="flex items-center space-x-4">
                {renderStars(formData.rating, true, handleRatingChange)}
                <span className="text-sm text-gray-600">
                  {formData.rating}/5
                </span>
              </div>
            </div>

            {/* Content */}
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
                      <div className="flex-shrink-0 h-10 w-10">
                        {testimonial.clientPhoto ? (
                          <img
                            src={testimonial.clientPhoto}
                            alt={testimonial.clientName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {testimonial.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.clientTitle}
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
                    {renderStars(testimonial.rating)}
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
                        onClick={() => toggleFeatured(testimonial.id!)}
                        className={`${
                          testimonial.featured 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={testimonial.featured 
                          ? getText('Онцлохын арилгах', 'Remove Featured')
                          : getText('Онцлох', 'Make Featured')
                        }
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => togglePublished(testimonial.id!)}
                        className={`${
                          testimonial.published 
                            ? 'text-green-600 hover:text-green-900' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={testimonial.published 
                          ? getText('Ноорог болгох', 'Make Draft')
                          : getText('Нийтлэх', 'Publish')
                        }
                      >
                        {testimonial.published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id!)}
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
