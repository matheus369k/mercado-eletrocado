import { ComponentProps } from 'react';
import styles from './index.module.css';

type TitleProps = ComponentProps<'h2'>;

export const Title = ({ ...props }: TitleProps) => {
  return <h2 {...props} className={styles.title} />;
};
