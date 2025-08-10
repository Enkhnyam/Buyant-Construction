'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, User, ArrowRight } from 'lucide-react'

interface Project {
  id: number
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  category: string
  location: string
  completionDate: string
  clientName: string
  featured: boolean
  images: Array<{
    id: number
    imageUrl: string
    captionMn: string
    captionEn: string
    isPrimary: boolean
    order: number
  }>
}

export default function ProjectsCarousel() {
  const { language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?limit=8&featured=true')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const getCategoryText = (category: string) => {
    if (category === 'residential') {
      return language === 'mn' ? 'Орон сууцны' : 'Residential'
    } else if (category === 'commercial') {
      return language === 'mn' ? 'Арилжааны' : 'Commercial'
    }
    return category
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeProjectDialog = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      )
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F425C] mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
              {getText('Сүүлийн төслүүд', 'Featured Projects')}
            </h2>
            <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
              {getText(
                'Бидний сая дуусгасан төслүүдийн зарим нь',
                'Some of our recently completed projects'
              )}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -ml-4 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#0F425C]" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -mr-4 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#0F425C]" />
            </button>

            {/* Carousel Track */}
            <div className="flex gap-6 overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex-shrink-0 w-80 transition-all duration-500 ${
                    index === currentIndex ? 'scale-105' : 'scale-100 opacity-70'
                  }`}
                >
                  <div 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                    onClick={() => openProjectDialog(project)}
                  >
                    {/* Project Image */}
                    <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                      {project.images && project.images.length > 0 ? (
                        <img
                          src={project.images[0].imageUrl}
                          alt={language === 'mn' ? project.images[0].captionMn : project.images[0].captionEn}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-gray-400 text-4xl">🏗️</div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#0F425C] text-white">
                          {getCategoryText(project.category)}
                        </span>
                      </div>
                    </div>

                    {/* Project Info - Minimal */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#0F425C] mb-2 line-clamp-1">
                        {language === 'mn' ? project.titleMn : project.titleEn}
                      </h3>
                      <p className="text-sm text-[#0F425C]/70 mb-3 line-clamp-2">
                        {language === 'mn' ? project.descriptionMn : project.descriptionEn}
                      </p>
                      <div className="flex items-center text-sm text-[#0F425C]/60">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-[#0F425C] scale-125' 
                      : 'bg-[#0F425C]/30 hover:bg-[#0F425C]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeProjectDialog}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#0F425C]">
                {language === 'mn' ? selectedProject.titleMn : selectedProject.titleEn}
              </h2>
              <button
                onClick={closeProjectDialog}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Dialog Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Project Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-3">
                      {getText('Төслийн дэлгэрэнгүй', 'Project Details')}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {language === 'mn' ? selectedProject.descriptionMn : selectedProject.descriptionEn}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-3">
                      {getText('Нэмэлт мэдээлэл', 'Additional Information')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 mr-3 text-[#0F425C]" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-5 h-5 mr-3 text-[#0F425C]" />
                        <span>{new Date(selectedProject.completionDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <User className="w-5 h-5 mr-3 text-[#0F425C]" />
                        <span>{selectedProject.clientName}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0F425C]/10 text-[#0F425C]">
                          {getCategoryText(selectedProject.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Project Images Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-[#0F425C] mb-4">
                      {getText('Төслийн бүх зураг', 'All Project Images')}
                    </h3>
                    <div className="space-y-6">
                      {selectedProject.images.map((image, index) => (
                        <div key={image.id} className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={image.imageUrl}
                              alt={language === 'mn' ? image.captionMn : image.captionEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#0F425C] mb-2">
                              {getText('Зураг', 'Image')} {index + 1}
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {language === 'mn' ? image.captionMn : image.captionEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeProjectDialog}
                    className="bg-[#0F425C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0F425C]/90 transition-colors"
                  >
                    {getText('Хаах', 'Close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
