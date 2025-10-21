import { UserLoginType, zodSchemaUserLogin } from '@/@types/user-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { useLogin } from './hooks/use-login';
import styles from './index.module.css';
import { Button, TitleContent, TitleRoot } from '@/components';
import { FormFieldInput, FormFieldRoot } from '@/components';

export const UserLogin = () => {
  const hookUseForm = useForm<UserLoginType>({
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
      <TitleRoot>
        <TitleContent>Entrar</TitleContent>
      </TitleRoot>
      <FormProvider {...hookUseForm}>
        <form onSubmit={handleSubmit(handleUserLogin)} className={styles.form_container}>
          <FormFieldRoot {...(errors.email && { 'data-error': errors.email.message })}>
            <FormFieldInput
              aria-label="email"
              type="email"
              name="email"
              maxLength={50}
              placeholder="Digite seu e-mail..."
            />
            <MdOutlineEmail />
          </FormFieldRoot>

          <FormFieldRoot {...(errors.password && { 'data-error': errors.password.message })}>
            <FormFieldInput
              aria-label="password"
              type="password"
              name="password"
              maxLength={16}
              placeholder="Digite sua senha"
            />
            <MdLockOutline />
          </FormFieldRoot>

          <div className={styles.options_container}>
            <div>
              <FormFieldInput aria-label="auto connection" type="checkbox" name="auto_connection" />
              <p>Manter-me conectado(a)</p>
            </div>
            <span onClick={handleForgetPassword} className={styles.forget_pass}>
              Esqueceu a senha?
            </span>
            <Button type="submit" customClass="btn_form">
              Entrar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
