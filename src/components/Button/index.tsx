import { ComponentProps } from 'react';
import styles from './index.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  customClass?: string;
}

export const Button = ({ customClass = '', ...props }: ButtonProps) => {
  return <button {...props} className={`${styles[customClass]} ${styles.btn}`} />;
};
