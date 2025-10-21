import type { UserLoginType } from '@/@types/user-schema';
import { UseFormSetValue } from 'react-hook-form';
import { cookiesVariables } from '@/util/cookies';
import { COOKIES_KEYS, BROWSER_STORAGE_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { browserLocalStorage, browserSessionStorage } from '@/util/browser-storage';
import { useRedirect } from '@/hooks';

export const useLogin = (setValue: UseFormSetValue<UserLoginType>) => {
  const { handleReplacePage } = useRedirect();
  const handleForgetPassword = () => {
    const { email, password } = cookiesVariables.get(COOKIES_KEYS.USER_DATAS);
    if (!email || !password) return;
    setValue('email', email);
    setValue('password', password);
  };

  const handleUserLogin = (data: UserLoginType) => {
    const { email, password } = cookiesVariables.get(COOKIES_KEYS.USER_DATAS);
    if (email !== data.email || password !== data.password) return;
    if (data.auto_connection) {
      browserSessionStorage.remove(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);
      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.AUTO_CONNECTION,
        value: JSON.stringify({ auto_connection: data.auto_connection }),
      });
    } else {
      browserLocalStorage.remove(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);
      browserSessionStorage.add({
        key: BROWSER_STORAGE_KEYS.AUTO_CONNECTION,
        value: JSON.stringify({ auto_connection: data.auto_connection }),
      });
    }

    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return {
    handleUserLogin,
    handleForgetPassword,
  };
};
