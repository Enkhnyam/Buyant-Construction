import Image from 'next/image';

interface ProjectImageProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export const ProjectImage = ({ 
  src, 
  alt, 
  className = '',
  priority = false,
  width = 800,
  height = 600,
  fill = false,
  sizes = '100vw'
}: ProjectImageProps) => {
  const defaultAlt = alt || 'Project image';
  const isSvg = typeof src === 'string' && src.toLowerCase().endsWith('.svg');
  
  // Use a plain <img> for SVGs for predictable rendering behavior
  if (isSvg) {
    if (fill) {
      return (
        <img
          src={src}
          alt={defaultAlt}
          className={`object-cover absolute inset-0 w-full h-full ${className}`}
        />
      );
    }
    return (
      <img
        src={src}
        alt={defaultAlt}
        width={width}
        height={height}
        className={`object-cover ${className}`}
      />
    );
  }

  return fill ? (
    <Image
      src={src}
      alt={defaultAlt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  ) : (
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
