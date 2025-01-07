import { Link } from 'react-router-dom';
import styles from './index.module.css';

interface NavbarItemProps {
  children: React.ReactNode;
  isCurrentPageHome: boolean;
  redirectionRoute: string;
}

export const NavbarItem = ({ children, isCurrentPageHome, redirectionRoute }: NavbarItemProps) => {
  return (
    <li className={`${isCurrentPageHome && styles.current_bar} ${styles.navbar_item}`}>
      <Link to={redirectionRoute}>{children}</Link>
    </li>
  );
};
