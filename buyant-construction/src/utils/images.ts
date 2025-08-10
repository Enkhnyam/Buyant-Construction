// Project image utilities - Pure Database-Driven Approach
export const getProjectImageUrl = (imageUrl: string) => {
  // Use the URL stored in database directly
  return imageUrl;
};

// Helper function to get primary image from project images array
export const getPrimaryProjectImage = (images: Array<{ imageUrl: string; isPrimary: boolean }>) => {
  const primaryImage = images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.imageUrl : images[0]?.imageUrl || '';
};

// Helper function to get all gallery images
export const getProjectGalleryImages = (images: Array<{ 
  id: number; 
  imageUrl: string; 
  captionMn?: string; 
  captionEn?: string; 
  isPrimary: boolean; 
  order: number 
}>) => {
  return images
    .sort((a, b) => a.order - b.order)
    .map(img => ({
      src: img.imageUrl,
      alt: img.captionMn || img.captionEn || 'Project image',
      captionMn: img.captionMn,
      captionEn: img.captionEn,
      isPrimary: img.isPrimary,
      order: img.order
    }));
};

// Testimonial image utilities
export const getTestimonialImage = (clientId: string) => {
  return `/testimonials/${clientId}.webp`;
};

// About/Team image utilities
export const getTeamMemberImage = (memberId: string) => {
  return `/about/team/${memberId}.webp`;
};

export const getOfficeImage = (imageName: string) => {
  return `/about/office/${imageName}.webp`;
};

export const getCompanyImage = (imageName: string) => {
  return `/about/company/${imageName}.webp`;
};
