'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X
} from 'lucide-react'
import ImageGalleryManager from '@/components/admin/ImageGalleryManager'

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
  testimonialMn: string
  testimonialEn: string
  featured: boolean
  published: boolean
  images: ProjectImage[]
}

interface ProjectImage {
  id?: number | string
  imageUrl: string
  captionMn: string
  captionEn: string
  isPrimary: boolean
  order: number
  file?: File
  preview?: string
  isExisting?: boolean // Added for tracking existing images
}

interface ProjectFormData {
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  category: string
  location: string
  completionDate: string
  clientName: string
  testimonialMn: string
  testimonialEn: string
  featured: boolean
  published: boolean
}

export default function AdminProjectsPage() {
  const { language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    titleMn: '',
    titleEn: '',
    descriptionMn: '',
    descriptionEn: '',
    category: 'residential',
    location: '',
    completionDate: '',
    clientName: '',
    testimonialMn: '',
    testimonialEn: '',
    featured: false,
    published: true
  })
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([])

  const categories = [
    { value: 'residential', label: language === 'mn' ? 'Орон сууцны' : 'Residential' },
    { value: 'commercial', label: language === 'mn' ? 'Арилжааны' : 'Commercial' },
    { value: 'renovation', label: language === 'mn' ? 'Засалт' : 'Renovation' }
  ]

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImagesChange = (images: ProjectImage[]) => {
    setProjectImages(images)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      
      // Add project data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value))
      })
      
      // Add images with proper tracking of existing vs. new
      projectImages.forEach((image) => {
        if (image.file) {
          // New image file
          formDataToSend.append('images', image.file)
          formDataToSend.append('imageTypes', 'new')
        } else if (image.isExisting) {
          // Existing image - send the URL
          formDataToSend.append('existingImageUrls', image.imageUrl)
          formDataToSend.append('imageTypes', 'existing')
        }
        
        // Add caption and metadata for all images
        formDataToSend.append('imageCaptions', `[${image.captionMn || ''}][${image.captionEn || ''}]`)
        formDataToSend.append('imageOrder', String(image.order))
        formDataToSend.append('imagePrimary', String(image.isPrimary))
      })

      const url = editingProject 
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects'
      
      const method = editingProject ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      })

      if (response.ok) {
        setShowForm(false)
        setEditingProject(null)
        resetForm()
        fetchProjects()
      } else {
        const errorData = await response.json()
        console.error('Failed to save project:', errorData)
        alert(language === 'mn' ? 'Төслийг хадгалахад алдаа гарлаа' : 'Failed to save project')
      }
    } catch (error) {
      console.error('Failed to save project:', error)
      alert(language === 'mn' ? 'Төслийг хадгалахад алдаа гарлаа' : 'Failed to save project')
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      titleMn: project.titleMn,
      titleEn: project.titleEn,
      descriptionMn: project.descriptionMn,
      descriptionEn: project.descriptionEn,
      category: project.category,
      location: project.location,
      completionDate: project.completionDate ? project.completionDate.split('T')[0] : '',
      clientName: project.clientName || '',
      testimonialMn: project.testimonialMn || '',
      testimonialEn: project.testimonialEn || '',
      featured: project.featured,
      published: project.published
    })
    // Convert existing images to the format expected by ImageGalleryManager
    const formattedImages = project.images.map((img, index) => ({
      ...img,
      order: index,
      file: undefined,
      preview: img.imageUrl,
      isExisting: true // Mark as existing image
    }))
    setProjectImages(formattedImages)
    setShowForm(true)
  }

  const handleDelete = async (projectId: number) => {
    if (!confirm(language === 'mn' ? 'Төслийг устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      titleMn: '',
      titleEn: '',
      descriptionMn: '',
      descriptionEn: '',
      category: 'residential',
      location: '',
      completionDate: '',
      clientName: '',
      testimonialMn: '',
      testimonialEn: '',
      featured: false,
      published: true
    })
    setProjectImages([])
  }

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getText('Төслүүд', 'Projects')}
          </h1>
          <p className="mt-2 text-gray-600">
            {getText(
              'Төслүүдийг удирдах, нэмэх, засах',
              'Manage, add, and edit projects'
            )}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {getText('Шинэ төсөл', 'New Project')}
        </button>
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingProject 
                ? getText('Төсөл засах', 'Edit Project')
                : getText('Шинэ төсөл', 'New Project')
              }
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingProject(null)
                resetForm()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Гарчиг (Монгол)', 'Title (Mongolian)')} *
                </label>
                <input
                  type="text"
                  name="titleMn"
                  value={formData.titleMn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Гарчиг (Англи)', 'Title (English)')} *
                </label>
                <input
                  type="text"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Ангилал', 'Category')} *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Байршил', 'Location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Дууссан огноо', 'Completion Date')}
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Тайлбар (Монгол)', 'Description (Mongolian)')} *
                </label>
                <textarea
                  name="descriptionMn"
                  value={formData.descriptionMn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Тайлбар (Англи)', 'Description (English)')} *
                </label>
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Харилцагчийн нэр', 'Client Name')}
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Сэтгэгдэл (Монгол)', 'Testimonial (Mongolian)')}
                </label>
                <textarea
                  name="testimonialMn"
                  value={formData.testimonialMn}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText('Сэтгэгдэл (Англи)', 'Testimonial (English)')}
                </label>
                <textarea
                  name="testimonialEn"
                  value={formData.testimonialEn}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {getText('Онцлох төсөл', 'Featured Project')}
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {getText('Нийтлэх', 'Published')}
                </span>
              </label>
            </div>

            {/* Image Gallery Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText('Зурагнууд', 'Images')}
              </label>
              <ImageGalleryManager
                images={projectImages}
                onImagesChange={handleImagesChange}
                maxImages={10}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProject(null)
                  resetForm()
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {getText('Цуцлах', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingProject 
                  ? getText('Хадгалах', 'Save Changes')
                  : getText('Үүсгэх', 'Create Project')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Бүх төслүүд', 'All Projects')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Төсөл', 'Project')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Ангилал', 'Category')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Байршил', 'Location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Төлөв', 'Status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Үйлдэл', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {language === 'mn' ? project.titleMn : project.titleEn}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.clientName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.category === 'residential' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'commercial' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {categories.find(c => c.value === project.category)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {getText('Онцлох', 'Featured')}
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        project.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.published 
                          ? getText('Нийтлэгдсэн', 'Published')
                          : getText('Ноорог', 'Draft')
                        }
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-900"
                        title={getText('Засах', 'Edit')}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900"
                        title={getText('Устгах', 'Delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
