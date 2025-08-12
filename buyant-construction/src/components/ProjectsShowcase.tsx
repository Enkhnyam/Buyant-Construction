'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, MapPin, Calendar, User, X } from 'lucide-react'
import { getFeaturedProjects, Project } from '@/data/projects'
import { ProjectImage } from './ProjectImage'

export default function ProjectsShowcase() {
  const { language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Get featured projects from static data
  const projects = getFeaturedProjects().slice(0, 6)

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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getText('Сүүлийн төслүүд', 'Recent Projects')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getText(
                'Бидний сая дуусгасан төслүүдийн зарим нь',
                'Some of our recently completed projects'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => openProjectDialog(project)}
              >
                {/* Project Image */}
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images.find(img => img.isPrimary)?.url || project.images[0]?.url}
                      alt={language === 'mn' ? project.titleMn : project.titleEn}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 text-4xl">🏗️</div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      {getCategoryText(project.category)}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {language === 'mn' ? project.titleMn : project.titleEn}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {language === 'mn' ? project.descriptionMn : project.descriptionEn}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{project.completionDate ? new Date(project.completionDate).getFullYear() : 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-2" />
                      <span>{project.clientName || 'N/A'}</span>
                    </div>
                  </div>

                  {/* View Project Button */}
                  <div className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    {getText('Төслийг харах', 'View Project')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <a
              href="/projects"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              {getText('Бүх төслүүдийг харах', 'View All Projects')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeProjectDialog}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {getText(selectedProject.titleMn, selectedProject.titleEn)}
                </h2>
                <button
                  onClick={closeProjectDialog}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out p-2 rounded-full hover:bg-gray-100 transform hover:scale-110"
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
                  <p className="text-gray-600 mb-4">
                    {getText(selectedProject.descriptionMn, selectedProject.descriptionEn)}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
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
                </div>
              </div>

              {/* Additional Images */}
              {selectedProject.images.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {getText('Нэмэлт зурагнууд', 'Additional Images')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={getText(image.captionMn || '', image.captionEn || '')}
                        className="w-full h-24 object-cover rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg transform"
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
