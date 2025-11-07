import styles from './index.module.css';
import { env } from '@/env';

type AvatarProps = {
  avatarUrl?: string | null;
  previewUrl?: string | null;
  name?: string;
};

export const Avatar = ({ avatarUrl, previewUrl, name }: AvatarProps) => {
  let imgUrl = `https:placehold.co/250x250/f4f4f5/09090b?text=${name.at(0).toUpperCase()}`;

  if (avatarUrl) {
    imgUrl = env.VITE_DATABASE_URL.concat('/' + avatarUrl);
  }

  if (previewUrl) {
    imgUrl = previewUrl;
  }

  return (
    <div className={styles.img_container}>
      <img src={imgUrl} alt="" className={styles.profile_img} />
    </div>
  );
};
