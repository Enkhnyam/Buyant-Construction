'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download,
  Trash2,
  Eye,
  Star,
  Building2,
  MessageSquare,
  Calendar,
  FileImage
} from 'lucide-react'

interface MediaItem {
  id: number
  url: string
  filename: string
  captionMn: string
  captionEn: string
  type: 'project' | 'testimonial' | 'team' | 'company'
  usage: string
  size: number
  uploadedAt: string
  isPrimary?: boolean
  featured?: boolean
}

interface MediaLibraryProps {
  mediaItems: MediaItem[]
  onMediaItemsChange: (items: MediaItem[]) => void
}

export default function MediaLibrary({ 
  mediaItems, 
  onMediaItemsChange 
}: MediaLibraryProps) {
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size' | 'type'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const typeOptions = [
    { value: 'all', label: getText('Бүгд', 'All'), icon: FileImage },
    { value: 'project', label: getText('Төслүүд', 'Projects'), icon: Building2 },
    { value: 'testimonial', label: getText('Сэтгэгдлүүд', 'Testimonials'), icon: MessageSquare },
    { value: 'team', label: getText('Багийн гишүүд', 'Team Members'), icon: Star },
    { value: 'company', label: getText('Компани', 'Company'), icon: Building2 }
  ]

  const sortOptions = [
    { value: 'date', label: getText('Огноо', 'Date') },
    { value: 'name', label: getText('Нэр', 'Name') },
    { value: 'size', label: getText('Хэмжээ', 'Size') },
    { value: 'type', label: getText('Төрөл', 'Type') }
  ]

  // Filter and sort media items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = mediaItems.filter(item => {
      const matchesSearch = 
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.captionMn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.captionEn.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === 'all' || item.type === selectedType
      
      return matchesSearch && matchesType
    })

    // Sort items
    filtered.sort((a, b) => {
      let aValue: string | number, bValue: string | number
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.uploadedAt).getTime()
          bValue = new Date(b.uploadedAt).getTime()
          break
        case 'name':
          aValue = a.filename.toLowerCase()
          bValue = b.filename.toLowerCase()
          break
        case 'size':
          aValue = a.size
          bValue = b.size
          break
        case 'type':
          aValue = a.type
          bValue = b.type
          break
        default:
          aValue = a.filename.toLowerCase()
          bValue = b.filename.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [mediaItems, searchQuery, selectedType, sortBy, sortOrder])

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const selectAll = () => {
    setSelectedItems(new Set(filteredAndSortedItems.map(item => item.id)))
  }

  const deselectAll = () => {
    setSelectedItems(new Set())
  }

  const deleteSelectedItems = () => {
    if (!confirm(getText(
      `Сонгосон ${selectedItems.size} зургийг устгахдаа итгэлтэй байна уу?`,
      `Are you sure you want to delete ${selectedItems.size} selected images?`
    ))) {
      return
    }

    const updatedItems = mediaItems.filter(item => !selectedItems.has(item.id))
    onMediaItemsChange(updatedItems)
    setSelectedItems(new Set())
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US')
  }

  const hasSelectedItems = selectedItems.size > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {getText('Медиа сан', 'Media Library')}
          </h3>
          <p className="text-sm text-gray-500">
            {getText(
              `${mediaItems.length} зураг`,
              `${mediaItems.length} images`
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={getText('Сүлжээ харагдац', 'Grid View')}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={getText('Жагсаалт харагдац', 'List View')}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={getText('Зураг хайх...', 'Search images...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {typeOptions.map(option => {
                const Icon = option.icon
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'size' | 'type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
              <span className="ml-2 text-sm">
                {sortOrder === 'asc' 
                  ? getText('Өсөх', 'Ascending')
                  : getText('Буурах', 'Descending')
                }
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {hasSelectedItems && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-800">
                {getText(
                  `${selectedItems.size} зураг сонгосон`,
                  `${selectedItems.size} images selected`
                )}
              </span>
              <button
                onClick={selectAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {getText('Бүгдийг сонгох', 'Select All')}
              </button>
              <button
                onClick={deselectAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {getText('Сонголтыг цуцлах', 'Deselect All')}
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={deleteSelectedItems}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {getText('Устгах', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Items */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredAndSortedItems.map((item) => (
            <div
              key={item.id}
              className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedItems.has(item.id) 
                  ? 'border-blue-500 ring-2 ring-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleItemSelection(item.id)}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={(e) => {
                    e.stopPropagation()
                    toggleItemSelection(item.id)
                  }}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>

              {/* Type Badge */}
              <div className="absolute top-2 right-2 z-10">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'project' ? 'bg-blue-100 text-blue-800' :
                  item.type === 'testimonial' ? 'bg-green-100 text-green-800' :
                  item.type === 'team' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {typeOptions.find(t => t.value === item.type)?.label}
                </span>
              </div>

              {/* Image */}
              <div className="aspect-square bg-gray-100">
                <img
                  src={item.url}
                  alt={item.captionMn || item.captionEn || item.filename}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay Info */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center text-white">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs">{getText('Харах', 'View')}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="p-2 bg-white">
                <p className="text-xs text-gray-900 truncate">
                  {language === 'mn' ? item.captionMn : item.captionEn || item.filename}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(item.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                    onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Зураг', 'Image')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Нэр', 'Name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Төрөл', 'Type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getText('Хэмжээ', 'Size')}
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
              {filteredAndSortedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        src={item.url}
                        alt={item.captionMn || item.captionEn || item.filename}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.filename}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'mn' ? item.captionMn : item.captionEn}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      item.type === 'project' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'testimonial' ? 'bg-green-100 text-green-800' :
                      item.type === 'team' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {typeOptions.find(t => t.value === item.type)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(item.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(item.uploadedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-12">
          <FileImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {getText('Зураг олдсонгүй', 'No images found')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {getText(
              'Хайлтын үр дүнд тохирох зураг байхгүй байна.',
              'No images match your search criteria.'
            )}
          </p>
        </div>
      )}
    </div>
  )
}
