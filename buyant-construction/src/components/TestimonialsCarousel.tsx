'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  clientName: string
  clientTitle: string
  contentMn: string
  contentEn: string
  rating: number
  imagePath: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: 'Бат-Эрдэнэ',
    clientTitle: 'Хувийн байшин',
    contentMn: 'Маш чанартай ажил хийсэн. Бид талархаж байна!',
    contentEn: 'Excellent quality work. We are very satisfied!',
    rating: 5,
    imagePath: '/testimonials/client1.jpg'
  },
  {
    id: 2,
    clientName: 'Сүхбат',
    clientTitle: 'Оффис барилга',
    contentMn: 'Хугацаанд нь дуусгасан, чанартай.',
    contentEn: 'Completed on time with great quality.',
    rating: 5,
    imagePath: '/testimonials/client2.jpg'
  },
  {
    id: 3,
    clientName: 'Алтанцэцэг',
    clientTitle: 'Хувийн байшин',
    contentMn: 'Мэргэжлийн хандлага, найдвартай.',
    contentEn: 'Professional approach, very reliable.',
    rating: 5,
    imagePath: '/testimonials/client3.jpg'
  },
  {
    id: 4,
    clientName: 'Болд',
    clientTitle: 'Худалдааны төв',
    contentMn: 'Том төсөл амжилттай дууслаа.',
    contentEn: 'Large project completed successfully.',
    rating: 5,
    imagePath: '/testimonials/client4.jpg'
  },
  {
    id: 5,
    clientName: 'Оюунчимэг',
    clientTitle: 'Хувийн байшин',
    contentMn: 'Хамгийн сайн сонголт байсан.',
    contentEn: 'It was the best choice we made.',
    rating: 5,
    imagePath: '/testimonials/client5.jpg'
  },
  {
    id: 6,
    clientName: 'Дэлгэр',
    clientTitle: 'Оффис барилга',
    contentMn: 'Хугацаа, чанар, үнэ - бүгд сайн.',
    contentEn: 'Timing, quality, price - all excellent.',
    rating: 5,
    imagePath: '/testimonials/client6.jpg'
  }
]

export default function TestimonialsCarousel() {
  const { language, isHydrated } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
      />
    ))
  }

  if (!isHydrated) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
            {getText('Хэрэглэгчдийн сэтгэгдэл', 'Client Testimonials')}
          </h2>
          <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
            {getText(
              'Бидний үйлчилгээг ашигласан хэрэглэгчдийн сэтгэгдэл',
              'What our clients say about our services'
            )}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                    {/* Image Section - Large and Prominent */}
                    <div className="flex-1 flex justify-center">
                      <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={testimonial.imagePath}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Section - Minimal Text */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex justify-center lg:justify-start mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                                             <blockquote className="text-lg text-[#0F425C]/80 mb-6 italic">
                         &ldquo;{language === 'mn' ? testimonial.contentMn : testimonial.contentEn}&rdquo;
                       </blockquote>
                      
                      <div className="text-[#0F425C]">
                        <p className="font-semibold text-xl">{testimonial.clientName}</p>
                        <p className="text-sm opacity-80">{testimonial.clientTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#0F425C] scale-125' 
                    : 'bg-[#0F425C]/30 hover:bg-[#0F425C]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
