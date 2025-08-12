'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ProjectImage } from './ProjectImage'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getFeaturedProjects, Project } from '@/data/projects'

export default function ProjectsCarousel() {
  const { language, isHydrated } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Get featured projects from static data
  const projects = getFeaturedProjects().slice(0, 8)

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const getCategoryText = (category: string) => {
    if (category === 'residential') {
      return language === 'mn' ? 'Орон сууцны' : 'Residential'
    } else if (category === 'commercial') {
      return language === 'mn' ? 'Арилжааны' : 'Commercial'
    } else if (category === 'renovation') {
      return language === 'mn' ? 'Засалт' : 'Renovation'
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
      prevIndex === 0 ? projects.length - 1 : prevIndex + 1
    )
  }

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectDialog = () => {
    setSelectedProject(null)
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isHydrated && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F425C] mb-4">
                {language === 'mn' ? 'Сүүлийн төслүүд' : 'Recent Projects'}
              </h2>
              <p className="text-xl text-[#0F425C]/80 max-w-2xl mx-auto">
                {language === 'mn'
                  ? 'Бидний сүүлийн үеийн амжилттай төслүүд'
                  : 'Our latest successful projects'
                }
              </p>
            </div>
          )}

          <div className="relative">
            <div className="flex overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <ProjectImage
                          src={project.images.find(img => img.isPrimary)?.url || project.images[0]?.url || ''}
                          alt={getText(project.titleMn, project.titleEn)}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#0F425C] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {getCategoryText(project.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        {isHydrated && (
                          <>
                            <h3 className="text-xl font-semibold text-[#0F425C] mb-2">
                              {getText(project.titleMn, project.titleEn)}
                            </h3>
                            <p className="text-[#0F425C]/80 mb-4 line-clamp-2">
                              {getText(project.descriptionMn, project.descriptionEn)}
                            </p>
                            <div className="flex items-center justify-between text-sm text-[#0F425C]/60">
                              <span>{project.location}</span>
                              <span>{project.completionDate ? new Date(project.completionDate).getFullYear() : 'N/A'}</span>
                            </div>
                          </>
                        )}
                        <button
                          onClick={() => openProjectDialog(project)}
                          className="mt-4 w-full bg-[#0F425C] text-white py-2 px-4 rounded-lg hover:bg-[#0F425C]/90 transition-colors"
                        >
                          {isHydrated ? (language === 'mn' ? 'Дэлгэрэнгүй' : 'View Details') : ''}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#0F425C]' : 'bg-[#0F425C]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                {isHydrated && (
                  <h2 className="text-2xl font-bold text-[#0F425C]">
                    {getText(selectedProject.titleMn, selectedProject.titleEn)}
                  </h2>
                )}
                <button
                  onClick={closeProjectDialog}
                  className="text-[#0F425C] hover:text-[#0F425C]/80 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ProjectImage
                    src={selectedProject.images.find(img => img.isPrimary)?.url || selectedProject.images[0]?.url || ''}
                    alt={getText(selectedProject.titleMn, selectedProject.titleEn)}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  {isHydrated && (
                    <>
                      <p className="text-[#0F425C]/80 mb-4">
                        {getText(selectedProject.descriptionMn, selectedProject.descriptionEn)}
                      </p>
                      <div className="space-y-2 text-sm text-[#0F425C]/60">
                        <div>
                          <span className="font-medium">Category:</span> {getCategoryText(selectedProject.category)}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {selectedProject.location}
                        </div>
                        <div>
                          <span className="font-medium">Completion Date:</span> {selectedProject.completionDate ? new Date(selectedProject.completionDate).getFullYear() : 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Client:</span> {selectedProject.clientName || 'N/A'}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              {selectedProject.images.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#0F425C] mb-4">
                    {isHydrated ? (language === 'mn' ? 'Нэмэлт зурагнууд' : 'Additional Images') : ''}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.images.slice(1).map((image, index) => (
                      <ProjectImage
                        key={index}
                        src={image.url}
                        alt={getText(image.captionMn || '', image.captionEn || '')}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
