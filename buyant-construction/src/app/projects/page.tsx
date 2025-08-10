'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Building2, Home, MapPin, Calendar, Users, ArrowRight, Filter, Search } from 'lucide-react'

export default function ProjectsPage() {
  const { language, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: language === 'mn' ? 'Бүгд' : 'All' },
    { id: 'residential', name: language === 'mn' ? 'Орон сууцны' : 'Residential' },
    { id: 'commercial', name: language === 'mn' ? 'Арилжааны' : 'Commercial' },
    { id: 'renovation', name: language === 'mn' ? 'Засалт' : 'Renovation' }
  ]

  const projects = [
    {
      id: 1,
      title: language === 'mn' ? 'Сүхбаатар дүүргийн орон сууцны барилга' : 'Sukhbaatar District Residential Building',
      category: 'residential',
      location: language === 'mn' ? 'Сүхбаатар дүүрэг, Улаанбаатар' : 'Sukhbaatar District, Ulaanbaatar',
      year: '2024',
      area: '2,500',
      areaUnit: language === 'mn' ? 'м²' : 'm²',
      duration: language === 'mn' ? '18 сар' : '18 months',
      team: '15',
      description: language === 'mn' 
        ? '5 давхар орон сууцны барилга, нийт 20 айл. Орчин үеийн дизайн, чанартай барилгын материал.'
        : '5-story residential building with 20 apartments. Modern design and quality construction materials.',
      features: language === 'mn' 
        ? ['Централ халаалт', 'Хаалганы систем', 'Хажуугийн засвар', 'Газрын тосны систем']
        : ['Central heating', 'Door system', 'Side finishing', 'Oil system'],
      status: 'completed',
      image: '/uploads/project1.jpg'
    },
    {
      id: 2,
      title: language === 'mn' ? 'Баянзүрх дүүргийн арилжааны төв' : 'Bayanzurkh District Commercial Center',
      category: 'commercial',
      location: language === 'mn' ? 'Баянзүрх дүүрэг, Улаанбаатар' : 'Bayanzurkh District, Ulaanbaatar',
      year: '2023',
      area: '5,000',
      areaUnit: language === 'mn' ? 'м²' : 'm²',
      duration: language === 'mn' ? '24 сар' : '24 months',
      team: '25',
      description: language === 'mn'
        ? 'Олон давхар арилжааны төв, дэлгүүр, ресторан, оффисын байр. Орчин үеийн архитектур.'
        : 'Multi-story commercial center with shops, restaurants, and office spaces. Modern architecture.',
      features: language === 'mn'
        ? ['Цахилгаан шат', 'Хажуугийн засвар', 'Дээврийн засвар', 'Хаалганы систем']
        : ['Electric elevator', 'Side finishing', 'Roof finishing', 'Door system'],
      status: 'completed',
      image: '/uploads/project2.jpg'
    },
    {
      id: 3,
      title: language === 'mn' ? 'Хан-Уул дүүргийн гэр засвар' : 'Khan-Uul District House Renovation',
      category: 'renovation',
      location: language === 'mn' ? 'Хан-Уул дүүрэг, Улаанбаатар' : 'Khan-Uul District, Ulaanbaatar',
      year: '2024',
      area: '180',
      areaUnit: language === 'mn' ? 'м²' : 'm²',
      duration: language === 'mn' ? '3 сар' : '3 months',
      team: '8',
      description: language === 'mn'
        ? 'Хуучин гэрний бүрэн засвар, дотор, гадна хэсгийн шинэчлэл. Орчин үеийн дизайн.'
        : 'Complete renovation of an old house, interior and exterior updates. Modern design.',
      features: language === 'mn'
        ? ['Дотор засвар', 'Гадна засвар', 'Цахилгаан', 'Халаалт']
        : ['Interior finishing', 'Exterior finishing', 'Electrical', 'Heating'],
      status: 'completed',
      image: '/uploads/project3.jpg'
    },
    {
      id: 4,
      title: language === 'mn' ? 'Сонгинохайрхан дүүргийн орон сууцны комплекс' : 'Songinokhairkhan District Residential Complex',
      category: 'residential',
      location: language === 'mn' ? 'Сонгинохайрхан дүүрэг, Улаанбаатар' : 'Songinokhairkhan District, Ulaanbaatar',
      year: '2023',
      area: '8,000',
      areaUnit: language === 'mn' ? 'м²' : 'm²',
      duration: language === 'mn' ? '30 сар' : '30 months',
      team: '35',
      description: language === 'mn'
        ? 'Том орон сууцны комплекс, нийт 60 айл. Хүүхдийн тоглоомын талбай, цэцэрлэг.'
        : 'Large residential complex with 60 apartments. Children\'s playground and garden.',
      features: language === 'mn'
        ? ['Хүүхдийн тоглоомын талбай', 'Цэцэрлэг', 'Хажуугийн засвар', 'Хаалганы систем']
        : ['Children\'s playground', 'Garden', 'Side finishing', 'Door system'],
      status: 'completed',
      image: '/uploads/project4.jpg'
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'mn' ? 'Бидний төслүүд' : 'Our Projects'}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {language === 'mn'
              ? 'Амжилттай гүйцэтгэсэн барилгын төслүүд, чанартай ажлын жишээ'
              : 'Successfully completed construction projects and examples of quality work'
            }
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'mn' ? 'Төсөл хайх...' : 'Search projects...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {language === 'mn' ? 'Төсөл олдсонгүй' : 'No projects found'}
              </h3>
              <p className="text-gray-500">
                {language === 'mn' 
                  ? 'Хайлтын нөхцөлд тохирох төсөл байхгүй байна'
                  : 'No projects match your search criteria'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-blue-600" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'residential' ? 'bg-blue-100 text-blue-800' :
                        project.category === 'commercial' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Home className="w-4 h-4 mr-2" />
                        {project.area} {project.areaUnit}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {language === 'mn' ? `${project.team} хүн` : `${project.team} people`}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                    {/* Project Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        {language === 'mn' ? 'Онцлог шийдэл:' : 'Key Features:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{project.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center">
                      {language === 'mn' ? 'Дэлгэрэнгүй' : 'View Details'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'mn' ? 'Төслийн статистик' : 'Project Statistics'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'mn'
                ? '20 гаруй жилийн туршлагатай барилгын компанийн амжилтууд'
                : 'Achievements of a construction company with over 20 years of experience'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">
                {language === 'mn' ? 'Амжилттай төсөл' : 'Successful Projects'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-gray-600">
                {language === 'mn' ? 'м² барилга' : 'm² Built'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">
                {language === 'mn' ? 'Хэрэглэгчийн сэтгэл ханамж' : 'Customer Satisfaction'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">20+</div>
              <div className="text-gray-600">
                {language === 'mn' ? 'Жилийн туршлага' : 'Years Experience'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'mn' 
              ? 'Таны төслийг эхлүүлье'
              : 'Let\'s Start Your Project'
            }
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {language === 'mn'
              ? 'Чөлөөт зөвлөгөө авахын тулд бидэнтэй холбоо барина уу'
              : 'Contact us for a free consultation about your project'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              {t('common.contactUs')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="tel:+976-11-123456"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              +976 11 123 456
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
