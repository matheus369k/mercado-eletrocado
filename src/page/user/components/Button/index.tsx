import styles from './index.module.css';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export const Button = ({ ...props }: ButtonProps) => {
  return <button {...props} className={styles.button_submit} />;
};
