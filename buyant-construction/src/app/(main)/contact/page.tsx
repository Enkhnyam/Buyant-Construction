'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        // Handle error
        console.error('Contact form error:', data.error)
        alert(language === 'mn' 
          ? `Алдаа гарлаа: ${data.error}` 
          : `Error: ${data.error}`
        )
      }
    } catch (error) {
      console.error('Failed to submit contact form:', error)
      alert(language === 'mn' 
        ? 'Системийн алдаа гарлаа. Дахин оролдоно уу.' 
        : 'System error occurred. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    { value: '', label: language === 'mn' ? 'Үйлчилгээ сонгох' : 'Select Service' },
    { value: 'construction', label: language === 'mn' ? 'Орон сууцны барилга' : 'Residential Construction' },
    { value: 'legal', label: language === 'mn' ? 'Хуулийн үйлчилгээ' : 'Legal Services' },
    { value: 'consultation', label: language === 'mn' ? 'Зөвлөгөө' : 'Consultation' },
    { value: 'other', label: language === 'mn' ? 'Бусад' : 'Other' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Холбоо барих' : 'Contact Us'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Таны төслийн талаар зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Get in touch with us for consultation about your project'
            }
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {language === 'mn' ? 'Мессеж илгээх' : 'Send Message'}
            </h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {language === 'mn' 
                  ? 'Таны мессеж амжилттай илгээгдлээ! Бид удахгүй танд холбогдох болно.'
                  : 'Your message has been sent successfully! We will contact you soon.'
                }
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'mn' ? 'Нэр *' : 'Name *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'mn' ? 'Таны нэр' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'mn' ? 'И-мэйл *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'mn' ? 'Таны и-мэйл' : 'Your email'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'mn' ? 'Утасны дугаар' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'mn' ? '+976 99 999 999' : '+976 99 999 999'}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'mn' ? 'Үйлчилгээ' : 'Service'}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'mn' ? 'Мессеж *' : 'Message *'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'mn' 
                    ? 'Таны төслийн талаар дэлгэрэнгүй бичнэ үү...'
                    : 'Please provide details about your project...'
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {language === 'mn' ? 'Илгээж байна...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {language === 'mn' ? 'Мессеж илгээх' : 'Send Message'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {language === 'mn' ? 'Холбоо барих мэдээлэл' : 'Contact Information'}
            </h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'mn' ? 'Утасны дугаар' : 'Phone'}
                  </h3>
                  <a 
                    href="tel:+976-11-123456" 
                    className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                  >
                    +976 11 123 456
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'mn' ? 'Да-Ня: 9:00-18:00' : 'Mon-Fri: 9:00-18:00'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'mn' ? 'И-мэйл' : 'Email'}
                  </h3>
                  <a 
                    href="mailto:info@buyant.mn" 
                    className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                  >
                    info@buyant.mn
                  </a>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'mn' ? '24 цагийн дотор хариулна' : 'We reply within 24 hours'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'mn' ? 'Хаяг' : 'Address'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {language === 'mn' 
                      ? 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо'
                      : '1st Khoroo, Sukhbaatar District, Ulaanbaatar, Mongolia'
                    }
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'mn' ? 'Төв хэсэгт байрладаг' : 'Located in the city center'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'mn' ? 'Ажиллах цаг' : 'Working Hours'}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {language === 'mn' ? 'Даваа - Баасан: 9:00 - 18:00' : 'Monday - Friday: 9:00 - 18:00'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'mn' ? 'Мягмар, Ням: Амарна' : 'Saturday & Sunday: Closed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {language === 'mn' ? 'Яаралтай холбоо барих' : 'Emergency Contact'}
              </h3>
              <p className="text-red-700 mb-3">
                {language === 'mn'
                  ? 'Яаралтай асуудал гарвал 24 цагийн турш холбогдох боломжтой'
                  : 'Available 24/7 for emergency issues'
                }
              </p>
              <a 
                href="tel:+976-99-999-999" 
                className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                +976 99 999 999
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
