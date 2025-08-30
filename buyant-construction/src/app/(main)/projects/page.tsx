'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Building2, Home, MapPin, ArrowRight, X } from 'lucide-react'
import { projects, Project } from '@/data/projects'

export default function ProjectsPage() {
  const { language, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = projects.sort((a, b) => a.order - b.order)

  const getProjectDisplayData = (project: Project) => {
    const title = language === 'mn' ? project.titleMn : project.titleEn
    const description = language === 'mn' ? project.descriptionMn : project.descriptionEn
    const year = project.completionDate ? new Date(project.completionDate).getFullYear().toString() : 'N/A'
    
    // Use project data if available, otherwise default values
    const area = project.area || 'N/A'
    const areaUnit = language === 'mn' ? 'м²' : 'm²'

    return {
      title,
      description,
      year,
      area,
      areaUnit
    }
  }

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDialog = () => {
    setSelectedProject(null)
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en



  const getStatusText = (status?: 'sold' | 'in_construction' | 'available') => {
    if (status === 'available') return language === 'mn' ? 'Зарна' : 'For Sale'
    if (status === 'in_construction') return language === 'mn' ? 'Баригдаж байна' : 'In Construction'
    if (status === 'sold') return language === 'mn' ? 'Зарагдсан' : 'Sold'
    return ''
  }

  const getStatusClass = (status?: 'sold' | 'in_construction' | 'available') => {
    if (status === 'available') return 'bg-green-100 text-green-800 border-green-200'
    if (status === 'in_construction') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#0F425C] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'mn' ? 'Бидний төслүүд' : 'Our Projects'}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              {language === 'mn'
                ? 'Амжилттай гүйцэтгэсэн барилгын төслүүд, чанартай ажлын жишээ'
                : 'Successfully completed construction projects and examples of quality work'
              }
            </p>
          </div>
        </section>



        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="w-16 h-16 text-[#0F425C]/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0F425C]/60 mb-2">
                  {language === 'mn' ? 'Төсөл олдсонгүй' : 'No projects found'}
                </h3>
                <p className="text-[#0F425C]/50">
                  {language === 'mn' 
                    ? 'Хайлтын нөхцөлд тохирох төсөл байхгүй байна'
                    : 'No projects match your search criteria'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => {
                  const displayData = getProjectDisplayData(project)
                  const primaryImage = (() => {
                    // First try to find the primary image
                    const primaryImg = project.images.find(img => img.isPrimary)
                    if (primaryImg) {
                      return primaryImg.url
                    }
                    // Fallback to first image if no primary image found
                    return project.images[0]?.url || ''
                  })()
                  
                  return (
                    <div 
                      key={project.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col"
                      onClick={() => openProjectDialog(project)}
                    >
                      {/* Project Image */}
                      <div className="h-48 bg-gradient-to-br from-[#0F425C]/10 to-[#0F425C]/20 flex items-center justify-center overflow-hidden">
                        {primaryImage ? (
                          <img
                            src={primaryImage}
                            alt={displayData.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-16 h-16 text-[#0F425C]" />
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          {project.status && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusClass(project.status)}`}
                            >
                              {getStatusText(project.status)}
                            </span>
                          )}
                          <span className="text-sm text-[#0F425C]/50">{displayData.year}</span>
                        </div>

                        <h3 className="text-xl font-bold text-[#0F425C] mb-3">{displayData.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-[#0F425C]/80">
                            <MapPin className="w-4 h-4 mr-2" />
                            {project.location}
                          </div>
                          <div className="flex items-center text-sm text-[#0F425C]/80">
                            <Home className="w-4 h-4 mr-2" />
                            {displayData.area} {displayData.areaUnit}
                          </div>
                        </div>

                        <p className="text-[#0F425C]/80 text-sm mb-4 line-clamp-3">{displayData.description}</p>

                        <button
                          type="button"
                          className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-[#0F425C] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0F425C]/90 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02] hover:shadow-lg group"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectDialog(project);
                          }}
                        >
                          {language === 'mn' ? 'Дэлгэрэнгүй' : 'View Details'}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        {/* Removed contact button from cards per request */}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-[#F4F2EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Төслийн статистик' : 'Project Statistics'}
              </h2>
              <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
                {language === 'mn'
                  ? '20 гаруй жилийн туршлагатай барилгын компанийн амжилтууд'
                  : 'Achievements of a construction company with over 20 years of experience'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0F425C] mb-2">{projects.length}+</div>
                <div className="text-[#0F425C]/80">
                  {language === 'mn' ? 'Амжилттай төсөл' : 'Successful Projects'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0F425C] mb-2">25,000+</div>
                <div className="text-[#0F425C]/80">
                  {language === 'mn' ? 'м² барилга' : 'm² Built'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0F425C] mb-2">100%</div>
                <div className="text-[#0F425C]/80">
                  {language === 'mn' ? 'Хэрэглэгчийн сэтгэл ханамж' : 'Customer Satisfaction'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#0F425C] mb-2">20+</div>
                <div className="text-[#0F425C]/80">
                  {language === 'mn' ? 'Жилийн туршлага' : 'Years Experience'}
                </div>
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
                href="tel:+976-99054762"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#0F425C] transition-colors inline-flex items-center justify-center"
              >
                +976 99054762
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeProjectDialog}
        >
          <div 
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-bold text-[#0F425C]">
                  {getText(selectedProject.titleMn, selectedProject.titleEn)}
                </h2>
                <button
                  onClick={closeProjectDialog}
                  className="text-[#0F425C] hover:text-[#0F425C]/80 transition-all duration-300 ease-in-out p-2 rounded-full hover:bg-gray-100 transform hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Project Description and Details */}
              <div className="mb-10">
                <p className="text-[#0F425C]/80 mb-8 text-lg leading-relaxed">
                  {getText(selectedProject.descriptionMn, selectedProject.descriptionEn)}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#0F425C]/60">
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">Location:</span> {selectedProject.location}
                  </div>
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">Completion Date:</span> {selectedProject.completionDate ? new Date(selectedProject.completionDate).getFullYear() : 'N/A'}
                  </div>
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">Client:</span> {selectedProject.clientName || 'N/A'}
                  </div>
                </div>
              </div>

              {/* All Project Images - Alternating Layout */}
              <div className="space-y-10">
                <h3 className="text-2xl font-semibold text-[#0F425C] mb-8">
                  {getText('Төслийн зурагнууд', 'Project Images')}
                </h3>
                {selectedProject.images.map((image, index) => (
                  <div key={index} className={`flex items-center gap-10 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <img
                        src={image.url}
                        alt={getText(image.captionMn || '', image.captionEn || '') || `Project image ${index + 1}`}
                        className="w-full h-80 object-cover rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.02] hover:shadow-xl transform"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-lg font-semibold text-[#0F425C] mb-4">
                        {getText(image.captionMn || `Image ${index + 1}`, image.captionEn || `Image ${index + 1}`)}
                      </h4>
                      <p className="text-[#0F425C]/70 text-sm leading-relaxed">
                        {index === 0 ? (
                          getText(
                            'Энэ бол төслийн үндсэн зураг бөгөөд төслийн ерөнхий харагдах байдлыг харуулж байна.',
                            'This is the main project image showing the overall view of the project.'
                          )
                        ) : (
                          getText(
                            'Төслийн дэлгэрэнгүй харагдах байдлыг харуулж буй зураг.',
                            'Detailed view of the project showing specific aspects and features.'
                          )
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions - show contact button for available projects */}
              {selectedProject?.status === 'available' && (
                <div className="mt-10 text-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    {language === 'mn' ? 'Холбоо барих' : 'Contact Us'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
