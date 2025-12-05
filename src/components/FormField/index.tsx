import type { ComponentProps } from 'react';
import styles from './index.module.css';
import { useFormContext } from 'react-hook-form';

export interface FormFieldRootProps extends ComponentProps<'div'> {
  customClass?: string;
}

export const FormFieldRoot = ({ customClass = '', ...props }: FormFieldRootProps) => {
  return <div {...props} className={`${styles.form_field_container} ${styles[customClass]}`} />;
};

interface FormFieldInputProps extends Omit<ComponentProps<'input'>, 'name'> {
  name: string;
}

export const FormFieldInput = ({ ...props }: FormFieldInputProps) => {
  const { register } = useFormContext();
  return <input {...props} {...register(props.name)} />;
};
