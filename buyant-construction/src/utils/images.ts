// Project image utilities
export const getProjectMainImage = (projectId: string) => {
  return `/projects/${projectId}/main.webp`;
};

export const getProjectThumbnail = (projectId: string) => {
  return `/projects/${projectId}/thumbnail.webp`;
};

export const getProjectGalleryImages = (projectId: string) => {
  // This could be dynamic based on what images exist
  const galleryTypes = ['interior', 'exterior', 'progress', 'detail'];
  return galleryTypes.map(type => ({
    src: `/projects/${projectId}/gallery/${type}1.webp`,
    alt: `${projectId} ${type} view`,
    type
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
