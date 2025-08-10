import Image from 'next/image';
import { getTeamMemberImage } from '@/utils/images';

interface TeamMemberImageProps {
  memberId: string;
  alt?: string;
  className?: string;
}

export const TeamMemberImage = ({ memberId, alt, className = '' }: TeamMemberImageProps) => {
  return (
    <Image
      src={getTeamMemberImage(memberId)}
      alt={alt || `Team member ${memberId}`}
      width={300}
      height={400}
      className={`object-cover ${className}`}
    />
  );
};
