import { UserRegister as UserRegisterType, zodSchemaUserRegister } from '@/@types/user-schema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label, Input, Button } from '../components';
import { useRegister } from './hooks/useRegister';
import { MdOutlinePlace } from 'react-icons/md';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import styles from './index.module.css';
import { Title } from '@/components';

export const UserRegister = () => {
  const hookUseForm = useForm<UserRegisterType>({
    resolver: zodResolver(zodSchemaUserRegister),
  });

  const { handleRegisterUserForm } = useRegister();
  const {
    handleSubmit,
    formState: { errors },
  } = hookUseForm;

  return (
    <div className={styles.register_container}>
      <Title>
        <FaUserPlus />
        Registrar
      </Title>
      <FormProvider {...hookUseForm}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleRegisterUserForm)}
          className={styles.register_form}>
          <Label errors={errors.name?.message} htmlFor="name">
            <GoPeople />
            Nome
          </Label>
          <Input
            errors={errors.name}
            fieldName="name"
            type="text"
            name="name"
            id="name"
            placeholder="Osvaldo"
            maxLength={30}
          />
          <Label errors={errors.lastName?.message} htmlFor="lastName">
            {' '}
            <GoPeople />
            Sobrenome
          </Label>
          <Input
            errors={errors.lastName}
            fieldName="lastName"
            type="text"
            name="lastName"
            id="lastName"
            maxLength={30}
            placeholder="Silva"
          />
          <Label errors={errors.email?.message} htmlFor="email">
            <MdOutlineEmail />
            E-mail
          </Label>
          <Input
            errors={errors.email}
            fieldName="email"
            type="email"
            name="email"
            id="email"
            maxLength={50}
            placeholder="xxxxxxx@email.com"
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
            id="password"
            maxLength={16}
            placeholder="xxxxxxxx"
          />
          <Label errors={errors.cep?.message} htmlFor="cep">
            <MdOutlinePlace />
            CEP
          </Label>
          <Input
            errors={errors.cep}
            fieldName="cep"
            type="text"
            name="cep"
            id="cep"
            maxLength={9}
            placeholder="xxxxx-xxx"
          />
          <Button id="Confirmar" className="btnSubmit">
            Confirmar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
