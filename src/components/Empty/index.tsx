import ShredderIcon from '@/assets/Shredder.svg';
import styles from './index.module.css';

export type EmptyProps = { message: string };

export const Empty = ({ message }: EmptyProps) => {
  return (
    <div className={styles.empty_container}>
      <img src={ShredderIcon} loading="lazy" alt="Um papel sendo triturado..." />
      <p>{message}</p>
    </div>
  );
};
