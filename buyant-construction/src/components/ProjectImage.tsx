import Image from 'next/image';
import { getProjectMainImage, getProjectThumbnail } from '@/utils/images';

interface ProjectImageProps {
  projectId: string;
  variant?: 'main' | 'thumbnail';
  alt?: string;
  className?: string;
  priority?: boolean;
}

export const ProjectImage = ({ 
  projectId, 
  variant = 'main', 
  alt, 
  className = '',
  priority = false 
}: ProjectImageProps) => {
  const src = variant === 'main' 
    ? getProjectMainImage(projectId)
    : getProjectThumbnail(projectId);
    
  const defaultAlt = alt || `${projectId} project ${variant}`;
  
  return (
    <Image
      src={src}
      alt={defaultAlt}
      width={variant === 'main' ? 800 : 400}
      height={variant === 'main' ? 600 : 300}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
};
