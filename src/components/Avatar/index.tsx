import { useRef, type ComponentRef } from 'react';
import styles from './index.module.css';
import { env } from '@/env';

type AvatarProps = {
  avatarUrl?: string | null;
  previewUrl?: string | null;
  name?: string;
};

export const Avatar = ({ avatarUrl, previewUrl, name }: AvatarProps) => {
  const imageRef = useRef<null | ComponentRef<'img'>>(null);
  let imageUrl: string | null = null;

  if (avatarUrl) {
    imageUrl = env.VITE_DATABASE_URL.concat('/' + avatarUrl);
  }

  if (previewUrl) {
    imageUrl = previewUrl;
  }

  const handleErrorImage = () => {
    const firstLetterOfName = name.at(0).toUpperCase();
    imageRef.current.src = `https://placehold.co/250x250/f4f4f5/09090b?text=${firstLetterOfName}`;
  };

  return (
    <div className={styles.img_container}>
      <img
        ref={imageRef}
        src={imageUrl}
        onError={handleErrorImage}
        alt="avatar profile image"
        className={styles.profile_img}
        loading="lazy"
      />
    </div>
  );
};
