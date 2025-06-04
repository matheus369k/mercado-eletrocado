import styles from './index.module.css';
import { LogoDisplay } from '..';

export const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <LogoDisplay customClass="footer_logo" />
      <p>Copyright 2024. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
