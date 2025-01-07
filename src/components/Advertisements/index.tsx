import adNotebook from '@/assets/notebook-propaganda.png';
import adPhones from '@/assets/phones-propaganda.jpeg';
import styles from './index.module.css';

export const Advertisements = () => {
  return (
    <div className={styles.newspaper_container}>
      <div>
        <img src={adNotebook} alt="Propaganda de notebooks" />
      </div>
      <div>
        <img src={adPhones} alt="propaganda de celulares" />
      </div>
    </div>
  );
};
