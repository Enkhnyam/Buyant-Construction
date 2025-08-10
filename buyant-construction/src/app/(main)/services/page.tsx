'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Building2, FileText, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

interface Service {
  id: number
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  shortDescriptionMn: string
  shortDescriptionEn: string
  icon?: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function ServicesPage() {
  const { language, t } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/services?active=true')
      if (!response.ok) {
        throw new Error('Failed to fetch services')
      }
      
      const data = await response.json()
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services')
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const getServiceDisplayData = (service: Service) => {
    const title = language === 'mn' ? service.titleMn : service.titleEn
    const description = language === 'mn' ? service.descriptionMn : service.descriptionEn
    const shortDescription = language === 'mn' ? service.shortDescriptionMn : service.shortDescriptionEn
    
    // Default features based on service type
    const features = language === 'mn' 
      ? ['Чанартай ажил', 'Хугацаанд нь гүйцэтгэх', 'Мэргэжлийн хандалт', 'Хямд үнэ']
      : ['Quality work', 'Timely completion', 'Professional approach', 'Affordable prices']

    return {
      title,
      description,
      shortDescription,
      features
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#0F425C] animate-spin mx-auto mb-4" />
          <p className="text-[#0F425C] text-lg">
            {language === 'mn' ? 'Үйлчилгээнүүд ачаалж байна...' : 'Loading services...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-[#0F425C]/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#0F425C]/60 mb-2">
            {language === 'mn' ? 'Алдаа гарлаа' : 'Error occurred'}
          </h3>
          <p className="text-[#0F425C]/50 mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-[#0F425C] text-white px-6 py-3 rounded-lg hover:bg-[#0F425C]/90 transition-colors"
          >
            {language === 'mn' ? 'Дахин оролдох' : 'Try again'}
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
            {language === 'mn' ? 'Үйлчилгээнүүд' : 'Our Services'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Барилгын бүх төрлийн үйлчилгээ, хуулийн зөвлөгөө'
              : 'All types of construction services and legal consultation'
            }
          </p>
        </div>
      </section>

      {/* Construction Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Барилгын үйлчилгээ' : 'Construction Services'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Орчин үеийн технологи, чанартай материал ашиглан барилгын бүх төрлийн ажлыг гүйцэтгэнэ'
                : 'We perform all types of construction work using modern technology and quality materials'
              }
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const displayData = getServiceDisplayData(service)
                
                return (
                  <div key={service.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-[#0F425C]/10">
                    <div className="w-16 h-16 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F425C] mb-4 text-center">{displayData.title}</h3>
                    <p className="text-[#0F425C]/80 mb-6 text-center leading-relaxed">{displayData.description}</p>
                    
                    <div className="space-y-3">
                      {displayData.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                          <span className="text-[#0F425C]/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-[#0F425C]/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0F425C]/60 mb-2">
                {language === 'mn' ? 'Үйлчилгээ олдсонгүй' : 'No services found'}
              </h3>
              <p className="text-[#0F425C]/50">
                {language === 'mn' 
                  ? 'Одоогоор үйлчилгээ байхгүй байна'
                  : 'No services available at the moment'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Legal Services */}
      <section className="py-20 bg-[#F4F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Хуулийн үйлчилгээ' : 'Legal Services'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Барилгын бүх төрлийн хуулийн асуудлын зөвлөгөө, зөвшөөрөл'
                : 'Legal consultation and permits for all types of construction matters'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-[#0F425C]/10">
              <div className="w-16 h-16 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F425C] mb-4 text-center">
                {language === 'mn' ? 'Барилгын зөвшөөрөл' : 'Construction Permits'}
              </h3>
              <p className="text-[#0F425C]/80 mb-6 text-center leading-relaxed">
                {language === 'mn'
                  ? 'Барилгын төслийн бүх төрлийн зөвшөөрөл, зөвлөгөө'
                  : 'All types of construction project permits and consultation'
                }
              </p>
              
              <div className="space-y-3">
                {language === 'mn' 
                  ? ['Төслийн зөвшөөрөл', 'Барилгын зөвшөөрөл', 'Хэрэглээний зөвшөөрөл', 'Хуулийн зөвлөгөө'].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                      <span className="text-[#0F425C]/80">{feature}</span>
                    </div>
                  ))
                  : ['Project permits', 'Construction permits', 'Usage permits', 'Legal consultation'].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                      <span className="text-[#0F425C]/80">{feature}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-[#0F425C]/10">
              <div className="w-16 h-16 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F425C] mb-4 text-center">
                {language === 'mn' ? 'Гэрээний зөвлөгөө' : 'Contract Consultation'}
              </h3>
              <p className="text-[#0F425C]/80 mb-6 text-center leading-relaxed">
                {language === 'mn'
                  ? 'Барилгын гэрээ, төслийн бүх төрлийн хуулийн асуудал'
                  : 'Construction contracts and all types of legal project matters'
                }
              </p>
              
              <div className="space-y-3">
                {language === 'mn' 
                  ? ['Гэрээний бичиг', 'Гэрээний шалгалт', 'Хуулийн зөвлөгөө', 'Маргааны шийдвэрлэлт'].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                      <span className="text-[#0F425C]/80">{feature}</span>
                    </div>
                  ))
                  : ['Contract drafting', 'Contract review', 'Legal advice', 'Dispute resolution'].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                      <span className="text-[#0F425C]/80">{feature}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Яагаад биднийг сонгох вэ?' : 'Why Choose Us?'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? '20 гаруй жилийн туршлагатай барилгын компани'
                : 'Construction company with over 20 years of experience'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#0F425C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Чадвартай ажил' : 'Quality Work'}
              </h3>
              <p className="text-[#0F425C]/80">
                {language === 'mn'
                  ? 'Олон жилийн туршлагатай мэргэжлийн барилгачид'
                  : 'Professional builders with years of experience'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#0F425C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Найдвартай үйлчилгээ' : 'Reliable Service'}
              </h3>
              <p className="text-[#0F425C]/80">
                {language === 'mn'
                  ? 'Хугацаанд нь гүйцэтгэх, чанартай ажил'
                  : 'Timely completion and quality work'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#0F425C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Хямд үнэ' : 'Affordable Prices'}
              </h3>
              <p className="text-[#0F425C]/80">
                {language === 'mn'
                  ? 'Чанартай ажил, хямд үнэ'
                  : 'Quality work at affordable prices'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <a
              href="/contact"
              className="bg-white text-[#0F425C] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              {t('common.contactUs')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="tel:+976-11-123456"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
            >
              +976 11 123 456
            </a>
            <a
              href="mailto:info@buyant.mn"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
            >
              info@buyant.mn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
