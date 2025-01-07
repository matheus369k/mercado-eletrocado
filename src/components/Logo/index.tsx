import logo from '@/assets/logo.png';
import styles from './index.module.css';

export const LogoDisplay = ({ customClass }: { customClass: string }) => {
  return (
    <h1 className={`${styles.logo} ${styles[customClass]}`}>
      <img src={logo} alt="Logo do site" />
      letrocado
    </h1>
  );
};
