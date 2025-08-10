'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Users, Award, Target, Heart, CheckCircle, Star } from 'lucide-react'

export default function AboutPage() {
  const { language, t } = useLanguage()

  const teamMembers = [
    {
      name: language === 'mn' ? 'Баянт' : 'Buyant',
      role: language === 'mn' ? 'Барилгын мэргэжилтэн' : 'Construction Specialist',
      description: language === 'mn'
        ? '20 гаруй жилийн туршлагатай барилгын мэргэжилтэн. Олон төрлийн барилгын төсөл амжилттай гүйцэтгэсэн.'
        : 'Construction specialist with over 20 years of experience. Successfully completed various construction projects.',
      expertise: language === 'mn' ? ['Орон сууцны барилга', 'Арилжааны барилга', 'Төслийн удирдлага'] : ['Residential Construction', 'Commercial Construction', 'Project Management']
    },
    {
      name: language === 'mn' ? 'Батцэцэг' : 'Battsetseg',
      role: language === 'mn' ? 'Хуулийн зөвлөх' : 'Legal Consultant',
      description: language === 'mn'
        ? '15 гаруй жилийн туршлагатай хуулийн зөвлөх. Барилгын хуулийн асуудлын мэргэжлийн зөвлөгөө.'
        : 'Legal consultant with over 15 years of experience. Specialized in construction law consultation.',
      expertise: language === 'mn' ? ['Барилгын зөвшөөрөл', 'Гэрээ, хэлцэл', 'Маргааны шийдвэрлэлт'] : ['Construction Permits', 'Contracts & Agreements', 'Dispute Resolution']
    }
  ]

  const values = [
    {
      icon: Heart,
      title: language === 'mn' ? 'Хэрэглэгчийн сэтгэл' : 'Customer Focus',
      description: language === 'mn'
        ? 'Хэрэглэгчийн хүсэл, хэрэгцээг эхэнд тавьж, чанартай үйлчилгээ үзүүлэх'
        : 'Putting customer needs first and providing quality service'
    },
    {
      icon: Target,
      title: language === 'mn' ? 'Чанарын баталгаа' : 'Quality Assurance',
      description: language === 'mn'
        ? 'Хамгийн өндөр чанарын стандартад нийцсэн ажил гүйцэтгэх'
        : 'Delivering work that meets the highest quality standards'
    },
    {
      icon: Users,
      title: language === 'mn' ? 'Гэр бүлийн үнэт зүйлс' : 'Family Values',
      description: language === 'mn'
        ? 'Итгэл, найдвартай байдал, урт хугацааны хамтын ажиллагаа'
        : 'Trust, reliability, and long-term partnership'
    },
    {
      icon: Award,
      title: language === 'mn' ? 'Мэргэжлийн чадвар' : 'Professional Excellence',
      description: language === 'mn'
        ? 'Тасралтгүй суралцах, шинэ технологи нэвтрүүлэх'
        : 'Continuous learning and adoption of new technologies'
    }
  ]

  const achievements = [
    {
      number: '50+',
      label: language === 'mn' ? 'Амжилттай төсөл' : 'Successful Projects'
    },
    {
      number: '20+',
      label: language === 'mn' ? 'Жилийн туршлага' : 'Years Experience'
    },
    {
      number: '100%',
      label: language === 'mn' ? 'Хэрэглэгчийн сэтгэл ханамж' : 'Customer Satisfaction'
    },
    {
      number: '24/7',
      label: language === 'mn' ? 'Дэмжлэг' : 'Support'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0F425C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Бидний тухай' : 'About Us'}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Монголын гэр бүлийн барилгын үйлчилгээний түүх, зорилго, үнэт зүйлс'
              : 'The story, mission, and values of Mongolia\'s family construction service'
            }
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-6">
                {language === 'mn' ? 'Манай түүх' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-lg text-[#0F425C]/80 leading-relaxed">
                <p>
                  {language === 'mn'
                    ? 'Баянт Барилга нь 2003 онд үүсч, Монголын барилгын салбарт 20 гаруй жилийн туршлагатай гэр бүлийн бизнес юм. Бид эхлээд жижиг барилгын ажилгаас эхлээд, одоо орон сууцны болон арилжааны барилгын бүрэн үйлчилгээ үзүүлж байна.'
                    : 'Buyant Construction was established in 2003 and is a family business with over 20 years of experience in Mongolia\'s construction sector. We started with small construction projects and now provide comprehensive services for residential and commercial construction.'
                  }
                </p>
                <p>
                  {language === 'mn'
                    ? 'Манай гэр бүлийн гишүүд тус бүр өөрийн мэргэжлээрээ дээд түвшинд ажиллаж, хэрэглэгчдэдээ хамгийн сайн үйлчилгээг үзүүлэхийг зорьдог. Бид Монголын барилгын салбарт найдвартай, чанартай үйлчилгээг үзүүлэгч компани болж хөгжсөөр байна.'
                    : 'Each member of our family works at the highest level in their profession, aiming to provide the best service to our customers. We have grown to become a reliable and quality service provider in Mongolia\'s construction sector.'
                  }
                </p>
              </div>
            </div>
            <div className="bg-[#F4F2EA] rounded-xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">Б</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0F425C] mb-4">
                  {language === 'mn' ? 'Баянт Барилга' : 'Buyant Construction'}
                </h3>
                <p className="text-[#0F425C]/80">
                  {language === 'mn'
                    ? '2003 онд үүссэн гэр бүлийн бизнес'
                    : 'Family business established in 2003'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F4F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Бидний зорилго' : 'Our Mission'}
              </h3>
              <p className="text-[#0F425C]/80 leading-relaxed">
                {language === 'mn'
                  ? 'Монголын хэрэглэгчдэд чанартай, найдвартай барилгын үйлчилгээг үзүүлж, тэдний мөрөөдлийн гэр, ажлын байрыг бүтээхэд хувь нэмрээ оруулах.'
                  : 'To provide quality and reliable construction services to Mongolian customers and contribute to building their dream homes and workplaces.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Бидний хараа' : 'Our Vision'}
              </h3>
              <p className="text-[#0F425C]/80 leading-relaxed">
                {language === 'mn'
                  ? 'Монголын барилгын салбарт тэргүүлэгч, хэрэглэгчдийн итгэлд нийцсэн, олон улсын стандартад нийцсэн үйлчилгээ үзүүлэгч компани болох.'
                  : 'To become a leading company in Mongolia\'s construction sector, trusted by customers and providing services that meet international standards.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Манай баг' : 'Our Team'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Чадвартай, туршлагатай мэргэжлийн баг'
                : 'Skilled and experienced professional team'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#F4F2EA] rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-[#0F425C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F425C] mb-2">{member.name}</h3>
                  <p className="text-[#0F425C] font-semibold">{member.role}</p>
                </div>
                <p className="text-[#0F425C]/80 leading-relaxed mb-6">{member.description}</p>
                <div>
                  <h4 className="font-semibold text-[#0F425C] mb-3">
                    {language === 'mn' ? 'Мэргэшил:' : 'Expertise:'}
                  </h4>
                  <ul className="space-y-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center text-[#0F425C]/80">
                        <CheckCircle className="w-4 h-4 text-[#0F425C] mr-2 flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-[#F4F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {language === 'mn' ? 'Бидний үнэт зүйлс' : 'Our Values'}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? 'Бидний ажил, үйлчилгээний суурь болсон үнэт зүйлс'
                : 'The values that form the foundation of our work and service'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0F425C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#0F425C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F425C] mb-4">{value.title}</h3>
                <p className="text-[#0F425C]/80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-[#0F425C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'mn' ? 'Бидний амжилтууд' : 'Our Achievements'}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {language === 'mn'
                ? '20 гаруй жилийн туршлагатай барилгын компани'
                : 'Construction company with over 20 years of experience'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{achievement.number}</div>
                <div className="text-white/80">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
