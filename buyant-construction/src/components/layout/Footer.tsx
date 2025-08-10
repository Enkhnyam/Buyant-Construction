'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const { language, t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Б</span>
              </div>
              <span className="ml-3 text-xl font-bold">
                {language === 'mn' ? 'Баянт Барилга' : 'Buyant Construction'}
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {language === 'mn' 
                ? 'Монголын гэр бүлийн барилгын үйлчилгээ. Чадвартай барилгын үйлчилгээ, хуулийн зөвлөгөө.'
                : 'Mongolia\'s family construction service. Professional construction services and legal consultation.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'mn' ? 'Холбоосууд' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'mn' ? 'Холбоо барих' : 'Contact Info'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <a href="tel:+976-11-123456" className="text-gray-300 hover:text-white transition-colors">
                  +976 11 123 456
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <a href="mailto:info@buyant.mn" className="text-gray-300 hover:text-white transition-colors">
                  info@buyant.mn
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">
                  {language === 'mn' ? 'Улаанбаатар хот' : 'Ulaanbaatar, Mongolia'}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">
                  {language === 'mn' ? 'Да-Ня: 9:00-18:00' : 'Mon-Fri: 9:00-18:00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {language === 'mn' ? 'Баянт Барилга' : 'Buyant Construction'}. {t('footer.rights')}
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            {t('footer.developedBy')} Buyant Team
          </p>
        </div>
      </div>
    </footer>
  )
}
