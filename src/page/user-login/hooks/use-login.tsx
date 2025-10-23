import type { UserLoginType } from '@/@types/user-schema';
import { COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import { useLoginAccount } from '../http/use-login-account';
import cookies from 'js-cookie';

export const useLogin = () => {
  const { mutateAsync: userLoginAccount } = useLoginAccount();
  const { handleReplacePage } = useRedirect();

  const handleUserLogin = async (data: UserLoginType) => {
    const { auto_connection, email, password } = data;
    const result = await userLoginAccount({
      auto_connection,
      email,
      password,
    });
    if (!result) {
      throw new Error('Error try login user account');
    }
    cookies.set(COOKIES_KEYS.AUTHORIZATION_TOKEN, result.token);

    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  };

  return {
    handleUserLogin,
  };
};
