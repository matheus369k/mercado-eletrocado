import { UserRegister } from '@/@types/user-schema';
import { addUser } from '@/redux/user/slice';
import { useDispatch } from 'react-redux';
import { setCookies } from '@/functions';
import { useRedirect } from '@/hooks';

export const useRegister = () => {
  const dispatch = useDispatch();
  const { handleBackPage } = useRedirect();

  const handleRegisterUserForm = (data: UserRegister) => {
    dispatch(addUser(data));

    const conversionToJson = JSON.stringify(data);

    if (!document.cookie) setCookies('user', conversionToJson);

    localStorage.setItem('autLogin', 'true');

    handleBackPage();
  };

  return {
    handleRegisterUserForm,
  };
};
