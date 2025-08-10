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
    subject: '',
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

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const subjects = [
    { value: 'construction', label: language === 'mn' ? 'Барилгын ажил' : 'Construction Work' },
    { value: 'legal', label: language === 'mn' ? 'Хуулийн зөвлөгөө' : 'Legal Consultation' },
    { value: 'quote', label: language === 'mn' ? 'Үнийн санал' : 'Price Quote' },
    { value: 'other', label: language === 'mn' ? 'Бусад' : 'Other' }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F4F2EA] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F425C] mb-4">
            {language === 'mn' ? 'Баярлалаа!' : 'Thank You!'}
          </h1>
          <p className="text-[#0F425C]/80 mb-6">
            {language === 'mn'
              ? 'Таны мессеж амжилттай илгээгдлээ. Бид удахгүй танд холбогдох болно.'
              : 'Your message has been sent successfully. We will contact you soon.'
            }
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#0F425C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0F425C]/90 transition-colors"
          >
            {language === 'mn' ? 'Шинэ мессеж' : 'New Message'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0F425C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Холбоо барих' : 'Contact Us'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Таны төслийн талаар ярилцая. Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу.'
              : 'Let\'s discuss your project. Contact us for a free consultation.'
            }
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#0F425C] mb-8">
                {language === 'mn' ? 'Мессеж илгээх' : 'Send Message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Нэр' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#0F425C]/20 rounded-lg focus:ring-2 focus:ring-[#0F425C] focus:border-transparent"
                      placeholder={language === 'mn' ? 'Таны нэр' : 'Your name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0F425C] mb-2">
                      {language === 'mn' ? 'И-мэйл' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#0F425C]/20 rounded-lg focus:ring-2 focus:ring-[#0F425C] focus:border-transparent"
                      placeholder={language === 'mn' ? 'Таны и-мэйл' : 'Your email'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Утас' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#0F425C]/20 rounded-lg focus:ring-2 focus:ring-[#0F425C] focus:border-transparent"
                      placeholder={language === 'mn' ? '+976 99054762' : '+976 99054762'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Сэдэв' : 'Subject'} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#0F425C]/20 rounded-lg focus:ring-2 focus:ring-[#0F425C] focus:border-transparent"
                    >
                      <option value="">{language === 'mn' ? 'Сэдэв сонгох' : 'Select subject'}</option>
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#0F425C] mb-2">
                    {language === 'mn' ? 'Мессеж' : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#0F425C]/20 rounded-lg focus:ring-2 focus:ring-[#0F425C] focus:border-transparent"
                    placeholder={language === 'mn' 
                      ? 'Таны төслийн талаар дэлгэрэнгүй мэдээлэл...'
                      : 'Tell us more about your project...'
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0F425C] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#0F425C]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {language === 'mn' ? 'Илгээж байна...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {language === 'mn' ? 'Мессеж илгээх' : 'Send Message'}
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#0F425C] mb-8">
                {language === 'mn' ? 'Холбоо барих мэдээлэл' : 'Contact Information'}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0F425C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#0F425C]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Утас' : 'Phone'}
                    </h3>
                    <a
                      href="tel:+976-99054762"
                      className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors text-lg"
                    >
                      +976 99054762
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0F425C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0F425C]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-2">
                      {language === 'mn' ? 'И-мэйл' : 'Email'}
                    </h3>
                    <a
                      href="mailto:gerlee_jad@yahoo.com"
                      className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors text-lg"
                    >
                      gerlee_jad@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0F425C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0F425C]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Хаяг' : 'Address'}
                    </h3>
                    <p className="text-[#0F425C]/80 text-lg">
                      {language === 'mn' ? 'Улаанбаатар хот, Монгол' : 'Ulaanbaatar, Mongolia'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#0F425C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0F425C]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-2">
                      {language === 'mn' ? 'Ажиллах цаг' : 'Working Hours'}
                    </h3>
                    <p className="text-[#0F425C]/80 text-lg">
                      {language === 'mn' ? 'Даваа-Ням: 9:00-18:00' : 'Monday-Friday: 9:00-18:00'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-[#F4F2EA] rounded-lg">
                <h3 className="text-lg font-semibold text-[#0F425C] mb-3">
                  {language === 'mn' ? 'Чөлөөт зөвлөгөө' : 'Free Consultation'}
                </h3>
                <p className="text-[#0F425C]/80">
                  {language === 'mn'
                    ? 'Барилгын төслийн талаар чөлөөт зөвлөгөө өгнө. Бидэнтэй холбоо барина уу.'
                    : 'We provide free consultation for construction projects. Contact us today.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
