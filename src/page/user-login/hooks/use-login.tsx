import type { UserLoginType } from '@/@types/user-schema';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useRedirect } from '@/hooks';
import { useLoginAccount } from '../http/use-login-account';
import { toast } from 'react-toastify';

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
      toast.error('Error ao tentar entrar');
      console.error(error);
    }
  };

  return {
    handleUserLogin,
  };
};
