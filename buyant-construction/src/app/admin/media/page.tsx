'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Trash2, 
  Download,
  Eye,
  Copy,
  FolderOpen,
  FileImage,
  FileText,
  FileVideo
} from 'lucide-react'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  uploadedAt: string
  uploadedBy: string
  category: string
  tags: string[]
  usage: string[]
}

interface MediaStats {
  totalFiles: number
  totalSize: number
  images: number
  documents: number
  videos: number
  other: number
}

export default function AdminMediaLibraryPage() {
  const { language } = useLanguage()
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<MediaStats>({
    totalFiles: 0,
    totalSize: 0,
    images: 0,
    documents: 0,
    videos: 0,
    other: 0
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const categories = [
    { value: 'all', label: language === 'mn' ? 'Бүгд' : 'All' },
    { value: 'projects', label: language === 'mn' ? 'Төслүүд' : 'Projects' },
    { value: 'services', label: language === 'mn' ? 'Үйлчилгээнүүд' : 'Services' },
    { value: 'testimonials', label: language === 'mn' ? 'Сэтгэгдлүүд' : 'Testimonials' },
    { value: 'general', label: language === 'mn' ? 'Ерөнхий' : 'General' }
  ]

  useEffect(() => {
    fetchMediaFiles()
  }, [])

  useEffect(() => {
    filterFiles()
  }, [mediaFiles, searchTerm, selectedCategory])

  const fetchMediaFiles = async () => {
    try {
      // This would be replaced with actual API call
      // For now, using mock data
      const mockFiles: MediaFile[] = [
        {
          id: '1',
          filename: 'project1-main.jpg',
          originalName: 'project1-main.jpg',
          mimeType: 'image/jpeg',
          size: 2048576,
          url: '/uploads/project1-main.jpg',
          thumbnailUrl: '/uploads/project1-main.jpg',
          uploadedAt: '2024-01-15T10:30:00Z',
          uploadedBy: 'admin',
          category: 'projects',
          tags: ['exterior', 'modern'],
          usage: ['project1']
        },
        {
          id: '2',
          filename: 'service-renovation.jpg',
          originalName: 'service-renovation.jpg',
          mimeType: 'image/jpeg',
          size: 1536000,
          url: '/uploads/service-renovation.jpg',
          thumbnailUrl: '/uploads/service-renovation.jpg',
          uploadedAt: '2024-01-14T14:20:00Z',
          uploadedBy: 'admin',
          category: 'services',
          tags: ['renovation', 'interior'],
          usage: ['renovation-service']
        }
      ]
      
      setMediaFiles(mockFiles)
      calculateStats(mockFiles)
    } catch (error) {
      console.error('Failed to fetch media files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (files: MediaFile[]) => {
    const stats: MediaStats = {
      totalFiles: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      images: files.filter(f => f.mimeType.startsWith('image/')).length,
      documents: files.filter(f => f.mimeType.startsWith('application/') || f.mimeType.startsWith('text/')).length,
      videos: files.filter(f => f.mimeType.startsWith('video/')).length,
      other: files.filter(f => !f.mimeType.startsWith('image/') && !f.mimeType.startsWith('application/') && !f.mimeType.startsWith('text/') && !f.mimeType.startsWith('video/')).length
    }
    setStats(stats)
  }

  const filterFiles = () => {
    let filtered = mediaFiles

    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(file => file.category === selectedCategory)
    }

    setFilteredFiles(filtered)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      formData.append('category', selectedCategory)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      clearInterval(interval)
      setUploadProgress(100)

      // Refresh media files
      setTimeout(() => {
        fetchMediaFiles()
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)

    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileDelete = async (fileId: string) => {
    if (!confirm(language === 'mn' ? 'Файлыг устгахдаа итгэлтэй байна уу?' : 'Are you sure you want to delete this file?')) {
      return
    }

    try {
      // This would be replaced with actual API call
      setMediaFiles(prev => prev.filter(f => f.id !== fileId))
      calculateStats(mediaFiles.filter(f => f.id !== fileId))
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return
    
    if (!confirm(language === 'mn' 
      ? `${selectedFiles.size} файлыг устгахдаа итгэлтэй байна уу?` 
      : `Are you sure you want to delete ${selectedFiles.size} files?`
    )) {
      return
    }

    try {
      // This would be replaced with actual API call
      setMediaFiles(prev => prev.filter(f => !selectedFiles.has(f.id)))
      setSelectedFiles(new Set())
      calculateStats(mediaFiles.filter(f => !selectedFiles.has(f.id)))
    } catch (error) {
      console.error('Bulk delete failed:', error)
    }
  }

  const toggleFileSelection = (fileId: string) => {
    const newSelection = new Set(selectedFiles)
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId)
    } else {
      newSelection.add(fileId)
    }
    setSelectedFiles(newSelection)
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage className="w-8 h-8 text-blue-500" />
    if (mimeType.startsWith('video/')) return <FileVideo className="w-8 h-8 text-red-500" />
    if (mimeType.startsWith('application/') || mimeType.startsWith('text/')) return <FileText className="w-8 h-8 text-green-500" />
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
            {getText('Медиа сан', 'Media Library')}
          </h1>
          <p className="mt-2 text-gray-600">
            {getText(
              'Бүх медиа файлуудыг удирдах, зохион байгуулах',
              'Manage and organize all media files'
            )}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileImage className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Нийт файл', 'Total Files')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileImage className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Зурагнууд', 'Images')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.images}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Баримтууд', 'Documents')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.documents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FileVideo className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Видеонууд', 'Videos')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.videos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FolderOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {getText('Нийт хэмжээ', 'Total Size')}
              </p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(stats.totalSize)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {getText('Файл оруулах', 'Upload Files')}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                {getText('Файл сонгох', 'Choose Files')}
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,application/*,text/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'mn' ? 'Файл хайх...' : 'Search files...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          {selectedFiles.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {getText(`${selectedFiles.size} устгах`, `Delete ${selectedFiles.size}`)}
            </button>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Files */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`bg-white rounded-lg shadow border border-gray-200 p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => toggleFileSelection(file.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.id)}
                  onChange={() => toggleFileSelection(file.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(file.url, '_blank')
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    title={getText('Харах', 'View')}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(file.url)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    title={getText('Холбоос хуулах', 'Copy Link')}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-center">
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={file.thumbnailUrl || file.url}
                    alt={file.filename}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-3">
                    {getFileIcon(file.mimeType)}
                  </div>
                )}

                <div className="text-sm font-medium text-gray-900 truncate mb-1">
                  {file.filename}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedFiles.size === filteredFiles.length && filteredFiles.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles(new Set(filteredFiles.map(f => f.id)))
                        } else {
                          setSelectedFiles(new Set())
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getText('Файл', 'File')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getText('Хэмжээ', 'Size')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getText('Ангилал', 'Category')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getText('Огноо', 'Date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getText('Үйлдэл', 'Actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(file.mimeType)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {file.filename}
                          </div>
                          <div className="text-sm text-gray-500">
                            {file.mimeType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {categories.find(c => c.value === file.category)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(file.url, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          title={getText('Харах', 'View')}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(file.url)}
                          className="text-green-600 hover:text-green-900"
                          title={getText('Холбоос хуулах', 'Copy Link')}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFileDelete(file.id)}
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
      )}

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {getText('Файл олдсонгүй', 'No files found')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {getText('Хайлтын нөхцөлд тохирох файл байхгүй байна', 'No files match your search criteria')}
          </p>
        </div>
      )}
    </div>
  )
}
