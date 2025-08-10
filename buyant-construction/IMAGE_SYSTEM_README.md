# Image System Documentation - Database-Driven Approach

## Overview

The Buyant Construction website uses a **pure database-driven image system** where all project images are managed through the admin interface and stored in the database. This approach provides immediate frontend updates and consistent content management.

## How It Works

### 1. **Image Upload Flow**
- Images uploaded through admin interface → saved to `/public/uploads/`
- Image metadata stored in `ProjectImage` table
- Frontend components fetch data from API and display images directly

### 2. **Database Structure**
```prisma
model Project {
  id: Int @id
  // ... other fields
  images: ProjectImage[]
}

model ProjectImage {
  id: Int @id
  projectId: Int
  imageUrl: String        // Full URL to uploaded image
  captionMn: String?      // Mongolian caption
  captionEn: String?      // English caption
  isPrimary: Boolean      // Primary image flag
  order: Int             // Display order
}
```

### 3. **Frontend Display**
- Components fetch project data from `/api/projects`
- Images displayed using `imageUrl` from database
- No hardcoded file paths

## Utility Functions

### Project Images
```tsx
import { 
  getProjectImageUrl,
  getPrimaryProjectImage, 
  getProjectGalleryImages 
} from '@/utils/images';

// Get primary image from project images array
const primaryImage = getPrimaryProjectImage(project.images);

// Get all gallery images with metadata
const galleryImages = getProjectGalleryImages(project.images);

// Use database URL directly
const imageUrl = getProjectImageUrl(project.images[0].imageUrl);
```

### Testimonial Images
```tsx
import { getTestimonialImage } from '@/utils/images';

const clientImagePath = getTestimonialImage('client1');
```

### Team Images
```tsx
import { getTeamMemberImage } from '@/utils/images';

const teamMemberPath = getTeamMemberImage('ceo');
```

## Image Optimization

The system automatically:
- Converts images to WebP/AVIF format
- Provides responsive image sizes
- Implements lazy loading
- Optimizes Core Web Vitals

## Adding New Images

### 1. **Through Admin Interface (Recommended)**
- Go to Admin → Projects
- Upload images through the image gallery manager
- Set captions, order, and primary image flag
- Images automatically appear on frontend

### 2. **Manual File Addition**
- Add image file to `/public/uploads/`
- Update database with image metadata
- Use appropriate utility functions

## Best Practices

1. **Use Admin Interface** for all project images
2. **Optimize images** before uploading (compress, resize)
3. **Use descriptive captions** in both languages
4. **Set primary images** for each project
5. **Order images logically** for gallery display
6. **Use consistent naming** for uploaded files

## Example Usage in Components

### Projects Carousel
```tsx
{projects.map((project, index) => (
  <ProjectImage 
    key={project.id}
    src={project.images[0].imageUrl}
    alt={project.images[0].captionEn}
    width={400}
    height={300}
    priority={index === 0}
    className="w-full h-full hover:scale-110"
  />
))}
```

### Projects Grid
```tsx
{projects.map((project) => {
  const primaryImage = getPrimaryProjectImage(project.images);
  
  return (
    <div key={project.id}>
      {primaryImage ? (
        <img
          src={primaryImage}
          alt={project.titleEn}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="placeholder">No image</div>
      )}
    </div>
  );
})}
```

### Testimonials Section
```tsx
{testimonials.map((testimonial) => (
  <div key={testimonial.id}>
    {testimonial.clientImageId && (
      <TestimonialImage 
        clientId={testimonial.clientImageId} 
        className="w-12 h-12"
      />
    )}
    {/* testimonial content */}
  </div>
))}
```

### Team Section
```tsx
{teamMembers.map((member) => (
  <div key={member.id}>
    <TeamMemberImage 
      memberId={member.id} 
      className="w-48 h-64 rounded-lg"
    />
    {/* member info */}
  </div>
))}
```

## Benefits of Database-Driven Approach

### ✅ **Immediate Updates**
- Admin changes reflect instantly on website
- No need to rebuild or redeploy

### ✅ **Content Management**
- Non-technical users can manage all content
- Centralized image management

### ✅ **Scalability**
- Easy to add new image types
- Simple to implement CDN, optimization

### ✅ **Consistency**
- Single source of truth for all content
- Consistent data structure

## File Organization

### Current Structure
```
public/uploads/
  ├── 2-1754848821296-0.jpeg          # Example uploaded image
  ├── project1-interior.svg            # Project-specific images
  ├── project1-main.svg
  ├── project2-exterior.svg
  └── project3-main.svg
```

### Recommended Future Structure
```
public/uploads/
  └── projects/
      ├── project-1/
      │   ├── main.jpg
      │   ├── thumbnail.jpg
      │   └── gallery/
      │       ├── interior-1.jpg
      │       └── exterior-1.jpg
      └── project-2/
          └── ...
```

## Troubleshooting

### Common Issues

1. **Images not displaying**
   - Check if `imageUrl` exists in database
   - Verify file exists in `/public/uploads/`
   - Check file permissions

2. **Wrong image order**
   - Update `order` field in database
   - Use admin interface to reorder images

3. **Missing primary image**
   - Set `isPrimary: true` for one image per project
   - Use `getPrimaryProjectImage()` utility

### Debug Steps

1. Check browser console for errors
2. Verify API response contains image data
3. Confirm image URLs are accessible
4. Check database for image records

## Future Enhancements

1. **Image Cleanup**: Automatic removal of unused images
2. **CDN Integration**: Cloud storage for better performance
3. **Advanced Optimization**: Automatic WebP conversion, resizing
4. **Image Analytics**: Track image usage and performance
