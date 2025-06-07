import { Navbar, LogoDisplay } from '..';
import styles from './index.module.css';

export const Header = () => {
  return (
    <header className={styles.header_container}>
      <LogoDisplay customClass="header_logo" />
      <Navbar />
    </header>
  );
};
