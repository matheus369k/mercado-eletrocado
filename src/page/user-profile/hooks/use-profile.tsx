import { ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import { useDeleteAccount } from '@/page/user-profile/http/use-delete-account';
import { browserLocalStorage } from '@/util/browser-storage';
import { useLogoutAccount } from '@/page/user-profile/http/use-logout-account';
import { toast } from 'react-toastify';
import { useUpdateAccount } from '@/page/user-profile/http/use-update-profile';

export const useConfigsProfile = () => {
  const { mutateAsync: userDeleteAccount } = useDeleteAccount();
  const { mutateAsync: userLogoutAccount } = useLogoutAccount();
  const { mutateAsync: userUpdateAccount } = useUpdateAccount();
  const { handleReplacePage } = useRedirect();

  const handleDeleteAccount = async () => {
    try {
      await userDeleteAccount();

      browserLocalStorage.removeAll();
      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      toast.error('Error ao tentar deletar');
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await userLogoutAccount();

      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      toast.error('Error ao tentar sair');
      console.error(error);
    }
  };

  const handleUpdateProfile = async (formData: FormData) => {
    try {
      await userUpdateAccount(formData);
      handleReplacePage({ pathName: ROUTES_PATHNAMES.USER_PROFILER });
    } catch (error) {
      toast.error('Error ao tentar atualizar o perfil');
      console.error(error);
    }
  };

  return {
    handleDeleteAccount,
    handleUpdateProfile,
    handleLogOut,
  };
};
