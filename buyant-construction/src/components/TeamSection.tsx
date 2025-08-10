import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TeamMemberImage } from './TeamMemberImage';

interface TeamMember {
  id: string;
  nameMn: string;
  nameEn: string;
  roleMn: string;
  roleEn: string;
  bioMn: string;
  bioEn: string;
}

export const TeamSection = () => {
  const { language } = useLanguage();
  
  const teamMembers: TeamMember[] = [
    {
      id: 'ceo',
      nameMn: 'Бат-Эрдэнэ',
      nameEn: 'Bat-Erdene',
      roleMn: 'Гүйцэтгэх захирал',
      roleEn: 'Chief Executive Officer',
      bioMn: '10+ жилийн туршлагатай барилгын салбарын мэргэжилтэн',
      bioEn: 'Experienced construction professional with 10+ years in the industry'
    },
    {
      id: 'architect1',
      nameMn: 'Болд',
      nameEn: 'Bold',
      roleMn: 'Тэргүүлэх архитектор',
      roleEn: 'Lead Architect',
      bioMn: 'Олон улсын стандартад нийцсэн дизайн',
      bioEn: 'Designs that meet international standards'
    },
    {
      id: 'engineer1',
      nameMn: 'Сүхээ',
      nameEn: 'Sukhee',
      roleMn: 'Ахлах инженер',
      roleEn: 'Senior Engineer',
      bioMn: 'Техникийн чанарын баталгаа',
      bioEn: 'Technical quality assurance specialist'
    },
  ];

  const getText = (mn: string, en: string) => language === 'mn' ? mn : en;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getText('Бидний баг', 'Our Team')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getText(
              'Туршлагатай мэргэжилтнүүд',
              'Experienced professionals dedicated to excellence'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <TeamMemberImage 
                  memberId={member.id} 
                  alt={getText(member.nameMn, member.nameEn)}
                  className="w-48 h-64 rounded-lg mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getText(member.nameMn, member.nameEn)}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {getText(member.roleMn, member.roleEn)}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {getText(member.bioMn, member.bioEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
