export interface ProjectImage {
  url: string
  captionMn?: string
  captionEn?: string
  isPrimary: boolean
  order: number
}

export interface Project {
  id: string
  titleMn: string
  titleEn: string
  descriptionMn: string
  descriptionEn: string
  category: 'residential' | 'commercial' | 'renovation'
  location: string
  completionDate?: string
  clientName?: string
  testimonialMn?: string
  testimonialEn?: string
  featured: boolean
  published: boolean
  images: ProjectImage[]
  area?: string
  duration?: string
  team?: string
  features?: string[]
}

export const projects: Project[] = [
  {
    id: 'project-1',
    titleMn: 'Орон сууцны барилга',
    titleEn: 'Residential Building',
    descriptionMn: 'Орчин үеийн дизайнтай, 5 давхар орон сууцны барилга. Өндөр чанартай материал, эрчим хүчний хэмнэлттэй системтэй.',
    descriptionEn: 'Modern 5-story residential building with contemporary design. High-quality materials and energy-efficient systems.',
    category: 'residential',
    location: 'Ulaanbaatar, Mongolia',
    completionDate: '2023-12-01',
    clientName: 'Private Client',
    featured: true,
    published: true,
    area: '2,500',
    duration: '18 months',
    team: '15',
    features: ['Central heating', 'Door system', 'Side finishing', 'Oil system'],
    images: [
      {
        url: '/uploads/project-1/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-1/side-view.jpeg',
        captionMn: 'Хажуугийн харагдах байдал',
        captionEn: 'Side view',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-1/environment-view.jpeg',
        captionMn: 'Орчны харагдах байдал',
        captionEn: 'Environment view',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-1/detail-view.jpeg',
        captionMn: 'Дэлгэрэнгүй харагдах байдал',
        captionEn: 'Detail view',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-1/additional-view.jpeg',
        captionMn: 'Нэмэлт харагдах байдал',
        captionEn: 'Additional view',
        isPrimary: false,
        order: 5
      }
    ]
  },
  {
    id: 'project-2',
    titleMn: 'Арилжааны төв',
    titleEn: 'Commercial Center',
    descriptionMn: 'Олон хэлтсийн арилжааны төв, 3 давхар. Орчин үеийн архитектур, хэрэглэгчидэд тохиромжтой.',
    descriptionEn: 'Multi-purpose commercial center, 3 stories. Modern architecture designed for customer convenience.',
    category: 'commercial',
    location: 'Darkhan, Mongolia',
    completionDate: '2023-06-15',
    clientName: 'Darkhan LLC',
    featured: true,
    published: true,
    area: '1,800',
    duration: '12 months',
    team: '12',
    features: ['Modern facade', 'Parking system', 'Security system', 'HVAC'],
    images: [
      {
        url: '/uploads/project-2/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-2/additional-1.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 1',
        captionEn: 'Additional view 1',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-2/additional-2.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 2',
        captionEn: 'Additional view 2',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-2/additional-3.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      }
    ]
  },
  {
    id: 'project-3',
    titleMn: 'Засалтын ажил',
    titleEn: 'Renovation Project',
    descriptionMn: 'Хуучин барилгын засалт, шинэчлэл. Эрчим хүчний хэмнэлт, орчин үеийн дизайн.',
    descriptionEn: 'Renovation and modernization of existing building. Energy efficiency and modern design.',
    category: 'renovation',
    location: 'Erdenet, Mongolia',
    completionDate: '2023-09-30',
    clientName: 'Erdenet Corporation',
    featured: false,
    published: true,
    area: '1,200',
    duration: '8 months',
    team: '8',
    features: ['Structural reinforcement', 'New facade', 'Interior redesign', 'Energy efficiency'],
    images: [
      {
        url: '/uploads/project-3/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-3/additional-1.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 1',
        captionEn: 'Additional view 1',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-3/additional-2.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 2',
        captionEn: 'Additional view 2',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-3/additional-3.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-3/additional-4.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 4',
        captionEn: 'Additional view 4',
        isPrimary: false,
        order: 5
      },
      {
        url: '/uploads/project-3/additional-5.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 5',
        captionEn: 'Additional view 5',
        isPrimary: false,
        order: 6
      }
    ]
  },
  {
    id: 'project-4',
    titleMn: 'Хувийн байшин',
    titleEn: 'Private House',
    descriptionMn: 'Гэр бүлийн хэрэгцээнд тохирсон, 2 давхар хувийн байшин. Багаж хэрэгсэл, хадгалах өрөөтэй.',
    descriptionEn: '2-story private house designed for family needs. Includes workshop and storage rooms.',
    category: 'residential',
    location: 'Baganuur, Mongolia',
    completionDate: '2023-03-20',
    clientName: 'Family Residence',
    featured: false,
    published: true,
    area: '450',
    duration: '10 months',
    team: '6',
    features: ['Workshop space', 'Storage rooms', 'Garden area', 'Garage'],
    images: [
      {
        url: '/uploads/project-4/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-4/side-view.jpeg',
        captionMn: 'Хажуугийн харагдах байдал',
        captionEn: 'Side view',
        isPrimary: false,
        order: 2
      }
    ]
  },
  {
    id: 'project-5',
    titleMn: 'Оффис барилга',
    titleEn: 'Office Building',
    descriptionMn: 'Орчин үеийн оффис барилга, 4 давхар. Хамгийн сүүлийн үеийн технологи, тохилог ажил орчин.',
    descriptionEn: 'Modern 4-story office building. Latest technology and comfortable working environment.',
    category: 'commercial',
    location: 'Ulaanbaatar, Mongolia',
    completionDate: '2022-11-15',
    clientName: 'Tech Solutions LLC',
    featured: true,
    published: true,
    area: '3,200',
    duration: '16 months',
    team: '18',
    features: ['Smart building system', 'Conference rooms', 'Cafeteria', 'Parking garage'],
    images: [
      {
        url: '/uploads/project-5/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-5/environment-view.jpeg',
        captionMn: 'Орчны харагдах байдал',
        captionEn: 'Environment view',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-5/side-view.jpeg',
        captionMn: 'Хажуугийн харагдах байдал',
        captionEn: 'Side view',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-5/detail-view.jpeg',
        captionMn: 'Дэлгэрэнгүй харагдах байдал',
        captionEn: 'Detail view',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-5/additional-view.jpeg',
        captionMn: 'Нэмэлт харагдах байдал',
        captionEn: 'Additional view',
        isPrimary: false,
        order: 5
      }
    ]
  },
  {
    id: 'project-6',
    titleMn: 'Хостел барилга',
    titleEn: 'Hostel Building',
    descriptionMn: 'Оюутны хэрэгцээнд зориулсан хостел барилга. Хэмнэлттэй, тохилог орчин.',
    descriptionEn: 'Hostel building designed for student needs. Economical and comfortable environment.',
    category: 'residential',
    location: 'Ulaanbaatar, Mongolia',
    completionDate: '2022-08-30',
    clientName: 'Student Housing Association',
    featured: false,
    published: true,
    area: '2,800',
    duration: '14 months',
    team: '14',
    features: ['Shared kitchen', 'Study rooms', 'Laundry facilities', 'Security system'],
    images: [
      {
        url: '/uploads/project-6/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      }
    ]
  }
]

export const getProjects = () => projects.filter(p => p.published)
export const getFeaturedProjects = () => projects.filter(p => p.published && p.featured)
export const getProjectsByCategory = (category: string) => 
  category === 'all' ? projects.filter(p => p.published) : 
  projects.filter(p => p.published && p.category === category)
export const getProjectById = (id: string) => projects.find(p => p.id === id && p.published)
