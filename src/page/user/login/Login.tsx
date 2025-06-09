import { UserLogin, zodSchemaUserLogin } from '@/@types/user-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Label, Button } from '../components';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { useLogin } from './hooks/use-login';
import styles from './index.module.css';
import { TitleContent } from '@/components';

export const Login = () => {
  const hookUseForm = useForm<UserLogin>({
    resolver: zodResolver(zodSchemaUserLogin),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = hookUseForm;
  const { handleForgetPassword, handleUserLogin } = useLogin(setValue);

  return (
    <div className={styles.login_container}>
      <TitleContent>Entrar</TitleContent>
      <FormProvider {...hookUseForm}>
        <form onSubmit={handleSubmit(handleUserLogin)} className={styles.login_form}>
          <Label errors={errors.email?.message} htmlFor="email">
            <MdOutlineEmail />
            Email
          </Label>
          <Input
            errors={errors.email}
            fieldName="email"
            type="email"
            name="email"
            placeholder="Insira seu email..."
          />
          <Label errors={errors.password?.message} htmlFor="password">
            <IoKeyOutline />
            Senha
          </Label>
          <Input
            errors={errors.password}
            fieldName="password"
            type="password"
            name="password"
            placeholder="Insira sua senha..."
          />
          <span onClick={handleForgetPassword} className={styles.login_forget_pass}>
            Esqueceu a Senha?
          </span>
          <Button type="submit">Login</Button>
        </form>
      </FormProvider>
    </div>
  );
};
