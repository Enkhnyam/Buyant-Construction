'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Star, Quote } from 'lucide-react'
import { TestimonialImage } from './TestimonialImage'

interface Testimonial {
  id: number
  clientName: string
  clientTitle?: string
  contentMn: string
  contentEn: string
  rating: number
  featured: boolean
  clientImageId?: string
}

export default function TestimonialsSection() {
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?featured=true&limit=6')
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

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getText('Хэрэглэгчдийн сэтгэгдэл', 'Client Testimonials')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getText(
              'Бидний үйлчилгээг ашигласан хэрэглэгчдийн сэтгэгдэл',
              'What our clients say about our services'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {language === 'mn' ? testimonial.contentMn : testimonial.contentEn}
              </p>

              {/* Client Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-3">
                  {testimonial.clientImageId && (
                    <TestimonialImage 
                      clientId={testimonial.clientImageId} 
                      className="w-12 h-12"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.clientName}
                    </div>
                    {testimonial.clientTitle && (
                      <div className="text-sm text-gray-600">
                        {testimonial.clientTitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            {getText(
              'Та ч гэсэн бидний үйлчилгээг ашиглаж үзээрэй',
              'Try our services and join our satisfied clients'
            )}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            {getText('Холбоо барих', 'Get in Touch')}
          </a>
        </div>
      </div>
    </section>
  )
}
