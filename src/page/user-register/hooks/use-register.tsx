import { UserRegisterType } from '@/@types/user-schema';
import { useRedirect } from '@/hooks';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useRegisterAccount } from '../http/use-register-account';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const { mutateAsync: userRegisterAccount } = useRegisterAccount();
  const { handleReplacePage } = useRedirect();

  const handleRegisterUserForm = async (props: UserRegisterType) => {
    try {
      const { agree_terms, auto_connection, cep, email, full_name, password } = props;
      if (!agree_terms) return;
      await userRegisterAccount({
        auto_connection,
        cep,
        email,
        full_name,
        password,
      });

      handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
    } catch (error) {
      toast.error('Error ao tentar registra-se');
      console.error(error);
    }
  };

  return {
    handleRegisterUserForm,
  };
};
