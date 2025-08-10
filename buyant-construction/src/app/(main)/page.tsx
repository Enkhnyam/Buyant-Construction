'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, Home, FileText, CheckCircle } from 'lucide-react'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import TestimonialsSection from '@/components/TestimonialsSection'

export default function HomePage() {
  const { language, t } = useLanguage()

  const services = [
    {
      icon: Home,
      title: t('services.construction.title'),
      description: t('services.construction.description'),
      href: '/services',
      color: 'bg-[#0F425C]/10',
      iconColor: 'text-[#0F425C]'
    },
    {
      icon: FileText,
      title: t('services.legal.title'),
      description: t('services.legal.description'),
      href: '/services',
      color: 'bg-[#0F425C]/10',
      iconColor: 'text-[#0F425C]'
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
        </div>
      </section>

      {/* Projects Carousel */}
      <ProjectsCarousel />

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-[#0F425C]/10">
                <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-[#0F425C] mb-4">{service.title}</h3>
                <p className="text-[#0F425C]/80 mb-6 leading-relaxed">{service.description}</p>
                <Link
                  href={service.href}
                  className={`inline-flex items-center text-lg font-semibold ${service.iconColor} hover:opacity-80 transition-opacity`}
                >
                  {t('common.learnMore')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F4F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Яагаад биднийг сонгох вэ?' : 'Why Choose Us?'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Гэр бүлийн бизнес, найдвартай үйлчилгээ'
                : 'Family business with reliable service'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-[#0F425C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F425C] mb-4">{feature.title}</h3>
                <p className="text-[#0F425C]/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-[#0F425C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'mn' 
              ? 'Таны төслийг эхлүүлье'
              : 'Let\'s Start Your Project'
            }
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {language === 'mn'
              ? 'Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Contact us for a free consultation about your project'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0F425C] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              {t('common.contactUs')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:+976-11-123456"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
            >
              +976 11 123 456
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
