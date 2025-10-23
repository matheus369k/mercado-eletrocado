import { BROWSER_STORAGE_KEYS, COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import cookies from 'js-cookie';
import { useDeleteAccount } from '@/page/user-profile/http/use-delete-account';
import { browserLocalStorage } from '@/util/browser-storage';

export const useConfigsProfile = () => {
  const { mutateAsync: userDeleteAccount } = useDeleteAccount();
  const { handleReplacePage } = useRedirect();

  const handleDeleteAccount = async () => {
    try {
      await userDeleteAccount();

      browserLocalStorage.removeAll();
      cookies.remove(COOKIES_KEYS.AUTHORIZATION_TOKEN);
      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = () => {
    cookies.remove(COOKIES_KEYS.AUTHORIZATION_TOKEN);
    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return {
    handleDeleteAccount,
    handleLogOut,
  };
};
