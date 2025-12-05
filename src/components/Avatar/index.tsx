import { useState } from 'react';
import styles from './index.module.css';
import { env } from '@/env';

export type AvatarProps = {
  avatarUrl?: string | null;
  previewUrl?: string | null;
  name?: string;
};

export const Avatar = ({ avatarUrl, previewUrl, name }: AvatarProps) => {
  const firstLetterOfName = name.at(0).toUpperCase();
  const placeholdAvatar = `https://placehold.co/250x250/f4f4f5/09090b?text=${firstLetterOfName}`;
  const [avatar, setAvatar] = useState<string>(() => {
    if (avatarUrl) return `${env.VITE_DATABASE_URL}/${avatarUrl}`;

    return placeholdAvatar;
  });

  if (previewUrl && avatar !== previewUrl) {
    setAvatar(previewUrl);
  }

  const handleErrorImage = () => {
    setAvatar(placeholdAvatar);
  };

  return (
    <div className={styles.img_container}>
      <img
        src={avatar}
        onError={handleErrorImage}
        alt="avatar profile image"
        className={styles.profile_img}
        loading="lazy"
      />
    </div>
  );
};
