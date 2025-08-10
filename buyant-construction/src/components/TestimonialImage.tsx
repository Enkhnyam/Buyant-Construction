import Image from 'next/image';
import { getTestimonialImage } from '@/utils/images';

interface TestimonialImageProps {
  clientId: string;
  alt?: string;
  className?: string;
}

export const TestimonialImage = ({ clientId, alt, className = '' }: TestimonialImageProps) => {
  return (
    <Image
      src={getTestimonialImage(clientId)}
      alt={alt || `${clientId} testimonial`}
      width={200}
      height={200}
      className={`rounded-full object-cover ${className}`}
    />
  );
};
