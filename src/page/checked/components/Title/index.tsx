import styles from './index.module.css';
import { ComponentProps } from 'react';

export const Title = ({ ...props }: ComponentProps<'h2'>) => {
  return <h2 {...props} className={styles.title} />;
};
