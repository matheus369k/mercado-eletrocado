import * as UI from '@/components';
import { FormProvider } from 'react-hook-form';
import { HiCamera } from 'react-icons/hi';
import { GoPeople } from 'react-icons/go';
import { MdOutlineLocationOn } from 'react-icons/md';
import styles from './index.module.css';
import { zodSchemaUserRegister } from '@/@types/user-schema';
import { z } from 'zod';
import { GrFormClose } from 'react-icons/gr';
import { Avatar } from '@/components/Avatar';
import { useUpdateForm } from '../../hooks/use-update-form';

const zodSchemaUpdateProfile = zodSchemaUserRegister
  .pick({
    full_name: true,
    cep: true,
  })
  .extend({
    avatar: z.custom<FileList>().optional(),
  });

type UserUpdateProfileType = z.infer<typeof zodSchemaUpdateProfile>;

export type UpdateProfileModelForm = Omit<UserUpdateProfileType, 'avatar'> & {
  avatarUrl?: string | null;
};

export const UpdateProfileModelForm = (props: UpdateProfileModelForm) => {
  const { errors, handleSubmit, handleSubmitted, hookUseForm, isSubmitting, previewUrl } =
    useUpdateForm(props);

  return (
    <UI.DropdownModelContent
      mode="model"
      referenceId="updateProfile"
      className={styles.update_model_container}>
      <div className={styles.update_model_header}>
        <h3>Atualiza Perfil</h3>
        <UI.DropdownModelClose
          mode="model"
          referenceId="updateProfile"
          type="button"
          disabled={isSubmitting}>
          <GrFormClose className={styles.icon} />
        </UI.DropdownModelClose>
      </div>

      <FormProvider {...hookUseForm}>
        <form className={styles.model_form} onSubmit={handleSubmit(handleSubmitted)}>
          <UI.FormFieldRoot
            customClass="user_avatar"
            {...(errors.avatar && { 'data-error': errors.avatar.message })}>
            <label
              aria-label="avatar label field"
              data-readonly={isSubmitting}
              htmlFor="avatar"
              className={styles.avatar_selected_area}>
              <Avatar
                {...(previewUrl && { previewUrl: previewUrl })}
                {...(!previewUrl && props.avatarUrl && { avatarUrl: props.avatarUrl })}
                name={props?.full_name || 'desconhecido'}
              />
            </label>
            <UI.FormFieldInput
              readOnly={isSubmitting}
              aria-label="avatar field"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              multiple={false}
            />
            <HiCamera />
          </UI.FormFieldRoot>

          <UI.FormFieldRoot
            {...(errors.full_name && {
              'data-error': errors.full_name.message,
            })}>
            <UI.FormFieldInput
              readOnly={isSubmitting}
              aria-label="full name field"
              placeholder="Digite seu nome completo..."
              type="text"
              name="full_name"
              maxLength={30}
            />
            <GoPeople />
          </UI.FormFieldRoot>

          <UI.FormFieldRoot {...(errors.cep && { 'data-error': errors.cep.message })}>
            <UI.FormFieldInput
              readOnly={isSubmitting}
              aria-label="cep field"
              type="text"
              name="cep"
              maxLength={9}
              placeholder="Digite seu cep..."
            />
            <MdOutlineLocationOn />
          </UI.FormFieldRoot>

          <div className={styles.buttons_container}>
            <UI.DropdownModelClose type="button" mode="model" referenceId="updateProfile">
              <UI.Button disabled={isSubmitting} type="button" btnType="outline">
                cancelar
              </UI.Button>
            </UI.DropdownModelClose>
            <UI.Button disabled={isSubmitting} type="submit">
              Confirmar
            </UI.Button>
          </div>
        </form>
      </FormProvider>
    </UI.DropdownModelContent>
  );
};
