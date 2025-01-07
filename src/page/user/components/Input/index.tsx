import { FieldError, useFormContext } from 'react-hook-form';
import styles from './index.module.css';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  fieldName: string;
  errors: FieldError | undefined;
}

export const Input = ({ fieldName, errors, ...props }: InputProps) => {
  const { register } = useFormContext();

  return (
    <input
      {...register(fieldName)}
      {...props}
      className={`${errors ? styles.error : ''} ${styles.input_field}`}
    />
  );
};
