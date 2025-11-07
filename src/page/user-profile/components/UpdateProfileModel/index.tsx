import { Button, FormFieldInput, FormFieldRoot } from '@/components';
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
  const updateForm = useUpdateForm(props);

  return (
    <div data-open-model={updateForm.showModel} className={styles.update_model_container}>
      <div className={styles.update_model_header}>
        <h3>Atualiza Perfil</h3>
        <button
          type="button"
          aria-label="close model"
          disabled={updateForm.isSubmitting}
          onClick={updateForm.closeModel}>
          <GrFormClose className={styles.icon} />
        </button>
      </div>

      <FormProvider {...updateForm.hookUseForm}>
        <form
          className={styles.model_form}
          onSubmit={updateForm.handleSubmit(updateForm.handleSubmitted)}>
          <FormFieldRoot
            customClass="user_avatar"
            {...(updateForm.errors.avatar && { 'data-error': updateForm.errors.avatar.message })}>
            <label
              data-readonly={updateForm.isSubmitting}
              htmlFor="avatar"
              className={styles.avatar_selected_area}>
              <Avatar
                {...(updateForm.previewUrl && { previewUrl: updateForm.previewUrl })}
                {...(!updateForm.previewUrl && props.avatarUrl && { avatarUrl: props.avatarUrl })}
                name={props?.full_name || 'desconhecido'}
              />
            </label>
            <FormFieldInput
              readOnly={updateForm.isSubmitting}
              aria-label="avatar"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              multiple={false}
            />
            <HiCamera />
          </FormFieldRoot>

          <FormFieldRoot
            {...(updateForm.errors.full_name && {
              'data-error': updateForm.errors.full_name.message,
            })}>
            <FormFieldInput
              readOnly={updateForm.isSubmitting}
              aria-label="full name"
              placeholder="Digite seu nome completo..."
              type="text"
              name="full_name"
              maxLength={30}
            />
            <GoPeople />
          </FormFieldRoot>

          <FormFieldRoot
            {...(updateForm.errors.cep && { 'data-error': updateForm.errors.cep.message })}>
            <FormFieldInput
              readOnly={updateForm.isSubmitting}
              aria-label="cep"
              type="text"
              name="cep"
              maxLength={9}
              placeholder="Digite seu cep..."
            />
            <MdOutlineLocationOn />
          </FormFieldRoot>

          <div className={styles.buttons_container}>
            <Button
              onClick={updateForm.closeModel}
              disabled={updateForm.isSubmitting}
              btnType="outline"
              type="button"
              customClass="btn_form">
              cancelar
            </Button>
            <Button disabled={updateForm.isSubmitting} type="submit" customClass="btn_form">
              Confirmar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
