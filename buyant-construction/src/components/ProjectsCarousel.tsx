'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ProjectImage } from './ProjectImage'
import { ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react'
import { getProjects, Project } from '@/data/projects'
import Link from 'next/link'

export default function ProjectsCarousel() {
  const { language, isHydrated } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [slideWidth, setSlideWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Use all published projects (up to 6)
  const projects = getProjects().slice(0, 6)

  // Sliding math
  const VISIBLE_CARDS = 3
  const numPositions = Math.max(1, projects.length - VISIBLE_CARDS + 1)
  const maxIndex = numPositions - 1

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

  // Fix 1: Update navigation logic to move by 1 card instead of 3
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1
      const project = projects[newIndex]
      setAnnouncement(`${getText(project.titleMn, project.titleEn)} - ${language === 'mn' ? 'Төсөл' : 'Project'} ${newIndex + 1} ${language === 'mn' ? 'үзэж байна' : 'showing'}`)
      return newIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex <= 0 ? maxIndex : prevIndex - 1
      const project = projects[newIndex]
      setAnnouncement(`${getText(project.titleMn, project.titleEn)} - ${language === 'mn' ? 'Төсөл' : 'Project'} ${newIndex + 1} ${language === 'mn' ? 'үзэж байна' : 'showing'}`)
      return newIndex
    })
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && projects.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPaused, projects.length])

  const pauseAutoPlay = () => {
    setIsPaused(true)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    setIsPaused(false)
  }

  // Touch/Swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50 // minimum distance for swipe
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide()
      } else {
        // Swipe right - previous slide
        prevSlide()
      }
    }
    
    setIsDragging(false)
  }

  // Measure slide width (1/3 of the visible container)
  useEffect(() => {
    const updateSlideWidth = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth
        setSlideWidth(containerWidth / 3)
      }
    }
    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)
    return () => window.removeEventListener('resize', updateSlideWidth)
  }, [])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'Escape' && selectedProject) {
        closeProjectDialog()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

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
      {/* Screen reader announcement for slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

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
            <div 
              className="flex overflow-hidden"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              onFocus={pauseAutoPlay}
              onBlur={resumeAutoPlay}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * slideWidth + (isDragging ? Math.min(Math.max(startX - currentX, -slideWidth), slideWidth) : 0)}px)`,
                  transitionProperty: isDragging ? 'none' : 'transform'
                }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-1/3 flex-shrink-0 px-3 md:px-3 px-2">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1">
                      <div className="relative h-32 md:h-48">
                        <ProjectImage
                          src={project.images.find(img => img.isPrimary)?.url || project.images[0]?.url || ''}
                          alt={getText(project.titleMn, project.titleEn)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#0F425C] text-white px-2 py-1 rounded-full text-xs font-medium">
                            {getCategoryText(project.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        {isHydrated && (
                          <>
                            <h3 className="text-base md:text-lg font-semibold text-[#0F425C] mb-2 line-clamp-1">
                              {getText(project.titleMn, project.titleEn)}
                            </h3>
                            <p className="text-[#0F425C]/80 mb-3 line-clamp-2 text-xs md:text-sm">
                              {getText(project.descriptionMn, project.descriptionEn)}
                            </p>
                            <div className="flex items-center justify-between text-xs text-[#0F425C]/60 mb-3">
                              <span className="truncate">{project.location}</span>
                              <span>{project.completionDate ? new Date(project.completionDate).getFullYear() : 'N/A'}</span>
                            </div>
                          </>
                        )}
                        <button
                          onClick={() => openProjectDialog(project)}
                          className="w-full bg-[#0F425C] text-white py-2 px-3 rounded-lg hover:bg-[#0F425C]/90 transition-all duration-300 ease-in-out text-xs md:text-sm font-medium transform hover:scale-[1.02] hover:shadow-lg"
                        >
                          {isHydrated ? (language === 'mn' ? 'Дэлгэрэнгүй' : 'View Details') : ''}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fix 3: Update dots indicator to show correct navigation points */}
            <div className="flex justify-center mt-6 md:mt-8 space-x-2" role="tablist" aria-label={language === 'mn' ? 'Төслүүдийн жагсаалт' : 'Project navigation'}>
              {Array.from({ length: numPositions }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    pauseAutoPlay()
                    const project = projects[index]
                    setAnnouncement(`${getText(project.titleMn, project.titleEn)} - ${language === 'mn' ? 'Төсөл' : 'Project'} ${index + 1} ${language === 'mn' ? 'үзэж байна' : 'showing'}`)
                    setCurrentIndex(index)
                  }}
                  role="tab"
                  aria-selected={currentIndex === index}
                  aria-label={`${language === 'mn' ? 'Төсөл' : 'Project'} ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2 ${
                    currentIndex === index ? 'bg-[#0F425C]' : 'bg-[#0F425C]/30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows - Improved for mobile */}
            <button
              onClick={() => {
                pauseAutoPlay()
                prevSlide()
              }}
              aria-label={language === 'mn' ? 'Өмнөх төсөл' : 'Previous project'}
              className="absolute -left-2 md:-left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-2 md:p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => {
                pauseAutoPlay()
                nextSlide()
              }}
              aria-label={language === 'mn' ? 'Дараагийн төсөл' : 'Next project'}
              className="absolute -right-2 md:-right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F425C] p-2 md:p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Fix 4: Add "View All Projects" button */}
          <div className="text-center mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-[#0F425C] text-white rounded-lg hover:bg-[#0F425C]/90 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2"
            >
              {language === 'mn' ? 'Бүх төслүүдийг харах' : 'View All Projects'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          aria-describedby="project-description"
        >
          <div 
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                {isHydrated && (
                  <h2 id="project-title" className="text-3xl font-bold text-[#0F425C]">
                    {getText(selectedProject.titleMn, selectedProject.titleEn)}
                  </h2>
                )}
                <button
                  onClick={closeProjectDialog}
                  aria-label={language === 'mn' ? 'Хаах' : 'Close'}
                  className="text-[#0F425C] hover:text-[#0F425C]/80 transition-all duration-300 ease-in-out p-2 rounded-full hover:bg-gray-100 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Project Description and Details */}
              <div className="mb-10">
                <p id="project-description" className="text-[#0F425C]/80 mb-8 text-lg leading-relaxed">
                  {getText(selectedProject.descriptionMn, selectedProject.descriptionEn)}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#0F425C]/60">
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">{language === 'mn' ? 'Төрөл:' : 'Category:'}</span> {getCategoryText(selectedProject.category)}
                  </div>
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">{language === 'mn' ? 'Байршил:' : 'Location:'}</span> {selectedProject.location}
                  </div>
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">{language === 'mn' ? 'Дууссан огноо:' : 'Completion Date:'}</span> {selectedProject.completionDate ? new Date(selectedProject.completionDate).getFullYear() : 'N/A'}
                  </div>
                  <div className="bg-[#0F425C]/5 p-3 rounded-lg">
                    <span className="font-medium">{language === 'mn' ? 'Захиалагч:' : 'Client:'}</span> {selectedProject.clientName || 'N/A'}
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

              {/* Fix 5: Add navigation button in modal to projects page */}
              <div className="mt-10 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-[#0F425C] text-white rounded-lg hover:bg-[#0F425C]/90 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0F425C] focus:ring-offset-2"
                >
                  {language === 'mn' ? 'Бүх төслүүдийг харах' : 'View All Projects'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
