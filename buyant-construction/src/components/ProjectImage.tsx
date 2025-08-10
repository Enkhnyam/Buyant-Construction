import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const ProjectImage = ({ 
  src, 
  alt, 
  className = '',
  priority = false,
  width = 800,
  height = 600
}: ProjectImageProps) => {
  const defaultAlt = alt || 'Project image';
  
  return (
    <Image
      src={src}
      alt={defaultAlt}
      width={width}
      height={height}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
};
