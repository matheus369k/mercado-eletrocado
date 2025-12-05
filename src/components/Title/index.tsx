import { ComponentProps } from 'react';
import styles from './index.module.css';

export type TitleRootProps = ComponentProps<'div'>;

export const TitleRoot = ({ ...props }: TitleRootProps) => {
  return <div {...props} className={styles.title_container} />;
};

export type TitleContentProps = ComponentProps<'h2'>;

export const TitleContent = ({ ...props }: TitleContentProps) => {
  return <h2 {...props} className={styles.title_content} />;
};
