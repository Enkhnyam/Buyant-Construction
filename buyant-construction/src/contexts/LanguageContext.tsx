'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'mn' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations = {
  mn: {
    // Navigation
    'nav.home': 'Нүүр',
    'nav.services': 'Үйлчилгээ',
    'nav.projects': 'Төслүүд',
    'nav.about': 'Бидний тухай',
    'nav.contact': 'Холбоо барих',
    'nav.admin': 'Админ',
    
    // Hero Section
    'hero.title': 'Монголын гэр бүлийн барилгын үйлчилгээ',
    'hero.subtitle': 'Чадвартай барилгын үйлчилгээ, хуулийн зөвлөгөө',
    'hero.cta': 'Холбоо барих',
    
    // Services
    'services.construction.title': 'Гэр барилга',
    'services.construction.description': 'Хот орчмын болон хөдөөгийн газарт гэр барих, газар худалдан авах, хуулийн баримт, барилга, төслийн удирдлага',
    'services.legal.title': 'А маягт хуулийн үйлчилгээ',
    'services.legal.description': 'Барилгын компаниудад зориулсан зөвшөөрөл, баримт бичгийн хуулийн тусламж',
    
    // Common
    'common.learnMore': 'Дэлгэрэнгүй',
    'common.contactUs': 'Бидэнтэй холбоо барих',
    'common.viewProjects': 'Төслүүдийг харах',
    'common.back': 'Буцах',
    'common.save': 'Хадгалах',
    'common.cancel': 'Цуцлах',
    'common.delete': 'Устгах',
    'common.edit': 'Засах',
    'common.add': 'Нэмэх',
    
    // Footer
    'footer.rights': 'Бүх эрх хуулиар хамгаалагдсан',
    'footer.developedBy': 'Хөгжүүлсэн',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Mongolia\'s Family Construction Service',
    'hero.subtitle': 'Professional construction services and legal consultation',
    'hero.cta': 'Get in Touch',
    
    // Services
    'services.construction.title': 'House Construction',
    'services.construction.description': 'Building houses near the city or in the countryside, including land acquisition, legal documentation, construction, and project management',
    'services.legal.title': 'Legal Documentation Services',
    'services.legal.description': 'Legal assistance for construction companies obtaining permits and documentation for apartment complexes and commercial projects',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.viewProjects': 'View Projects',
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.developedBy': 'Developed by',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('mn')

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'mn' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleLanguageChange,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
