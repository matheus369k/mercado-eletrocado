import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export const Button = ({ ...props }: ButtonProps) => {
  return <button {...props} />;
};
