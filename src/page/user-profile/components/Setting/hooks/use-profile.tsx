import { BROWSER_STORAGE_KEYS, COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import cookies from 'js-cookie';
import { useDeleteAccount } from '@/page/user-profile/http/use-delete-account';
import { browserLocalStorage } from '@/util/browser-storage';
import { useLogoutAccount } from '@/page/user-profile/http/use-logout-account';

export const useConfigsProfile = () => {
  const { mutateAsync: userDeleteAccount } = useDeleteAccount();
  const { mutateAsync: userLogoutAccount } = useLogoutAccount();
  const { handleReplacePage } = useRedirect();

  const handleDeleteAccount = async () => {
    try {
      await userDeleteAccount();

      browserLocalStorage.removeAll();
      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await userLogoutAccount();

      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleDeleteAccount,
    handleLogOut,
  };
};
