import { BROWSER_STORAGE_KEYS, COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { browserLocalStorage, browserSessionStorage } from '@/util/browser-storage';
import { cookiesVariables } from '@/util/cookies';
import { useRedirect } from '@/hooks';

export const useConfigsProfile = () => {
  const { handleReplacePage } = useRedirect();

  const handleDeleteAccount = () => {
    browserLocalStorage.removeAll();
    browserSessionStorage.removeAll();
    cookiesVariables.delete(COOKIES_KEYS.USER_DATAS);
    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  const handleLogOut = () => {
    browserLocalStorage.remove(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);
    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return {
    handleDeleteAccount,
    handleLogOut,
  };
};
