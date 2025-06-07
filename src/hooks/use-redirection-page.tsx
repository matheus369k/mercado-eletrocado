import { removeSelectProduct } from '@/redux/product/slice';
import { routesPath } from '@/routes/routes-path';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { useRedirect } from '.';

export const useRedirectionPage = () => {
  const { userDatas } = appUseSelector((state) => state.user);
  const { handleTogglePage } = useRedirect();

  const dispatch = useDispatch();

  const handleVerificationUserHasAccount = () => {
    if (userDatas) return;

    const pathName = document.cookie ? routesPath.USER_LOGIN : routesPath.USER_REGISTER;

    handleTogglePage({ pathName });
    dispatch(removeSelectProduct());
  };

  const handleRedirectToCheckedBuy = () => {
    if (!userDatas) {
      handleVerificationUserHasAccount();

      return;
    }

    handleTogglePage({ pathName: routesPath.CHECKED_BUY });
  };

  return {
    handleVerificationUserHasAccount,
    handleRedirectToCheckedBuy,
  };
};
