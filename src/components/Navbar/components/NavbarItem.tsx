import { Link, LinkProps } from 'react-router-dom';
import styles from '../index.module.css';
import type { ComponentProps } from 'react';
import { DropdownModelItem } from '@/components/DropdownModel';

export interface NavbarItemRootProps extends ComponentProps<'li'> {
  isCurrentPage: boolean;
}

export const NavbarItemRoot = ({ isCurrentPage, ...props }: NavbarItemRootProps) => {
  return (
    <li {...props} className={`${isCurrentPage && styles.current_bar} ${styles.links_items}`} />
  );
};

interface NavbarDropdownItemRootProps extends ComponentProps<'div'> {
  isCurrentPage: boolean;
  referenceId: string;
}

export const NavbarDropdownItemRoot = ({
  isCurrentPage,
  referenceId,
  ...props
}: NavbarDropdownItemRootProps) => {
  return (
    <DropdownModelItem
      {...props}
      className={`${isCurrentPage && styles.current_bar} ${styles.links_items}`}
      mode="dropdown"
      referenceId={referenceId}
    />
  );
};

interface NavbarItemLinkProps extends LinkProps {}

export const NavbarItemLink = ({ ...props }: NavbarItemLinkProps) => {
  return <Link {...props} />;
};
