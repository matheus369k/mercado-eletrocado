import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { zodSchemaUserRegister } from '@/@types/user-schema';
import { z } from 'zod';
import type { UpdateProfileModelForm } from '../components';
import { toast } from 'react-toastify';
import { useConfigsProfile } from './use-profile';

const zodSchemaUpdateProfile = zodSchemaUserRegister
  .pick({
    full_name: true,
    cep: true,
  })
  .extend({
    avatar: z.custom<FileList>().optional(),
  });

type UserUpdateProfileType = z.infer<typeof zodSchemaUpdateProfile>;

export const useUpdateForm = (props: UpdateProfileModelForm) => {
  const { handleUpdateProfile } = useConfigsProfile();
  const [previewUrl, setPreviewUrl] = useState<null | string>(null);
  const hookUseForm = useForm<UserUpdateProfileType>({
    resolver: zodResolver(zodSchemaUpdateProfile),
    defaultValues: { cep: props.cep, full_name: props.full_name },
    reValidateMode: 'onChange',
  });
  const {
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = hookUseForm;
  const avatarPreview = watch('avatar')?.[0];

  const handleSubmitted = async (props: UserUpdateProfileType) => {
    try {
      if (invalidateSizeAvatarImage()) return;
      const avatarImage = props.avatar?.[0];
      const formData = new FormData();
      if (props.full_name) {
        formData.append('name', props.full_name);
      }
      if (props.cep) {
        formData.append('cep', props.cep);
      }
      if (avatarImage) {
        formData.append('avatar', avatarImage);
      }

      await handleUpdateProfile(formData);
    } catch (error) {
      toast.error('Error ao tentar atualizar o perfil');
      console.error(error);
    }
  };

  const handlePreviewAvatar = () => {
    if (!avatarPreview) return;

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const fileUrl = event.target.result;
      if (typeof fileUrl === 'string') {
        setPreviewUrl(fileUrl);
      }
    };
    fileReader.readAsDataURL(avatarPreview);
  };

  const invalidateSizeAvatarImage = () => {
    if (!avatarPreview) return;

    const isAvatarExceedsMaxSize = avatarPreview.size >= 5_240_880;
    if (isAvatarExceedsMaxSize) {
      setError('avatar', { message: 'Máximo 5MB' });
      return isAvatarExceedsMaxSize;
    }

    clearErrors('avatar');
    return isAvatarExceedsMaxSize;
  };

  if (avatarPreview) {
    handlePreviewAvatar();
  }
  return {
    previewUrl,
    handleSubmitted,
    errors,
    isSubmitting,
    handleSubmit,
    hookUseForm,
  };
};
