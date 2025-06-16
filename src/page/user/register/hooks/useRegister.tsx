import { UserRegisterType } from '@/@types/user-schema';
import { addUser } from '@/redux/user/slice';
import { useDispatch } from 'react-redux';
import { useRedirect } from '@/hooks';
import { browserLocalStorage, browserSessionStorage } from '@/util/browser-storage';
import { COOKIES_KEYS, BROWSER_STORAGE_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { cookiesVariables } from '@/util/cookies';

export const useRegister = () => {
  const dispatch = useDispatch();
  const { handleReplacePage } = useRedirect();

  const handleRegisterUserForm = ({ auto_connection, ...data }: UserRegisterType) => {
    if (!data.agree_terms) return;
    if (cookiesVariables.get(COOKIES_KEYS.USER_DATAS)) return;
    dispatch(addUser(data));
    cookiesVariables.add({
      key: COOKIES_KEYS.USER_DATAS,
      value: JSON.stringify(data),
    });
    if (auto_connection) {
      browserSessionStorage.remove(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);
      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.AUTO_CONNECTION,
        value: JSON.stringify({ auto_connection }),
      });
    } else {
      browserLocalStorage.remove(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);
      browserSessionStorage.add({
        key: BROWSER_STORAGE_KEYS.AUTO_CONNECTION,
        value: JSON.stringify({ auto_connection }),
      });
    }
    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return {
    handleRegisterUserForm,
  };
};
