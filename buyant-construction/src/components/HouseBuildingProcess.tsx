'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface ProcessStep {
  id: number
  image: string
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  featuresMn: string[]
  featuresEn: string[]
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    image: '/services/planning.png',
    titleMn: 'Төлөвлөлт болон дизайн',
    titleEn: 'Planning & Design',
    descriptionMn: 'Таны хүссэн байшингийн төлөвлөлт, дизайн, цахилгааны бүх төрлийн ажил',
    descriptionEn: 'Complete planning, design, and drawing services for your dream house',
    featuresMn: [
      'Амины орон сууц ба зуслангийн байшингийн  загвар хэмжээ', 
      'Дизайн интерьер ', 
      'Зураг', 
      'Материалын тооцоо',
      'Цахилгааны ажил',
      'Террасны ажил '
    ],
    featuresEn: ['Size planning', 'Design drawings', 'Technical drawings', 'Material calculations']
  },
  {
    id: 2,
    image: '/services/legal.png',
    titleMn: 'Хуулийн зөвлөгөө',
    titleEn: 'Legal & Permits',
    descriptionMn: 'Амины орон сууц үл хөдлөх хөрөнгөтэй холбоотой бүх төрлийн хуулийн зөвлөгөө, гэрээ',
    descriptionEn: 'All types of construction permits, legal consultation, and contract matters',
    featuresMn: [
      'Газар үл хөдлөх хөрөнгөтэй холбоотой гэрээ,  хуулийн зөвлөгөө өгөх',
      'Мөн газар үл хөдлөх хөрөнгөтэй холбоотой асуудлыг хөөцөлдөж өгөх',
    ],
    featuresEn: ['Construction permits', 'Usage permits']
  },
  {
    id: 3,
    image: '/services/material.jpg',
    titleMn: 'Материал ба худалдан авалт',
    titleEn: 'Materials & Procurement',
    descriptionMn: 'Чанартай барилгын материалын сонголт, худалдан авалт, хадгалалт',
    descriptionEn: 'Quality building material selection, procurement, and storage',
    featuresMn: [
      'Материалын сонголт', 
      'Худалдан авалт', 
      'Хадгалалт', 
      'Чанарын хяналт',
    ],
    featuresEn: ['Material selection', 'Procurement', 'Storage', 'Quality control']
  },
  {
    id: 4,
    image: '/services/construction.jpg',
    titleMn: 'Амины орон сууц ба хийцлэл',
    titleEn: 'Construction & Building',
    descriptionMn: 'Мэргэжлийн баг барилгын ажил, чанартай хийц, хугацаанд нь хийж гүйцэтгэх',
    descriptionEn: 'Professional construction work, quality finishing, and timely completion',
    featuresMn: [
      'Барилгын суурь фундамент', 
      'Хана, дээвэр', 
      'Гадна фасад дулаалга', 
      'Дотор засал ',
    ],
    featuresEn: ['Foundation work', 'Walls & roof', 'Interior finishing']
  }
]

export default function HouseBuildingProcess() {
  const { language } = useLanguage()

  const getStepDisplayData = (step: ProcessStep) => {
    return {
      title: language === 'mn' ? step.titleMn : step.titleEn,
      description: language === 'mn' ? step.descriptionMn : step.descriptionEn,
      features: language === 'mn' ? step.featuresMn : step.featuresEn
    }
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
            {language === 'mn' ? 'Байшингийн барилгын үйл явц' : 'House Building Process'}
          </h2>
          <p className="text-xl text-[#0F425C]/80 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Амины орон сууц  болон зуслангийн сууцтай холбоотой бүх төрлийн үйлчилгээ цахилгааны ажил,  ландшафт,  терасс,  газар үл хөдлөх хөрөнгөтэй холбоотой зөвлөгөө'
              : '4-step professional construction process - building your dream house'
            }
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => {
            const displayData = getStepDisplayData(step)
            const isEven = index % 2 === 0
            const objectPositionClass = index >= 2 ? 'object-[center_35%]' : 'object-center'
            
            return (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-8 ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={step.image}
                        alt={displayData.title}
                        className={`w-full h-full object-cover ${objectPositionClass} group-hover:scale-105 transition-transform duration-500`}
                      />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0F425C] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.id}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0F425C] mb-4">
                      {displayData.title}
                    </h3>
                    <p className="text-lg text-[#0F425C]/80 leading-relaxed">
                      {displayData.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {displayData.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#0F425C] mr-3 flex-shrink-0" />
                        <span className="text-[#0F425C]/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  {index < processSteps.length - 1 && (
                    <div className="flex items-center text-[#0F425C]/60">
                      <span className="text-sm font-medium">
                        {language === 'mn' ? 'Дараагийн алхам' : 'Next step'}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Process Summary */}
        <div className="mt-16 text-center">
          <div className="bg-[#0F425C]/5 rounded-2xl p-8 border border-[#0F425C]/10">
            <h3 className="text-2xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Бүх үйл явц дууссаны дараа' : 'After completing all steps'}
            </h3>
            <p className="text-lg text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Таны хүссэн байшин бэлэн болно.Бид бүх ажлыг чанартай, хугацаанд нь хийж гүйцэтгэнэ.'
                : 'Your dream house will be ready. We will complete all work with quality and on time.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
