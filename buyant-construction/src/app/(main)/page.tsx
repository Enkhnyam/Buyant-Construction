'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, Home, FileText, CheckCircle } from 'lucide-react'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

export default function HomePage() {
  const { language, t, isHydrated } = useLanguage()

  const services = [
    {
      icon: Home,
      title: t('services.construction.title'),
      description: t('services.construction.description'),
      href: '/services',
      color: 'bg-[#0F425C]/10',
      iconColor: 'text-[#0F425C]',
      image: '/services/material.jpg'
    },
    {
      icon: FileText,
      title: t('services.legal.title'),
      description: t('services.legal.description'),
      href: '/services',
      color: 'bg-[#0F425C]/10',
      iconColor: 'text-[#0F425C]',
      image: '/services/mayagt.jpg'
    }
  ]

  const features = [
    {
      icon: CheckCircle,
      title: language === 'mn' ? 'Чадвартай барилга' : 'Quality Construction',
      description: language === 'mn' ? 'Олон жилийн туршлагатай мэргэжлийн барилга' : 'Professional construction with years of experience'
    },
    {
      icon: CheckCircle,
      title: language === 'mn' ? 'Хуулийн зөвлөгөө' : 'Legal Consultation',
      description: language === 'mn' ? 'Барилгын бүх төрлийн хуулийн асуудлын зөвлөгөө' : 'Legal advice for all construction matters'
    },
    {
      icon: CheckCircle,
      title: language === 'mn' ? 'Бүрэн үйлчилгээ' : 'Full Service',
      description: language === 'mn' ? 'Газраас эхлээд бэлэн байшин хүртэл' : 'From land to finished home'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0F425C] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isHydrated && (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-[#0F425C] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
                >
                  {t('common.viewProjects')}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Projects Carousel */}
      <ProjectsCarousel />

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isHydrated && (
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Үйлчилгээнүүд' : 'Our Services'}
              </h2>
              <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
                {language === 'mn' 
                  ? 'Бид танд барилгын бүх төрлийн үйлчилгээг санал болгож байна'
                  : 'We offer comprehensive construction services to meet all your needs'
                }
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#0F425C]/10 overflow-hidden group cursor-pointer">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay with icon */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center backdrop-blur-sm bg-white/80`}>
                        <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0F425C] mb-4 group-hover:text-[#0F425C]/80 transition-colors">{service.title}</h3>
                    <p className="text-[#0F425C]/80 mb-4">{service.description}</p>
                    <div className="flex items-center text-[#0F425C] font-medium group-hover:text-[#0F425C]/80 transition-colors">
                      <span>{t('common.learnMore')}</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F4F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isHydrated && (
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Бидний давуу талууд' : 'Why Choose Us'}
              </h2>
              <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
                {language === 'mn'
                  ? 'Бид танд чанартай үйлчилгээг хүргэхэд анхаардаг'
                  : 'We focus on delivering quality service to our clients'
                }
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-[#0F425C]" />
                </div>
                {isHydrated && (
                  <>
                    <h3 className="text-xl font-semibold text-[#0F425C] mb-4">{feature.title}</h3>
                    <p className="text-[#0F425C]/80">{feature.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-[#0F425C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isHydrated && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {language === 'mn' ? 'Таны төсөл эхлэхэд бэлэн үү?' : 'Ready to Start Your Project?'}
              </h2>
              <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
                {language === 'mn'
                  ? 'Бидэнтэй холбоо бариад үнэгүй зөвлөгөө аваарай'
                  : 'Contact us today for a free consultation'
                }
              </p>
              <Link
                href="/contact"
                className="bg-white text-[#0F425C] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                {t('common.contactUs')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
