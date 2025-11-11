import type { ComponentProps } from 'react';
import styles from './index.module.css';
import type { CategoryTypes } from '../../../../hook/use-products';
import { DropdownModelItem } from '@/components';

interface CategoryButtonProps extends ComponentProps<'button'> {
  filter: CategoryTypes;
  category: CategoryTypes;
  handleClick: (category: CategoryTypes) => void;
}

export const CategoryButton = ({
  handleClick,
  filter,
  category,
  ...props
}: CategoryButtonProps) => {
  const isActive = filter === category;
  return (
    <button
      {...props}
      data-active={isActive}
      type="button"
      className={styles.category_button}
      onClick={() => handleClick(category)}
    />
  );
};

interface CategoryButtonDropdownProps extends ComponentProps<'div'> {}

export const CategoryButtonDropdown = ({ ...props }: CategoryButtonDropdownProps) => {
  return (
    <DropdownModelItem
      {...props}
      className={styles.dropdown_category_button}
      mode="dropdown"
      referenceId="categoryFilters"
    />
  );
};
