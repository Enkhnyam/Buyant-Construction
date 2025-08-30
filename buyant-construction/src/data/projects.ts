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
    descriptionMn: 'Хотын яарах түрүүлгээс хол, тайван орчинд байрлах энэхүү гэр бүл зарагдана. Канадын дэвшилтэт технологиор баригдсан энэхүү байшин нь жилийн дөрвөн улиралд тав тухтай амьдрах боломжийг олгодог. Тусгаарлагдсан хувийн газартай, өөрийн террастай энэхүү байшин нь шинэ амьдралаа эхлүүлэхэд тохиромжтой. Бүх шаардлагатай дэд бүтцээр хангагдсан бөгөөд нүүж ирээд шууд амьдарч эхлэх боломжтой.',
    descriptionEn: 'Located away from the city rush in a peaceful environment, this family home is available for sale. Built using advanced Canadian technology, this house offers comfortable year-round living. With its private enclosed land and own terrace, this home is perfect for starting a new life. Fully equipped with all necessary infrastructure, you can move in and start living immediately.',
    category: 'residential',
    location: 'Баруун 100 модны зуслан, Кувейтийн амнаас зүүн тийш',
    completionDate: '2024-01-15',
    clientName: 'Хувийн захиалагч',
    featured: true,
    published: true,
    status: 'available',
    area: '700',
    images: [
      {
        url: '/uploads/project-4/main-view.jpeg',
        captionMn: '🏠 50м² амины байшин 🌍 700м² газар 💰 96,000,000₮ 🏗️ Канад технологи 🌡️ 4 улирлын ашиглалт 🔥 15см хана + 20см таазны дулаалга ⚡ 380В цахилгаан 🚻 3 тонн эко 00 🏡 14м² террас 🛡️ 4 тал төмөр хашаа',
        captionEn: '🏠 50m² house 🌍 700m² land 💰 96,000,000₮ 🏗️ Canadian technology 🌡️ Year-round living 🔥 15cm wall + 20cm ceiling insulation ⚡ 380V electricity 🚻 3-ton eco toilet 🏡 14m² terrace 🛡️ 4-sided iron fence',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-4/side-view.jpeg',
        captionMn: '📍 Баруун 100 модны зуслан, Кувейтийн амнаас зүүн тийш 🛣️ Засмал замаас 1.4км 🏙️ Хотын төвөөс 40км ✈️ Нисэх буудлаас 20км 🏠 2 өрөө 🔥 Цахилгаан халаагуур 📞 Холбоо: 8809-3221',
        captionEn: '📍 East of Kuwait Embassy, Baruun 100 trees intersection 🛣️ 1.4km from paved road 🏙️ 40km from city center ✈️ 20km from airport 🏠 2 rooms 🔥 Electric heating 📞 Contact: 8809-3221',
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
    descriptionMn: 'Зуслангийн тохилог байршилд байрладаг энэхүү гэр амгалан нь азтай эзэнтэйгээ уулзсан түүх юм. Орчин үеийн стандартын дагуу баригдсан энэхүү байшин нь гэр бүлийн бүх хэрэгцээг хангах чадвартай байлаа. Практик шийдэл, тав тухтай орчинтой энэхүү орон сууц нь шинэ эзэддээ аз жаргалтай амьдралыг бэлэглэсэн.',
    descriptionEn: 'This cozy home located at a convenient intersection is a story of finding its lucky owners. Built according to modern standards, this house was capable of meeting all family needs. With practical solutions and comfortable environment, this residence gifted its new owners a happy life.',
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
    descriptionMn: 'Хоёр давхар өргөжсөн энэхүү гэр бүл нь олон үеийн гэр бүлд тохиромжтой орчин бүрдүүлж чадсан амгалан дүр зураг байлаа. Доод давхарт бүх өдөр төдийн найрсаг цагуудыг өнгөрүүлэх том өрөө, дээд давхарт тайван унтлагын өрөөнүүдтэй энэхүү байшин нь үр хүүхдүүдийн хөгжилд тохиромжтой байсан. Камин зуухны дулаан дэргэд гэр бүлийн цуглаан хийх, террас дээр амралтын цагыг өнгөрүүлэх боломжтой байшин нь гэр бүлийн аз жаргалыг хоёр дахин нэмэгдүүлж чадсан.',
    descriptionEn: 'This spacious two-story family home created a cozy picture perfect for multi-generational families. With a large room on the ground floor for spending harmonious daily moments and peaceful bedrooms upstairs, this house was ideal for children\'s development. The house, where families could gather around the warm fireplace and spend leisure time on the terrace, was able to double the family\'s happiness.',
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
        captionMn: '🏠 8×10м дүнзэн 2 давхар байшин 🌍 1000м² газар 💰 150,000,000₮ зарагдсан 📍 Сүхбаатар дүүрэг, Шаргаморьт зуслан 🌡️ 4 улирлын ашиглалт 🏡 12м² террас',
        captionEn: '🏠 8×10m 2-story house 🌍 1000m² land 💰 150,000,000₮ sold 📍 Sukhbaatar district, Shargamoryt intersection 🌡️ Year-round living 🏡 12m² terrace',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-2/additional-1.jpeg',
        captionMn: '🛋️ 1-р давхар: том өрөө, гал тогоо 🚻 00, угаалгын өрөө 🔥 Камин зуух 🌿 Тэгш газар',
        captionEn: '🛋️ 1st floor: large room, kitchen 🚻 Toilet, laundry room 🔥 Fireplace stove 🌿 Flat land',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-2/additional-2.jpeg',
        captionMn: '🛏️ 2-р давхар: 2 унтлагын өрөө 👨‍👩‍👧‍👦 2 айлын хамт эзэмшил 🏗️ Орчин үеийн стандарт',
        captionEn: '🛏️ 2nd floor: 2 bedrooms 👨‍👩‍👧‍👦 Joint ownership of 2 families 🏗️ Modern standards',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-2/main-view.jpeg',
        captionMn: '🏘️ Тохилог байршил 🌡️ Бүх улиралд ашиглах боломжтай 🏠 Гэр бүлийн хэрэгцээнд тохирсон зохион байгуулалт',
        captionEn: '🏘️ Convenient location 🌡️ Suitable for all seasons 🏠 Layout designed for family needs',
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
    descriptionMn: 'Өргөн уудам газартай энэхүү гэр бүлийн амгалан орон нь аз жаргалтай гэр бүлд шинэ гэр болж өглөө. Бат бөх бетон блокоор баригдсан энэхүү байшин нь олон жилийн турш найдвартай байх учиртай. Дулаан камин зуух, байгальд ээлтэй халаалтын системтэй энэхүү орон сууц нь өвлийн хүйтэн өдрүүдэд гэр бүлийн дулаан уур амьсгалыг бүрдүүлдэг байлаа. Тохилог байршилтай, өргөн террастай энэхүү байшин нь гэр бүлийн цугларалт, найз нөхөдтэй уулзалтад тохиромжтой байсан.',
    descriptionEn: 'This spacious family home with extensive land became a new home for a happy family. Built with solid concrete blocks, this house was designed to be reliable for many years. With its warm fireplace stove and eco-friendly heating system, this residence created a cozy family atmosphere during cold winter days. With its convenient location and spacious terrace, this house was perfect for family gatherings and meetings with friends.',
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
        captionMn: '🏠 50м² бетон блокон байшин 🌍 1400м² газар 💰 210,000,000₮ зарагдсан 📍 Сүхбаатар дүүрэг, Сэлбэ зуслан 🏡 1 давхар 🌡️ 4 улирлын ашиглалт',
        captionEn: '🏠 50m² concrete block house 🌍 1400m² land 💰 210,000,000₮ sold 📍 Sukhbaatar district, Selbe intersection 🏡 1 floor 🌡️ Year-round living',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-3/additional-1.jpeg',
        captionMn: '🛋️ Том өрөө + гал тогоо цуг 🛏️ 2 унтлагын өрөө 🏡 24м² террас 🔥 Камин зуух',
        captionEn: '🛋️ Combined large room + kitchen 🛏️ 2 bedrooms 🏡 24m² terrace 🔥 Fireplace stove',
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
    descriptionMn: 'Орчин үеийн дуплекс загварын энэхүү дэвшилтэт гэр амгалан нь залуу гэр бүлд шинэ төрлийн амьдралыг санал болгож чадсан ерөнхий шийдэл байлаа. Канадын чанартай барилгын технологи ашигласан энэхүү байшин нь талбай хэмнэлттэй боловч бүх шаардлагыг хангасан практик орчин бүрдүүлсэн. Нээлттэй тавцан, шууд гарах боломжтой зохион байгуулалт нь залуу хосууддын орчин үеийн амьдралын хэв маягт тохирсон уран сайхны шийдэл байжээ.',
    descriptionEn: 'This modern duplex-style advanced family home was an overall solution that offered young families a new type of lifestyle. Built using Canadian quality construction technology, this house created a space-efficient yet comprehensive practical environment. The open platform and direct access layout was an artistic solution that matched the modern lifestyle of young couples.',
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
        captionMn: '🏠 70м² канад хийцтэй дуплекс 🌍 700м² газар 💰 160,000,000₮ зарагдсан 📍 Сүхбаатар дүүрэг, Сэлбэ зуслан 🏡 2 давхар 🌡️ 4 улирлын ашиглалт',
        captionEn: '🏠 70m² Canadian-style duplex 🌍 700m² land 💰 160,000,000₮ sold 📍 Sukhbaatar district, Selbe intersection 🏡 2 floors 🌡️ Year-round living',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-5/environment-view.jpeg',
        captionMn: '🌿 Орчны байдал 👨‍👩‍👧‍👦 Нэг айлын эзэмшил 🏗️ Орчин үеийн дизайн 🏞️ Тайван орчин',
        captionEn: '🌿 Environmental setting 👨‍👩‍👧‍👦 Single family ownership 🏗️ Modern design 🏞️ Peaceful environment',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-5/side-view.jpeg',
        captionMn: '🛋️ 1-р давхар: том өрөө + гал тогоо 🪜 Шууд гардаг нээлттэй тавцан 💡 Практик шийдэл',
        captionEn: '🛋️ 1st floor: large room + kitchen 🪜 Direct access open platform 💡 Practical solutions',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-5/detail-view.jpeg',
        captionMn: '🛏️ 2-р давхар: унтах зай 📐 Талбай хэмнэлттэй зохион байгуулалт 🏡 Дуплекс загвар',
        captionEn: '🛏️ 2nd floor: sleeping area 📐 Space-efficient layout 🏡 Duplex design',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-5/additional-view.jpeg',
        captionMn: '🇨🇦 Канадын чанартай технологи 🏗️ Бат бөх барилга 👫 Залуу гэр бүлд тохиромжтой 🎨 Уран сайхны шийдэл',
        captionEn: '🇨🇦 Canadian quality technology 🏗️ Solid construction 👫 Perfect for young families 🎨 Artistic solutions',
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
    descriptionMn: 'Замын хажууд байрлах энэхүү олон зорилгот үйлчилгээний барилга нь арилжааны өрсөлдөхүйц орчин хайж байсан бизнес эрхлэгчдэд тохиромжтой боломж санал болгож чадсан. Гурван давхар өндөртэй, орчин үеийн технологи бүхий энэхүү барилга нь олон төрлийн үйлчилгээ үзүүлэх боломжийг олгосон. Аюулгүй байдлыг хангасан, бүх шаардлагатай дэд бүтэцтэй энэхүү барилга нь бизнесийн амжилтын үндэс болж чадсан.',
    descriptionEn: 'This multi-purpose service building located roadside was able to offer suitable opportunities for business owners seeking a competitive commercial environment. This three-story building with modern technology provided the possibility of offering various services. With ensured security and all necessary infrastructure, this building was able to become the foundation for business success.',
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
        captionMn: '🏢 108м² макын блокон үйлчилгээний барилга 🌍 1000м² газар 💰 140,000,000₮ зарагдсан 📍 Чингэлтэй дүүрэг, зам дагуу 🏗️ 3 давхар 🪟 Вакуум цонх',
        captionEn: '🏢 108m² brick block service building 🌍 1000m² land 💰 140,000,000₮ sold 📍 Chinggeltei district, roadside 🏗️ 3 floors 🪟 Vacuum windows',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-6/back-view.jpeg',
        captionMn: '🛡️ 12м² харуулын байр 🚪 Үүдний аюулгүй байдал 🛣️ Замын дагуу хүртээмжтэй байршил 🏪 Арилжааны зориулалт',
        captionEn: '🛡️ 12m² guard house 🚪 Entrance security 🛣️ Roadside accessible location 🏪 Commercial purpose',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-6/interior.jpeg',
        captionMn: '🏠 Дотоод 00, угаалгын өрөө 💧 Гүний худгийн эрх 🏢 Олон төрлийн үйлчилгээний боломж 🔧 Бүрэн тохижсон дэд бүтэц',
        captionEn: '🏠 Indoor toilet, laundry room 💧 Deep well water rights 🏢 Multi-service possibilities 🔧 Fully equipped infrastructure',
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
    descriptionMn: 'Амьдралын бүх тав тухыг хангасан энэхүү гэр амгалан нь азтай гэр бүлд шинэ эзэнтэй боллоо. Канадын чанартай барилгын технологиор хийгдсэн энэхүү байшин нь жилийн турш тогтвортой дулаан, тайван орчинг хангадаг байжээ. Өргөн тайван террас, хувийн гүний худаг, найдвартай аюулгүй байдлын системтэй энэхүү орон сууц нь гэр бүлийн аз жаргалтай өдрүүдийг өнгөрүүлэхэд тохиромжтой байсан.',
    descriptionEn: 'This cozy family home with all life conveniences has found its lucky new owners. Built with Canadian quality construction technology, this house provided year-round stable warmth and peaceful environment. With its spacious quiet terrace, private deep well, and reliable security system, this residence was perfect for spending happy family days.',
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
        captionMn: '🏠 52м² канад хийцтэй байшин 🌍 700м² газар 💰 165,000,000₮ зарагдсан 📍 Сүхбаатар дүүрэг, Сэлбэ зуслан 🏡 1 давхар 🌡️ 4 улирлын ашиглалт 🏡 24м² террас',
        captionEn: '🏠 52m² Canadian-style house 🌍 700m² land 💰 165,000,000₮ sold 📍 Sukhbaatar district, Selbe intersection 🏡 1 floor 🌡️ Year-round living 🏡 24m² terrace',
        isPrimary: true,
        order: 1
      },
      {
        url: '/uploads/project-9/living-room.jpeg',
        captionMn: '🛋️ Том өрөө болон гал тогооны орчин 🔥 Зуухтай дулаан хангамж 🌿 Тайван амрах орчин',
        captionEn: '🛋️ Large living room and kitchen area 🔥 Stove heating system 🌿 Peaceful relaxation environment',
        isPrimary: false,
        order: 2
      },
      {
        url: '/uploads/project-9/bedroom.jpeg',
        captionMn: '🛏️ Унтлагын өрөө 🌙 Тайван нойрын орчин 🪟 Байгалийн гэрэл',
        captionEn: '🛏️ Bedroom 🌙 Peaceful sleeping environment 🪟 Natural lighting',
        isPrimary: false,
        order: 3
      },
      {
        url: '/uploads/project-9/kitchen.jpeg',
        captionMn: '🍳 Гал тогооны өрөө 🚰 Усны системтэй 🏠 Практик зохион байгуулалт',
        captionEn: '🍳 Kitchen area 🚰 Water system equipped 🏠 Practical layout',
        isPrimary: false,
        order: 4
      },
      {
        url: '/uploads/project-9/outside.jpeg',
        captionMn: '🌲 Гадна орчин 💧 Гүний худгийн эрх 🚻 Гадна болон дотор 00 ⚡ Тасрахгүй цахилгаан 🌐 Интернет 🛡️ Харуул хамгаалалт',
        captionEn: '🌲 Outdoor environment 💧 Deep well water rights 🚻 Outdoor and indoor toilet ⚡ Uninterrupted electricity 🌐 Internet 🛡️ Security protection',
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
