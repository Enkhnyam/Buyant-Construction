'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, MapPin, Calendar, User } from 'lucide-react'
import { getFeaturedProjects, Project } from '@/data/projects'

export default function ProjectsShowcase() {
  const { language } = useLanguage()

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

  if (projects.length === 0) {
    return null
  }

  return (
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
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
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
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  {getText('Төслийг харах', 'View Project')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            {getText('Бүх төслүүдийг харах', 'View All Projects')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
