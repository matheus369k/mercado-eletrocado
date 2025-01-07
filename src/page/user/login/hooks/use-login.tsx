import type { UserLogin } from '@/@types/user-schema';
import { UseFormSetValue } from 'react-hook-form';
import { routesPath } from '@/routes/routes-path';
import { getCookies } from '@/functions';

export const useLogin = (setValue: UseFormSetValue<UserLogin>) => {
  const handleForgetPassword = () => {
    console.log('Esqueceu a senha');
    const { email, password }: UserLogin = getCookies();

    setValue('email', email);
    setValue('password', password);
  };

  const handleUserLogin = (data: UserLogin) => {
    localStorage.setItem('autLogin', 'true');
    console.log(data);

    window.location.replace(routesPath.HOME);
  };

  return {
    handleUserLogin,
    handleForgetPassword,
  };
};
