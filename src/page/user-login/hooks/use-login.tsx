import type { UserLoginType } from '@/@types/user-schema';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import { useLoginAccount } from '../http/use-login-account';

export const useLogin = () => {
  const { mutateAsync: userLoginAccount } = useLoginAccount();
  const { handleReplacePage } = useRedirect();

  const handleUserLogin = async (data: UserLoginType) => {
    try {
      const { auto_connection, email, password } = data;
      await userLoginAccount({
        auto_connection,
        email,
        password,
      });

      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleUserLogin,
  };
};
