'use client'

import React, { useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Upload, 
  X, 
  Eye, 
  Star, 
  Trash2, 
  Move, 
  Download,
  RotateCw,
  Crop,
  Image as ImageIcon
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface ProjectImage {
  id?: number
  imageUrl: string
  captionMn: string
  captionEn: string
  isPrimary: boolean
  order: number
  file?: File
  preview?: string
}

interface ImageGalleryManagerProps {
  images: ProjectImage[]
  onImagesChange: (images: ProjectImage[]) => void
  maxImages?: number
}

export default function ImageGalleryManager({ 
  images, 
  onImagesChange, 
  maxImages = 20 
}: ImageGalleryManagerProps) {
  const { language } = useLanguage()
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set())
  const [showPreview, setShowPreview] = useState<ProjectImage | null>(null)
  const [editingImage, setEditingImage] = useState<ProjectImage | null>(null)

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ProjectImage[] = acceptedFiles.map((file, index) => ({
      id: Date.now() + index, // Temporary ID for new images
      imageUrl: '',
      captionMn: '',
      captionEn: '',
      isPrimary: images.length === 0, // First image is primary if no images exist
      order: images.length + index,
      file,
      preview: URL.createObjectURL(file)
    }))

    const updatedImages = [...images, ...newImages]
    onImagesChange(updatedImages)
  }, [images, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  })

  const removeImage = (imageId: number) => {
    const updatedImages = images.filter(img => img.id !== imageId)
    // If we removed the primary image, make the first remaining image primary
    if (images.find(img => img.id === imageId)?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true
    }
    onImagesChange(updatedImages)
    setSelectedImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(imageId)
      return newSet
    })
  }

  const setPrimaryImage = (imageId: number) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }))
    onImagesChange(updatedImages)
  }

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)
    
    // Update order numbers
    updatedImages.forEach((img, index) => {
      img.order = index
    })
    
    onImagesChange(updatedImages)
  }

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const deleteSelectedImages = () => {
    const updatedImages = images.filter(img => !selectedImages.has(img.id!))
    // If we deleted the primary image, make the first remaining image primary
    if (images.find(img => selectedImages.has(img.id!) && img.isPrimary) && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true
    }
    onImagesChange(updatedImages)
    setSelectedImages(new Set())
  }

  const updateImageCaption = (imageId: number, field: 'captionMn' | 'captionEn', value: string) => {
    const updatedImages = images.map(img => 
      img.id === imageId ? { ...img, [field]: value } : img
    )
    onImagesChange(updatedImages)
  }

  const hasSelectedImages = selectedImages.size > 0

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {getText('Зургийн цомог', 'Image Gallery')}
          </h3>
          <p className="text-sm text-gray-500">
            {getText(
              `Зураг: ${images.length}/${maxImages}`,
              `Images: ${images.length}/${maxImages}`
            )}
          </p>
        </div>
        
        {hasSelectedImages && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {getText(
                `${selectedImages.size} зураг сонгосон`,
                `${selectedImages.size} images selected`
              )}
            </span>
            <button
              onClick={deleteSelectedImages}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {getText('Устгах', 'Delete')}
            </button>
          </div>
        )}
      </div>

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive 
              ? getText('Зурагнуудыг энд унагана уу', 'Drop images here')
              : getText('Зураг оруулахын тулд дарна уу эсвэл зөөнө үү', 'Click to upload or drag and drop')
            }
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {getText(
              'PNG, JPG, WebP хэлбэрээр зөвхөн зургийн файлууд',
              'PNG, JPG, WebP image files only'
            )}
          </p>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative group border-2 rounded-lg overflow-hidden ${
                image.isPrimary ? 'border-blue-500' : 'border-gray-200'
              } ${selectedImages.has(image.id!) ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedImages.has(image.id!)}
                  onChange={() => toggleImageSelection(image.id!)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </div>

              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Star className="w-3 h-3 mr-1" />
                    {getText('Үндсэн', 'Primary')}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="aspect-square bg-gray-100">
                <img
                  src={image.preview || image.imageUrl}
                  alt={image.captionMn || image.captionEn || 'Project image'}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowPreview(image)}
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPreview(image)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title={getText('Харах', 'View')}
                  >
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                  
                  {!image.isPrimary && (
                    <button
                      onClick={() => setPrimaryImage(image.id!)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title={getText('Үндсэн болгох', 'Set as Primary')}
                    >
                      <Star className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeImage(image.id!)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title={getText('Устгах', 'Delete')}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Captions */}
              <div className="p-2 bg-white">
                <input
                  type="text"
                  placeholder={getText('Тайлбар (Монгол)', 'Caption (Mongolian)')}
                  value={image.captionMn}
                  onChange={(e) => updateImageCaption(image.id!, 'captionMn', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-1"
                />
                <input
                  type="text"
                  placeholder={getText('Тайлбар (Англи)', 'Caption (English)')}
                  value={image.captionEn}
                  onChange={(e) => updateImageCaption(image.id!, 'captionEn', e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>

              {/* Drag Handle */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Move className="w-4 h-4 text-gray-400 cursor-move" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowPreview(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            
            <img
              src={showPreview.preview || showPreview.imageUrl}
              alt={showPreview.captionMn || showPreview.captionEn || 'Project image'}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  {showPreview.captionMn || showPreview.captionEn || getText('Тайлбар байхгүй', 'No caption')}
                </p>
                {showPreview.isPrimary && (
                  <p className="text-xs text-blue-600 mt-1">
                    {getText('Үндсэн зураг', 'Primary Image')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
