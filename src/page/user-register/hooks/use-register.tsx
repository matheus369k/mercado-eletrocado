import { UserRegisterType } from '@/@types/user-schema';
import { useRedirect } from '@/hooks';
import { COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { useRegisterAccount } from '../http/use-register-account';
import cookies from 'js-cookie';

export const useRegister = () => {
  const { mutateAsync: userRegisterAccount } = useRegisterAccount();
  const { handleReplacePage } = useRedirect();

  const handleRegisterUserForm = async (props: UserRegisterType) => {
    try {
      const { agree_terms, auto_connection, cep, email, full_name, password } = props;
      if (!agree_terms) return;
      const result = await userRegisterAccount({
        auto_connection,
        cep,
        email,
        full_name,
        password,
      });
      if (!result) {
        throw new Error('Error try create user account');
      }
      cookies.set(COOKIES_KEYS.AUTHORIZATION_TOKEN, result.token);

      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleRegisterUserForm,
  };
};
