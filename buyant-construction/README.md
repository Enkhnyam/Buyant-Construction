# Буяант Барилга (Buyant Construction)

A modern, professional website for Buyant Construction, a leading construction company in Mongolia. Built with Next.js, featuring a comprehensive admin panel, project showcase, and multilingual support.

## 🌟 Features

- **Modern Design**: Beautiful, responsive UI built with Next.js and Tailwind CSS
- **Admin Panel**: Complete content management system for projects, services, and testimonials
- **Multilingual**: Support for Mongolian and English languages
- **Image Management**: Advanced image upload and gallery management
- **Database**: Prisma ORM with SQLite (local) / PostgreSQL (production)
- **Docker Ready**: Fully containerized for easy deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Enkhnyam/Buyant-Construction.git
   cd Buyant-Construction
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually**
   ```bash
   npm run docker:build
   npm run docker:run
   ```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (main)/            # Public pages
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/             # Reusable components
├── contexts/               # React contexts
├── lib/                    # Database and auth utilities
└── types/                  # TypeScript type definitions
```

## 🔧 Admin Access

- **URL**: `/admin`
- **Default credentials**: Check the seed script or contact administrator
- **Features**: Manage projects, services, testimonials, and media

## 🌍 Languages

- **Mongolian (Монгол)**: Primary language
- **English**: Secondary language
- **Language switching**: Available in the header navigation

## 📱 Responsive Design

Fully responsive design that works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Coolify (Recommended)
This project is optimized for Coolify deployment with:
- Health check endpoint (`/api/health`)
- Environment variable configuration
- Volume mounts for persistent storage
- PostgreSQL database support

### Other Platforms
- Vercel
- Netlify
- AWS
- Any platform supporting Node.js

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📞 Contact

For more information about Buyant Construction services, please visit our website or contact us directly.

---

**Буяант Барилга** - Building Mongolia's Future, One Project at a Time.
