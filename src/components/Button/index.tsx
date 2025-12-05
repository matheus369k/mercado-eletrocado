import { ComponentProps } from 'react';
import styles from './index.module.css';

export interface ButtonProps extends ComponentProps<'button'> {
  customClass?: string;
  btnType?: 'outline' | 'default';
}

export const Button = ({ customClass = '', btnType = 'default', ...props }: ButtonProps) => {
  return (
    <button {...props} data-btn-type={btnType} className={`${styles[customClass]} ${styles.btn}`} />
  );
};
