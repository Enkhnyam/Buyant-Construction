'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import HouseBuildingProcess from '@/components/HouseBuildingProcess'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function BuildingServicePage() {
  const { language, t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0F425C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Барилгын үйлчилгээ' : 'Building Service'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Амины орон сууц болон зуслангийн сууцтай холбоотой бүх төрлийн үйлчилгээ, цахилгаан, ландшафт, террас, зураг, материалын тооцоо'
              : 'All house construction services for private homes and cottages: electrical, landscape, terrace, drawings, and material planning'}
          </p>
        </div>
      </section>

      {/* Building Process */}
      <HouseBuildingProcess />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'ЯАГААД БИДНИЙГ СОНГОХ ВЭ?' : 'Why Choose Us?'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? '20 гаруй жилийн туршлагатай, чадварлаг баг хамт олон'
                : 'Construction company with over 20 years of experience'}
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
                  : 'Professional builders with years of experience'}
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
                  : 'Timely completion and quality work'}
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
                  : 'Quality work at affordable prices'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F425C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'mn' 
              ? 'Таны байшингийн төслийг эхлүүлье'
              : 'Let\'s Start Your House Project'}
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {language === 'mn'
              ? 'Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Contact us for a free consultation about your house project'}
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
              href="tel:+976-99054762"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
            >
              +976 99054762
            </a>
            <a
              href="mailto:gerlee_jad@yahoo.com"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
            >
              gerlee_jad@yahoo.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}


