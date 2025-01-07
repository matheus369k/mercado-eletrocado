import styles from './index.module.css';
import { ComponentProps } from 'react';

interface LabelProps extends ComponentProps<'label'> {
  errors: string | undefined;
}

export const Label = ({ errors, ...props }: LabelProps) => {
  return (
    <p className={styles.label_container}>
      <label {...props} />
      {errors && <span>{errors}</span>}
    </p>
  );
};
