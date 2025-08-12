# Adding New Projects

This website now uses static data instead of a database for projects. This eliminates database connection issues and makes the site completely static.

## How to Add a New Project

### 1. Upload Project Images

1. Add your project images to the `public/uploads/` directory
2. Use descriptive filenames (e.g., `project7-main.jpg`, `project7-interior.jpg`)
3. Supported formats: JPG, PNG, SVG, WebP

### 2. Update the Projects Data File

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
      url: '/uploads/project7-main.jpg', // Image path relative to public directory
      captionMn: 'Үндсэн харагдах байдал', // Mongolian caption
      captionEn: 'Main view', // English caption
      isPrimary: true, // Set to true for the main/cover image
      order: 1 // Display order
    },
    {
      url: '/uploads/project7-interior.jpg',
      captionMn: 'Дотор харагдах байдал',
      captionEn: 'Interior view',
      isPrimary: false,
      order: 2
    }
  ]
}
```

### 3. Image Guidelines

- **Primary Image**: Set `isPrimary: true` for the main project image
- **Image Order**: Use `order` field to control display sequence
- **Captions**: Provide both Mongolian and English captions
- **File Paths**: Always start with `/uploads/` (relative to public directory)

### 4. Project Categories

- `residential` - Орон сууцны / Residential
- `commercial` - Арилжааны / Commercial  
- `renovation` - Засалт / Renovation

### 5. Deployment

After adding a new project:

1. Commit your changes to git
2. Deploy to your hosting platform
3. The new project will appear automatically

## Benefits of This Approach

✅ **No Database Required** - Everything is static files
✅ **Faster Loading** - No API calls needed
✅ **Easier Deployment** - Just static files
✅ **Version Control** - Project changes tracked in git
✅ **Simple Maintenance** - Edit one file to update projects

## Example Project Structure

```
public/uploads/
├── project1-main.svg
├── project1-interior.svg
├── project2-main.svg
├── project2-exterior.svg
├── project3-main.svg
└── new-project-main.jpg  ← Add your new images here
```

## Need Help?

If you need to add many projects or want to automate the process, we can create a simple admin interface that generates the projects.ts file from a form.
