'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const { language, t, isHydrated } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F4F2EA] text-[#0F425C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logoMainRound.png"
                alt="Буяант Барилга Logo"
                width={120}
                height={120}
                className="h-20 w-20"
              />
              {isHydrated && (
                <span className="ml-3 text-xl font-bold">
                  {language === 'mn' ? 'Буяант Барилга' : 'Buyant Construction'}
                </span>
              )}
            </div>
            {isHydrated && (
              <p className="text-[#0F425C]/80 mb-4 max-w-md">
                {language === 'mn' 
                  ? 'Монголын гэр бүлийн барилгын үйлчилгээ. Чадвартай барилгын үйлчилгээ, хуулийн зөвлөгөө.'
                  : 'Mongolia\'s family construction service. Professional construction services and legal consultation.'
                }
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            {isHydrated && (
              <h3 className="text-lg font-semibold mb-4">
                {language === 'mn' ? 'Холбоосууд' : 'Quick Links'}
              </h3>
            )}
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            {isHydrated && (
              <h3 className="text-lg font-semibold mb-4">
                {language === 'mn' ? 'Холбоо барих' : 'Contact Info'}
              </h3>
            )}
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#0F425C] mr-3" />
                <a href="tel:+976-99054762" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  +976 99054762
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#0F425C] mr-3" />
                <a href="mailto:gerlee_jad@yahoo.com" className="text-[#0F425C]/80 hover:text-[#0F425C] transition-colors">
                  gerlee_jad@yahoo.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-[#0F425C] mr-3" />
                {isHydrated && (
                  <span className="text-[#0F425C]/80">
                    {language === 'mn' ? 'Улаанбаатар хот' : 'Ulaanbaatar, Mongolia'}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-[#0F425C] mr-3" />
                {isHydrated && (
                  <span className="text-[#0F425C]/80">
                    {language === 'mn' ? 'Да-Ня: 9:00-18:00' : 'Mon-Fri: 9:00-18:00'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0F425C]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          {isHydrated && (
            <p className="text-[#0F425C]/60 text-sm">
              © {currentYear} {language === 'mn' ? 'Буяант Барилга' : 'Buyant Construction'}. {t('footer.rights')}
            </p>
          )}
          {isHydrated && (
            <p className="text-[#0F425C]/60 text-sm mt-2 md:mt-0">
              {t('footer.developedBy')} Buyant Team
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
