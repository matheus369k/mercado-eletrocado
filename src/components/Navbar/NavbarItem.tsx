import { Link, LinkProps } from 'react-router-dom';
import styles from './index.module.css';
import type { ComponentProps } from 'react';

interface NavbarItemRootProps extends ComponentProps<'li'> {
  isCurrentPage: boolean;
}

export const NavbarItemRoot = ({ isCurrentPage, ...props }: NavbarItemRootProps) => {
  return (
    <li
      {...props}
      className={`${isCurrentPage && styles.current_bar} ${styles.navbar__links__items}`}
    />
  );
};

interface NavbarItemLinkProps extends LinkProps {}

export const NavbarItemLink = ({ ...props }: NavbarItemLinkProps) => {
  return <Link {...props} />;
};
