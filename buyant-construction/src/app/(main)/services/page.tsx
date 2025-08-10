'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Home, FileText, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'

export default function ServicesPage() {
  const { language, t } = useLanguage()

  const constructionSteps = [
    {
      step: language === 'mn' ? '1' : '1',
      title: language === 'mn' ? 'Газар сонголт' : 'Land Selection',
      description: language === 'mn' 
        ? 'Зөв газар сонгох, газар худалдан авах, эрх бүхий баримт бичиг'
        : 'Proper land selection, purchase, and legal documentation'
    },
    {
      step: language === 'mn' ? '2' : '2',
      title: language === 'mn' ? 'Төслийн төлөвлөлт' : 'Project Planning',
      description: language === 'mn'
        ? 'Архитектурын зураг, төслийн төлөвлөлт, зөвшөөрөл авах'
        : 'Architectural drawings, project planning, and permits'
    },
    {
      step: language === 'mn' ? '3' : '3',
      title: language === 'mn' ? 'Барилгын ажил' : 'Construction',
      description: language === 'mn'
        ? 'Чадвартай барилгын ажил, чанарын хяналт'
        : 'Professional construction work and quality control'
    },
    {
      step: language === 'mn' ? '4' : '4',
      title: language === 'mn' ? 'Хүлээн авах' : 'Handover',
      description: language === 'mn'
        ? 'Бэлэн байшин, баримт бичиг, гарантийн үйлчилгээ'
        : 'Finished home, documentation, and warranty service'
    }
  ]

  const legalServices = [
    {
      title: language === 'mn' ? 'Барилгын зөвшөөрөл' : 'Construction Permits',
      description: language === 'mn'
        ? 'Орон сууцны болон арилжааны барилгын зөвшөөрөл авах'
        : 'Obtaining permits for residential and commercial construction'
    },
    {
      title: language === 'mn' ? 'А маягт бүрдүүлэлт' : 'Documentation Preparation',
      description: language === 'mn'
        ? 'Барилгын бүх төрлийн баримт бичгийн бэлтгэл'
        : 'Preparation of all types of construction documentation'
    },
    {
      title: language === 'mn' ? 'Хуулийн зөвлөгөө' : 'Legal Consultation',
      description: language === 'mn'
        ? 'Барилгын хуулийн асуудлын зөвлөгөө, маргааны шийдвэрлэлт'
        : 'Legal advice on construction matters and dispute resolution'
    },
    {
      title: language === 'mn' ? 'Гэрээ, хэлцэл' : 'Contracts & Agreements',
      description: language === 'mn'
        ? 'Барилгын гэрээ, хэлцэл, хамтын ажиллагааны баримт'
        : 'Construction contracts, agreements, and partnership documents'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Үйлчилгээнүүд' : 'Our Services'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Барилгын бүх төрлийн үйлчилгээ, хуулийн зөвлөгөө'
              : 'Comprehensive construction services and legal consultation'
            }
          </p>
        </div>
      </section>

      {/* Construction Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.construction.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.construction.description')}
            </p>
          </div>

          {/* Construction Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {constructionSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Construction Features */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'mn' ? 'Үйлчилгээний онцлог' : 'Service Features'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === 'mn' ? 'Чадвартай барилга' : 'Quality Construction'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'mn'
                      ? 'Олон жилийн туршлагатай мэргэжлийн барилга'
                      : 'Professional construction with years of experience'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === 'mn' ? 'Хугацааны хүрээ' : 'Timeline Management'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'mn'
                      ? 'Төслийн хугацааг хэмнэх, чанарыг хадгалах'
                      : 'Efficient timeline management while maintaining quality'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === 'mn' ? 'Хуулийн дэмжлэг' : 'Legal Support'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'mn'
                      ? 'Барилгын бүх төрлийн хуулийн асуудлын шийдвэрлэлт'
                      : 'Resolution of all legal matters related to construction'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === 'mn' ? 'Гарантийн үйлчилгээ' : 'Warranty Service'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'mn'
                      ? 'Барилгын ажлын гарантийн үйлчилгээ'
                      : 'Warranty service for construction work'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.legal.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.legal.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                >
                  {language === 'mn' ? 'Дэлгэрэнгүй' : 'Learn More'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'mn' 
              ? 'Үйлчилгээний талаар асуулттай байна уу?'
              : 'Have Questions About Our Services?'
            }
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {language === 'mn'
              ? 'Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Contact us for a free consultation about our services'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              {t('common.contactUs')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+976-11-123456"
                className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                +976 11 123 456
              </a>
              <a
                href="mailto:info@buyant.mn"
                className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                info@buyant.mn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
