# Adding New Projects

This website now uses static data instead of a database for projects. This eliminates database connection issues and makes the site completely static.

## Project Organization Structure

Projects are now organized in individual folders for better management:

```
public/uploads/
├── project-1/           # Residential Building
│   ├── main-view.svg    # Main project image
│   └── interior-view.svg # Interior view
├── project-2/           # Commercial Center
│   ├── main-view.svg    # Main project image
│   └── exterior-view.svg # Exterior view
├── project-3/           # Renovation Project
│   └── main-view.svg    # Main project image
├── project-4/           # Private House
│   ├── main-view.jpeg   # Main project image
│   └── side-view.jpeg   # Side view
├── project-5/           # Office Building
│   ├── main-view.jpeg   # Main project image
│   ├── environment-view.jpeg # Environment view
│   ├── side-view.jpeg   # Side view
│   ├── detail-view.jpeg # Detail view
│   └── additional-view.jpeg # Additional view
└── project-6/           # Hostel Building
    ├── main-view.jpeg   # Main project image
    ├── side-view.jpeg   # Side view
    ├── detail-view.jpeg # Detail view
    ├── additional-view.jpeg # Additional view
    ├── interior-view.jpeg # Interior view
    ├── exterior-view.jpeg # Exterior view
    ├── closeup-view.jpeg # Closeup view
    └── wide-view.jpeg   # Wide view
```

## How to Add a New Project

### 1. Create Project Folder

1. Create a new folder in `public/uploads/` with the naming convention: `project-7`, `project-8`, etc.
2. This keeps your project images organized and easy to manage

### 2. Upload Project Images

1. Add your project images to the new project folder
2. Use descriptive filenames following this convention:
   - `main-view.jpg` - Main/cover image (required)
   - `side-view.jpg` - Side view
   - `interior-view.jpg` - Interior view
   - `exterior-view.jpg` - Exterior view
   - `detail-view.jpg` - Detail/closeup view
   - `environment-view.jpg` - Environment/surroundings
   - `additional-view.jpg` - Additional angles
3. Supported formats: JPG, PNG, SVG, WebP

### 3. Update the Projects Data File

Edit `src/data/projects.ts` and add a new project object:

```typescript
{
  id: 'project-7', // Unique identifier
  titleMn: 'Шинэ төслийн нэр', // Mongolian title
  titleEn: 'New Project Name', // English title
  descriptionMn: 'Төслийн тайлбар монгол хэлээр', // Mongolian description
  descriptionEn: 'Project description in English', // English description
  category: 'residential', // 'residential', 'commercial', or 'renovation'
  location: 'Ulaanbaatar, Mongolia', // Project location
  completionDate: '2024-01-15', // Completion date (YYYY-MM-DD format)
  clientName: 'Client Name', // Client name (optional)
  testimonialMn: 'Хэрэглэгчийн сэтгэгдэл', // Mongolian testimonial (optional)
  testimonialEn: 'Client testimonial', // English testimonial (optional)
  featured: true, // Whether to show in featured sections
  published: true, // Whether to show on the website
  area: '1,500', // Project area (optional)
  duration: '12 months', // Project duration (optional)
  team: '10', // Team size (optional)
  features: ['Feature 1', 'Feature 2', 'Feature 3'], // Key features (optional)
  images: [
    {
      url: '/uploads/project-7/main-view.jpg', // Image path relative to public directory
      captionMn: 'Үндсэн харагдах байдал', // Mongolian caption
      captionEn: 'Main view', // English caption
      isPrimary: true, // Set to true for the main/cover image
      order: 1 // Display order
    },
    {
      url: '/uploads/project-7/side-view.jpg',
      captionMn: 'Хажуугийн харагдах байдал',
      captionEn: 'Side view',
      isPrimary: false,
      order: 2
    }
  ]
}
```

### 4. Image Guidelines

- **Primary Image**: Set `isPrimary: true` for the main project image (required)
- **Image Order**: Use `order` field to control display sequence
- **Captions**: Provide both Mongolian and English captions
- **File Paths**: Always use the format `/uploads/project-X/filename.ext`
- **Naming Convention**: Use descriptive names like `main-view`, `side-view`, `interior-view`

### 5. Project Categories

- `residential` - Орон сууцны / Residential
- `commercial` - Арилжааны / Commercial  
- `renovation` - Засалт / Renovation

### 6. Deployment

After adding a new project:

1. Commit your changes to git
2. Deploy to your hosting platform
3. The new project will appear automatically

## Benefits of This Organization

✅ **Clear Structure** - Each project has its own folder  
✅ **Easy Management** - Find and edit project images quickly  
✅ **Descriptive Names** - Understand what each image shows  
✅ **Scalable** - Easy to add more projects and images  
✅ **Professional** - Organized file structure for clients  

## Example: Adding Project 7

1. **Create folder**: `public/uploads/project-7/`
2. **Add images**:
   - `project-7/main-view.jpg` (main image)
   - `project-7/interior-view.jpg` (interior)
   - `project-7/exterior-view.jpg` (exterior)
3. **Update** `src/data/projects.ts`
4. **Deploy** - done!

## Need Help?

If you need to add many projects or want to automate the process, we can create a simple admin interface that generates the projects.ts file from a form.
