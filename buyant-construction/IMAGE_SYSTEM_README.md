# Image Management System

This document explains how to use the optimized image management system for Buyant Construction.

## Overview

The system provides optimized image handling for three main categories:
- **Projects**: Main images, thumbnails, and gallery images
- **Testimonials**: Client photos
- **About Us**: Team member photos, office images, and company photos

## Directory Structure

```
public/
├── projects/
│   ├── project1/
│   │   ├── main.webp          # Main carousel image
│   │   ├── thumbnail.webp     # Smaller version for lists
│   │   └── gallery/           # Additional project images
│   │       ├── interior1.webp
│   │       ├── exterior1.webp
│   │       └── progress1.webp
│   ├── project2/
│   └── project3/
├── testimonials/
│   ├── client1.webp
│   ├── client2.webp
│   └── client3.webp
└── about/
    ├── team/
    │   ├── ceo.webp
    │   ├── architect1.webp
    │   └── engineer1.webp
    ├── office/
    │   ├── office-main.webp
    │   └── meeting-room.webp
    └── company/
        ├── history1.webp
        └── awards.webp
```

## Components

### ProjectImage
Displays project images with optimization.

```tsx
import { ProjectImage } from '@/components/ProjectImage';

// Main project image (carousel)
<ProjectImage 
  projectId="project1" 
  variant="main" 
  priority={true}
  className="rounded-lg shadow-lg"
/>

// Thumbnail version (project lists)
<ProjectImage 
  projectId="project1" 
  variant="thumbnail"
  className="rounded-md hover:scale-105"
/>
```

### TestimonialImage
Displays client testimonial photos.

```tsx
import { TestimonialImage } from '@/components/TestimonialImage';

<TestimonialImage 
  clientId="client1" 
  className="w-16 h-16"
/>
```

### TeamMemberImage
Displays team member photos.

```tsx
import { TeamMemberImage } from '@/components/TeamMemberImage';

<TeamMemberImage 
  memberId="ceo" 
  className="w-64 h-80 rounded-lg"
/>
```

## Utility Functions

### Project Images
```tsx
import { 
  getProjectMainImage, 
  getProjectThumbnail, 
  getProjectGalleryImages 
} from '@/utils/images';

// Get main project image path
const mainImagePath = getProjectMainImage('project1');

// Get thumbnail path
const thumbnailPath = getProjectThumbnail('project1');

// Get gallery images
const galleryImages = getProjectGalleryImages('project1');
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

### 1. Add the image file to the appropriate directory
### 2. Use the corresponding component or utility function
### 3. The system will automatically optimize and serve the image

## Best Practices

1. **Use WebP format** for best compression
2. **Optimize images** before uploading (compress, resize)
3. **Use descriptive filenames** (e.g., `project1-main.webp`)
4. **Keep consistent naming** conventions
5. **Use appropriate image sizes** for different use cases

## Example Usage in Components

### Projects Carousel
```tsx
{projects.map((project, index) => (
  <ProjectImage 
    key={project.id}
    projectId={project.id.toString()} 
    variant="main" 
    priority={index === 0}
    className="w-full h-full hover:scale-110"
  />
))}
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

## Troubleshooting

### Image not loading
- Check if the file exists in the correct directory
- Verify the file path in the utility function
- Ensure the image format is supported (WebP recommended)

### Performance issues
- Use `priority={true}` for above-the-fold images
- Implement lazy loading for below-the-fold images
- Optimize image sizes before uploading

## Migration from Old System

If you're migrating from the old image system:
1. Move images to the new directory structure
2. Update component imports to use new components
3. Replace `img` tags with appropriate image components
4. Update image paths to use utility functions

## Support

For questions or issues with the image system, check:
1. This documentation
2. Component source code
3. Utility function implementations
4. Next.js Image component documentation
