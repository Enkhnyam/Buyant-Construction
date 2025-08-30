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
  order: number
  area?: string
  status?: 'sold' | 'in_construction' | 'available'
}

export const projects: Project[] = [
  {
    id: 'project-4',
    order: 1,
    titleMn: 'Канад технологийн амины байшин',
    titleEn: 'Canadian Technology Residential House',
    descriptionMn: 'Баруун 100 модны зуслан, Кувейтийн амнаас зүүн тийш байрлах 700 м² хувийн эзэмшлийн газарт баригдсан орчин үеийн амины байшин. 50 м² хэмжээтэй энэхүү байшин нь Канад технологиор баригдсан бөгөөд 4 улирлын ашиглалтанд тохиромжтой. 2 өрөө бүхий байшин нь 15 см хана болон 20 см таазны эрдэс хөвөн дулаалгатай, цахилгаан халаагууртай. 14 м² терраст бүхий энэхүү байшин нь 3 тонн багтаамжтай гадна эко 00-тай, 380 В цахилгаантай, 4 тал төмөр хашаатай. Засмал замаас 1.4 км, хотын төвөөс 40 км, нисэх буудлаас 20 км зайтай.',
    descriptionEn: 'A modern residential house built on a 700 m² private property located east of the Kuwait Embassy intersection at Baruun 100 trees crossroad. This 50 m² house is built using Canadian technology and suitable for year-round living. The 2-room house features 15 cm wall and 20 cm ceiling mineral wool insulation with electric heating. The house includes a 14 m² terrace, outdoor eco toilet with 3-ton capacity, 380V electricity, and 4-sided iron fence. Located 1.4 km from paved road, 40 km from city center, and 20 km from airport.',
    category: 'residential',
    location: 'Баруун 100 модны зуслан, Кувейтийн амнаас зүүн тийш',
    completionDate: '2024-01-15',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'in_construction',
    area: '700',
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
    id: 'project-1',
    order: 5,
    titleMn: 'Зуслангийн амины орон сууц',
    titleEn: 'Intersection Residential House',
    descriptionMn: 'Зуслангийн тохилог байршилд баригдсан амины орон сууц. Дулаан хангамжтай, орчин үеийн стандартын дагуу баригдсан. Гэр бүлийн хэрэгцээнд тохирсон практик шийдэлтэй, амьдрахад тав тухтай орчин бүрдүүлсэн зарагдсан үл хөдлөх хөрөнгө.',
    descriptionEn: 'A residential house built in a convenient intersection location. Equipped with heating system and built according to modern standards. Designed with practical solutions for family needs, creating a comfortable living environment. A sold property that provided ideal residential conditions.',
    category: 'residential',
    location: 'Улаанбаатар хот',
    completionDate: '2023-12-01',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'sold',
    images: [
      {
        url: '/uploads/project-1/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-1/additional-3.jpeg',
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
    order: 6,
    titleMn: 'Шаргаморьт зуслангийн 2 давхар амины байшин',
    titleEn: 'Shargamoryt Intersection 2-Story Residential House',
    descriptionMn: 'Сүхбаатар дүүрэг, 15-р хороо, Шаргаморьт зуслангийн 1000 м² газарт (2 айлын хамт эзэмшил) баригдсан 8×10 м дүнзэн 2 давхар амины орон сууц. 4 улирлын ашиглалтанд тохиромжтой энэхүү байшин нь 1-р давхарт том өрөө, гал тогоо, 00, угаалгын өрөө, 2-р давхарт 2 унтлагын өрөө бүхий. 12 м² террастай байшин нь камин зуухтай бөгөөд бүх улиралд ашиглах боломжтой. Тэгш, тохилог байрлалтай газарт баригдсан орчин үеийн стандартын дагуу бүтээгдсэн амьдралын орчин.',
    descriptionEn: 'An 8×10 m 2-story residential house built on 1000 m² land (joint ownership of 2 families) in Sukhbaatar district, 15th khoroo, Shargamoryt intersection. This house suitable for year-round living features a large room, kitchen, toilet, and laundry room on the first floor, and 2 bedrooms on the second floor. The house includes a 12 m² terrace and fireplace stove suitable for all seasons. Built on flat, well-located land according to modern standards, providing an ideal living environment.',
    category: 'residential',
    location: 'Сүхбаатар дүүрэг, 15-р хороо, Шаргаморьт зуслан',
    completionDate: '2023-07-10',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'sold',
    area: '1000',
    images: [
      {
        url: '/uploads/project-2/additional-3.jpeg',
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
        url: '/uploads/project-2/main-view.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      }
    ]
  },
  {
    id: 'project-3',
    order: 3,
    titleMn: 'Сэлбэ зуслангийн бетон блокон амины байшин',
    titleEn: 'Selbe Intersection Concrete Block Residential House',
    descriptionMn: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслангийн 1400 м² эзэмших эрхийн гэрчилгээтэй газарт баригдсан 50 м² бетон блокон амины орон сууц. 1 давхар, 4 улирлын ашиглалтанд тохиромжтой энэхүү байшин нь том өрөө, гал тогоо цуг болон 2 унтлагын өрөө бүхий. Камин зуух болон цахилгаан халаагуур (ресси агаар шатаадаггүй) системтэй дулаан хангамжтай. 24 м² террастай байшин нь өргөн уудам газартай бөгөөд орчин үеийн амьдралын бүх тав тухыг хангасан. Бүрэн тохижсон, амьдрахад бэлэн байшин.',
    descriptionEn: 'A 50 m² concrete block residential house built on 1400 m² titled land in Sukhbaatar district, 20th khoroo, Selbe intersection. This single-story house suitable for year-round living features a combined large room and kitchen plus 2 bedrooms. Equipped with fireplace stove and electric heating system (environmentally friendly, no air burning). The house includes a 24 m² terrace and spacious land area, providing all modern living conveniences. Fully equipped and ready for living.',
    category: 'residential',
    location: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслан',
    completionDate: '2023-08-15',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'sold',
    area: '1400',
    images: [
      {
        url: '/uploads/project-3/new_main.jpeg',
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
      }
    ]
  },
  
  {
    id: 'project-5',
    order: 4,
    titleMn: 'Сэлбэ зуслангийн канад хийцтэй дуплекс байшин',
    titleEn: 'Selbe Intersection Canadian Style Duplex House',
    descriptionMn: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслангийн 700 м² нэг айлын хувийн эзэмшлийн газарт баригдсан 70 м² канад хийцтэй дуплекс загварын амины орон сууц. 2 давхар, 4 улирлын ашиглалтанд тохиромжтой энэхүү байшин нь 1-р давхарт том өрөө болон гал тогоотой, 2-р давхарт шууд гардаг нээлттэй тавцан, унтах зай талбай хэмнэлттэй зохион байгуулалттай. Орчин үеийн дизайн болон практик шийдэлтэй дуплекс загварын байшин нь амьдрахад тав тухтай орчныг бүрдүүлсэн.',
    descriptionEn: 'A 70 m² Canadian-style duplex residential house built on 700 m² single-family private property in Sukhbaatar district, 20th khoroo, Selbe intersection. This 2-story house suitable for year-round living features a large room and kitchen on the first floor, and an open platform with direct access and space-efficient sleeping area on the second floor. The duplex design combines modern aesthetics with practical solutions, creating a comfortable living environment.',
    category: 'residential',
    location: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслан',
    completionDate: '2023-10-05',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'sold',
    area: '700',
    images: [
      {
        url: '/uploads/project-5/wide-view.jpeg',
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
    order: 9,
    titleMn: 'Чингэлтэй дүүргийн үйлчилгээний барилга',
    titleEn: 'Chinggeltei District Service Building',
    descriptionMn: 'Чингэлтэй дүүрэг, 19-р хороо, зам дагуу байрлах 1000 м² хувийн эзэмшлийн газарт баригдсан 108 м² макын блокон үйлчилгээний барилга. 3 давхар, вакуум цонхтой орчин үеийн барилга нь олон төрлийн үйлчилгээний зориулалттай. Гүний худгийн эрхтэй, дотоод 00, угаалгын өрөөтэй бүрэн тохижсон. Үүдэнд 12 м² харуулын байртай аюулгүй байдлыг хангасан арилжааны барилга. Замын дагуу байрлалтай нь хүртээмжийг хангасан давуу тал.',
    descriptionEn: 'A 108 m² brick block service building built on 1000 m² private property along the road in Chinggeltei district, 19th khoroo. This modern 3-story building with vacuum windows is designed for multi-purpose service use. Fully equipped with deep well water rights, indoor toilet, and laundry room. Security ensured with a 12 m² guard house at the entrance. The roadside location provides excellent accessibility for commercial purposes.',
    category: 'commercial',
    location: 'Чингэлтэй дүүрэг, 19-р хороо, зам дагуу',
    completionDate: '2023-05-20',
    clientName: 'Арилжааны захиалагч',
    featured: false,
    published: true,
    status: 'sold',
    area: '1000',
    images: [
      {
        url: '/uploads/project-6/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-6/back-view.jpeg',
        captionMn: 'Хажуугийн харагдах байдал',
        captionEn: 'Side view',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-6/interior.jpeg',
        captionMn: 'Дэлгэрэнгүй харагдах байдал',
        captionEn: 'Detail view',
        isPrimary: false,
        order: 3
      }
    ]
  },
  {
    id: 'project-7',
    order: 7,
    titleMn: 'Зуслангийн амины орон сууц',
    titleEn: 'Intersection Residential House',
    descriptionMn: 'Зуслангийн байршилд баригдсан амины орон сууц. Дулаан хангамжтай, орчин үеийн байгууламжийн шаардлага хангасан. Гэр бүлийн амьдралд тохиромжтой зохион байгуулалттай, практик шийдэлтэй зарагдсан үл хөдлөх хөрөнгө. Амьдрахад бүрэн тохиромжтой нөхцөл бүрдүүлсэн.',
    descriptionEn: 'A residential house built at an intersection location. Equipped with heating system and meets modern building requirements. Organized with practical solutions suitable for family life, a sold property with comprehensive living conditions. Created fully suitable conditions for comfortable living.',
    category: 'residential',
    location: 'Улаанбаатар хот',
    completionDate: '2023-09-30',
    clientName: 'Хувийн захиалагч',
    featured: false,
    published: true,
    status: 'sold',
    images: [
      {
        url: '/uploads/project-7/main-view.jpg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-7/first_floor.jpg',
        captionMn: 'Нэмэлт харагдах байдал 1',
        captionEn: 'Additional view 1',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-7/bedroom.jpg',
        captionMn: 'Нэмэлт харагдах байдал 2',
        captionEn: 'Additional view 2',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-7/bathroom.jpg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-7/window.jpg',
        captionMn: 'Нэмэлт харагдах байдал 4',
        captionEn: 'Additional view 4',
        isPrimary: false,
        order: 5
      }
    ]
  },
  {
    id: 'project-8',
    order: 8,
    titleMn: 'Зуслангийн амины орон сууц',
    titleEn: 'Intersection Residential House',
    descriptionMn: 'Зуслангийн тохилог байршилд баригдсан амины орон сууц. Дулаан хангамжтай, орчин үеийн амьдралын стандартыг хангасан. Гэр бүлд зориулагдсан тохиромжтой орчин, амины нөхцөлийг бүрдүүлсэн зарагдсан үл хөдлөх хөрөнгө. Бүх шаардлагатай дэд бүтэцтэй.',
    descriptionEn: 'A residential house built in a convenient intersection location. Equipped with heating system and meets modern living standards. Suitable environment designed for families, creating residential conditions as a sold property. Features all necessary infrastructure.',
    category: 'residential',
    location: 'Улаанбаатар хот',
    completionDate: '2023-09-30',
    clientName: 'Хувийн захиалагч',
    featured: false,
    published: true,
    status: 'sold',
    images: [
      {
        url: '/uploads/project-8/main-view.jpg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-8/space.jpg',
        captionMn: 'Нэмэлт харагдах байдал 1',
        captionEn: 'Additional view 1',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-8/other_room.jpg',
        captionMn: 'Нэмэлт харагдах байдал 2',
        captionEn: 'Additional view 2',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-8/bathroom.jpg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-8/night.jpg',
        captionMn: 'Нэмэлт харагдах байдал 4',
        captionEn: 'Additional view 4',
        isPrimary: false,
        order: 5
      }
    ]
  },
  {
    id: 'project-9',
    order: 2,
    titleMn: 'Сэлбэ зуслангийн канад хийцтэй амины байшин',
    titleEn: 'Selbe Intersection Canadian Style Residential House',
    descriptionMn: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслангийн 700 м² хувийн эзэмшлийн газарт баригдсан 52 м² канад хийцтэй амины орон сууц. 1 давхар, 4 улирлын ашиглалтанд тохиромжтой энэхүү байшин нь том өрөө, гал тогоо, унтлагын өрөө бүхий. 24 м² террастай байшин нь зуухтай бөгөөд зуны болон өвлийн бүх улиралд ашиглах боломжтой. Гүний худгийн эрхтэй, гадна болон дотор бие засах өрөөтэй. Тасрахгүй цахилгаан, интернет холболттой. Хашаа, хаалга, харуул хамгаалалттай бүрэн тохилог амьдрах орчин.',
    descriptionEn: 'A 52 m² Canadian-style residential house built on 700 m² private property in Sukhbaatar district, 20th khoroo, Selbe intersection. This single-story house suitable for year-round living features a large room, kitchen, and bedroom. The house includes a 24 m² terrace and stove heating system suitable for all seasons. Equipped with deep well water rights, outdoor and indoor bathrooms. Features uninterrupted electricity and internet connection. Complete living environment with fence, gate, and security protection.',
    category: 'residential',
    location: 'Сүхбаатар дүүрэг, 20-р хороо, Сэлбэ зуслан',
    completionDate: '2023-11-30',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'sold',
    area: '700',
    images: [
      {
        url: '/uploads/project-9/main-view.jpeg',
        captionMn: 'Үндсэн харагдах байдал',
        captionEn: 'Main view',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-9/living-room.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 1',
        captionEn: 'Additional view 1',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-9/bedroom.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 2',
        captionEn: 'Additional view 2',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-9/kitchen.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 3',
        captionEn: 'Additional view 3',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-9/outside.jpeg',
        captionMn: 'Нэмэлт харагдах байдал 4',
        captionEn: 'Additional view 4',
        isPrimary: false,
        order: 5
      }
    ]
  },
]

export const getProjects = () => projects.filter(p => p.published)
export const getFeaturedProjects = () => projects.filter(p => p.published && p.featured)
export const getProjectsByCategory = (category: string) => 
  category === 'all' ? projects.filter(p => p.published) : 
  projects.filter(p => p.published && p.category === category)
export const getProjectById = (id: string) => projects.find(p => p.id === id && p.published)
