import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'admin'
    }
  })
  console.log('✅ Admin user created:', admin.username)

  // Create company information
  const companyInfo = await prisma.companyInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nameMn: 'Буянт амины орон сууц ХХК',
      nameEn: 'Buyant House LLC',
      aboutMn: 'Монгол улсын тэргүүлэгч барилгын компани. Орон сууцны барилга, хуулийн үйлчилгээ, зөвлөгөө өгөх үйлчилгээг санал болгодог.',
      aboutEn: 'Leading construction company in Mongolia. We provide residential construction, legal services, and consultation services.',
      missionMn: 'Монголчуудын гэр бүлийн амьдралыг сайжруулах, чанартай орон сууцны барилга барих',
      missionEn: 'Improve the lives of Mongolian families by building quality residential buildings',
      visionMn: 'Монгол улсын барилгын салбарт тэргүүлэгч компани болох',
      visionEn: 'Become the leading company in Mongolia\'s construction sector'
    }
  })
  console.log('✅ Company information created')

  // Create contact information
  const contactInfo = await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      phone: '+976 99054762',
      email: 'gerlee_jad@yahoo.com',
      addressMn: 'Сүхбаатар дүүрэг, 1-р хороо, Баянзүрх гудамж, 15-р байр',
      addressEn: 'Sukhbaatar District, 1st Khoroo, Bayanzurkh Street, Building 15',
      workingHoursMn: 'Даваа-Баасан: 09:00-18:00, Бямба: 09:00-14:00',
      workingHoursEn: 'Monday-Friday: 09:00-18:00, Saturday: 09:00-14:00',
      whatsapp: '+976 99054762',
      telegram: '@buyantconstruction'
    }
  })
  console.log('✅ Contact information created')

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 1 },
      update: {},
      create: {
        titleMn: 'Орон сууцны барилга',
        titleEn: 'Residential Construction',
        descriptionMn: 'Гэр бүлийн орон сууцны барилга, дахин барилга, засвар үйлчилгээ',
        descriptionEn: 'Family residential construction, reconstruction, and maintenance services',
        shortDescriptionMn: 'Чанартай орон сууцны барилга',
        shortDescriptionEn: 'Quality residential construction',
        icon: 'home',
        order: 1,
        active: true
      }
    }),
    prisma.service.upsert({
      where: { id: 2 },
      update: {},
      create: {
        titleMn: 'Хуулийн үйлчилгээ',
        titleEn: 'Legal Services',
        descriptionMn: 'Барилгын зөвшөөрөл, гэрээ, зөвлөгөө өгөх үйлчилгээ',
        descriptionEn: 'Construction permits, contracts, and consultation services',
        shortDescriptionMn: 'Барилгын хуулийн зөвлөгөө',
        shortDescriptionEn: 'Construction legal consultation',
        icon: 'scale',
        order: 2,
        active: true
      }
    }),
    prisma.service.upsert({
      where: { id: 3 },
      update: {},
      create: {
        titleMn: 'Гэр засвар',
        titleEn: 'House Renovation',
        descriptionMn: 'Хуучин гэрний засвар, сайжруулалт, өргөтгөл',
        descriptionEn: 'Old house renovation, improvement, and extension',
        shortDescriptionMn: 'Гэрний засвар үйлчилгээ',
        shortDescriptionEn: 'House renovation services',
        icon: 'hammer',
        order: 3,
        active: true
      }
    }),
    prisma.service.upsert({
      where: { id: 4 },
      update: {},
      create: {
        titleMn: 'Инженерийн шалгалт',
        titleEn: 'Engineering Inspection',
        descriptionMn: 'Барилгын инженерийн шалгалт, чанарын хяналт',
        descriptionEn: 'Construction engineering inspection and quality control',
        shortDescriptionMn: 'Инженерийн шалгалт',
        shortDescriptionEn: 'Engineering inspection',
        icon: 'clipboard-check',
        order: 4,
        active: true
      }
    })
  ])
  console.log('✅ Services created:', services.length)

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 1 },
      update: {},
      create: {
        titleMn: 'Сүхбаатар дүүргийн орон сууцны барилга',
        titleEn: 'Sukhbaatar District Residential Building',
        descriptionMn: '5 давхар, 20 орон сууцтай орон сууцны барилга. Орчин үеийн дизайн, чанартай материал ашиглан баригдсан.',
        descriptionEn: '5-story residential building with 20 apartments. Built with modern design and quality materials.',
        category: 'residential',
        location: 'Сүхбаатар дүүрэг, Улаанбаатар',
        completionDate: new Date('2024-01-15'),
        clientName: 'Монгол Улсын Засгийн Газрын Хэрэг Эрхлэх Хороо',
        testimonialMn: 'Маш сайн ажилласан, чанартай барилга баригдсан.',
        testimonialEn: 'Very well done, quality construction was completed.',
        featured: true,
        published: true
      }
    }),
    prisma.project.upsert({
      where: { id: 2 },
      update: {},
      create: {
        titleMn: 'Баянзүрх дүүргийн арилжааны төв',
        titleEn: 'Bayanzurkh District Commercial Center',
        descriptionMn: '3 давхар, 15 дэлгүүртэй арилжааны төв. Хүн амын төвд байрлах, хүрэлцээт газар.',
        descriptionEn: '3-story commercial center with 15 shops. Located in the center of the population, convenient location.',
        category: 'commercial',
        location: 'Баянзүрх дүүрэг, Улаанбаатар',
        completionDate: new Date('2024-06-01'),
        clientName: 'Баянзүрх дүүргийн Засаг дарга',
        testimonialMn: 'Арилжааны төв маш амжилттай ажиллаж байна.',
        testimonialEn: 'The commercial center is operating very successfully.',
        featured: true,
        published: true
      }
    }),
    prisma.project.upsert({
      where: { id: 3 },
      update: {},
      create: {
        titleMn: 'Хан-Уул дүүргийн гэр засвар',
        titleEn: 'Khan-Uul District House Renovation',
        descriptionMn: 'Хуучин гэрний бүрэн засвар, орчин үеийн тоног төхөөрөмж суулгах.',
        descriptionEn: 'Complete renovation of old house, installation of modern equipment.',
        category: 'residential',
        location: 'Хан-Уул дүүрэг, Улаанбаатар',
        completionDate: new Date('2024-01-01'),
        clientName: 'Бат-Эрдэнэ',
        testimonialMn: 'Гэр маш сайхан болсон, баяртай байна.',
        testimonialEn: 'The house has become very beautiful, I am happy.',
        featured: false,
        published: true
      }
    })
  ])
  console.log('✅ Projects created:', projects.length)

  // Create sample project images
  const projectImages = await Promise.all([
    prisma.projectImage.upsert({
      where: { id: 1 },
      update: {},
      create: {
        projectId: 1,
        imageUrl: '/uploads/project1-main.svg',
        captionMn: 'Сүхбаатар дүүргийн орон сууцны барилга - Үндсэн зураг',
        captionEn: 'Sukhbaatar District Residential Building - Main Image',
        isPrimary: true,
        order: 1
      }
    }),
    prisma.projectImage.upsert({
      where: { id: 2 },
      update: {},
      create: {
        projectId: 1,
        imageUrl: '/uploads/project1-interior.svg',
        captionMn: 'Сүхбаатар дүүргийн орон сууцны барилга - Доторх хэсэг',
        captionEn: 'Sukhbaatar District Residential Building - Interior',
        isPrimary: false,
        order: 2
      }
    }),
    prisma.projectImage.upsert({
      where: { id: 3 },
      update: {},
      create: {
        projectId: 2,
        imageUrl: '/uploads/project2-main.svg',
        captionMn: 'Баянзүрх дүүргийн арилжааны төв - Үндсэн зураг',
        captionEn: 'Bayanzurkh District Commercial Center - Main Image',
        isPrimary: true,
        order: 1
      }
    }),
    prisma.projectImage.upsert({
      where: { id: 4 },
      update: {},
      create: {
        projectId: 2,
        imageUrl: '/uploads/project2-exterior.svg',
        captionMn: 'Баянзүрх дүүргийн арилжааны төв - Гаднах хэсэг',
        captionEn: 'Bayanzurkh District Commercial Center - Exterior',
        isPrimary: false,
        order: 2
      }
    }),
    prisma.projectImage.upsert({
      where: { id: 5 },
      update: {},
      create: {
        projectId: 3,
        imageUrl: '/uploads/project3-main.svg',
        captionMn: 'Хан-Уул дүүргийн гэр засвар - Үндсэн зураг',
        captionEn: 'Khan-Uul District House Renovation - Main Image',
        isPrimary: true,
        order: 1
      }
    })
  ])
  console.log('✅ Project images created:', projectImages.length)

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 1 },
      update: {},
      create: {
        clientName: 'Бат-Эрдэнэ',
        clientTitle: 'Гэр бүл',
        contentMn: 'Маш сайн ажилласан, чанартай барилга баригдсан. Бүх ажил цагт нь дууссан.',
        contentEn: 'Very well done, quality construction was completed. All work was completed on time.',
        rating: 5,
        featured: true,
        published: true
      }
    }),
    prisma.testimonial.upsert({
      where: { id: 2 },
      update: {},
      create: {
        clientName: 'Сүхээ',
        clientTitle: 'Жижиг бизнес эрхлэгч',
        contentMn: 'Хуулийн үйлчилгээ маш сайн байсан. Бүх асуултад тодорхой хариулт авсан.',
        contentEn: 'Legal services were very good. Got clear answers to all questions.',
        rating: 5,
        featured: true,
        published: true
      }
    }),
    prisma.testimonial.upsert({
      where: { id: 3 },
      update: {},
      create: {
        clientName: 'Алтанцэцэг',
        clientTitle: 'Тэтгэвэрт гарсан',
        contentMn: 'Гэрний засвар маш сайн хийгдсэн. Хүссэнээс ч илүү сайхан болсон.',
        contentEn: 'House renovation was done very well. It became more beautiful than expected.',
        rating: 5,
        featured: false,
        published: true
      }
    })
  ])
  console.log('✅ Testimonials created:', testimonials.length)

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📋 Summary:')
  console.log(`- Admin user: ${admin.username}`)
  console.log(`- Services: ${services.length}`)
  console.log(`- Projects: ${projects.length}`)
  console.log(`- Project images: ${projectImages.length}`)
  console.log(`- Testimonials: ${testimonials.length}`)
  console.log('\n🔑 Login credentials:')
  console.log(`Username: ${admin.username}`)
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
