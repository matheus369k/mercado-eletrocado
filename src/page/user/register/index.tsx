import { UserRegisterType, zodSchemaUserRegister } from '@/@types/user-schema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from './hooks/useRegister';
import styles from './index.module.css';
import { TitleContent, TitleRoot, Button } from '@/components';
import { MdOutlineEmail } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { MdLockOutline } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FormFieldInput, FormFieldRoot } from '../components';

export const UserRegister = () => {
  const { handleRegisterUserForm } = useRegister();
  const hookUseForm = useForm<UserRegisterType>({
    resolver: zodResolver(zodSchemaUserRegister),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = hookUseForm;

  return (
    <div className={styles.register_container}>
      <TitleRoot>
        <TitleContent>Registra-se</TitleContent>
      </TitleRoot>

      <FormProvider {...hookUseForm}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleRegisterUserForm)}
          className={styles.register__form_container}>
          <FormFieldRoot {...(errors.full_name && { 'data-error': errors.full_name.message })}>
            <FormFieldInput
              aria-label="full name"
              placeholder="Digite seu nome completo..."
              type="text"
              name="full_name"
              maxLength={30}
            />
            <GoPeople />
          </FormFieldRoot>

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

          <FormFieldRoot {...(errors.cep && { 'data-error': errors.cep.message })}>
            <FormFieldInput
              aria-label="cep"
              type="text"
              name="cep"
              maxLength={9}
              placeholder="Digite seu cep..."
            />
            <MdOutlineLocationOn />
          </FormFieldRoot>

          <div className={styles.register__form__contract_options_container}>
            <div>
              <FormFieldInput aria-label="auto connection" type="checkbox" name="auto_connection" />
              <label htmlFor="auto_connection">Manter-me conectado(a)</label>
            </div>

            <div>
              <FormFieldInput aria-label="agree terms" type="checkbox" name="agree_terms" />
              <label htmlFor="agree_terms">
                Ao selecionar, você concorda com nossos{' '}
                <a href="#" referrerPolicy="no-referrer">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" referrerPolicy="no-referrer">
                  Política de Privacidade
                </a>
                .
              </label>
            </div>
            <Button type="submit" customClass="btn_form">
              Regista-se
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
