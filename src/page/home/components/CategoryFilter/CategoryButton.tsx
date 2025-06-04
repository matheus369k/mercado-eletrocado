import type { ComponentProps } from 'react';
import styles from './index.module.css';
import type { CategoryTypes } from '../../Home';

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
  return (
    <button
      {...props}
      type="button"
      {...(filter === category && { className: styles.active })}
      onClick={() => handleClick(category)}
    />
  );
};
