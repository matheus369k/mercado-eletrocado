import ShredderIcon from '@/assets/Shredder.svg';
import styles from './index.module.css';

export const Empty = ({ message }: { message: string }) => {
  return (
    <div className={styles.empty_container}>
      <img src={ShredderIcon} loading="lazy" alt="Um papel sendo triturado..." />
      <p>{message}</p>
    </div>
  );
};
