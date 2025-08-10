'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FileText, CheckCircle, ArrowRight } from 'lucide-react'
import HouseBuildingProcess from '@/components/HouseBuildingProcess'

export default function ServicesPage() {
  const { language, t } = useLanguage()

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
              ? 'Байшингийн барилгын бүх төрлийн үйлчилгээ, хуулийн зөвлөгөө'
              : 'All types of house construction services and legal consultation'
            }
          </p>
        </div>
      </section>

      {/* House Building Process - Main Feature */}
      <HouseBuildingProcess />

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
                  ? 'Байшингийн барилгын төслийн бүх төрлийн зөвшөөрөл, зөвлөгөө'
                  : 'All types of house construction project permits and consultation'
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
              ? 'Таны байшингийн төслийг эхлүүлье'
              : 'Let\'s Start Your House Project'
            }
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {language === 'mn'
              ? 'Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Contact us for a free consultation about your house project'
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
