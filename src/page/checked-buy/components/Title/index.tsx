import styles from './index.module.css';
import { ComponentProps } from 'react';

interface TitleProps extends ComponentProps<'h2'> {
  customClass: string;
}

export const Title = ({ children, customClass, ...props }: TitleProps) => {
  return (
    <h2 {...props} className={styles[customClass]}>
      {children}
    </h2>
  );
};
