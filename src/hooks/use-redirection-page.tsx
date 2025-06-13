import { removeSelectProduct } from '@/redux/product/slice';
import { routesPath } from '@/routes/routes-path';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { useRedirect } from '.';

export const useRedirectionPage = () => {
  const { userDatas } = appUseSelector((state) => state.user);
  const { handleTogglePage } = useRedirect();

  const dispatch = useDispatch();

  const VerificationUserHasNotAccount = () => {
    if (userDatas) return false;

    handleTogglePage({ pathName: routesPath.USER_LOGIN });
    dispatch(removeSelectProduct());
    return true;
  };

  const handleRedirectToCheckedBuy = () => {
    if (!userDatas) {
      VerificationUserHasNotAccount();

      return;
    }

    handleTogglePage({ pathName: routesPath.CHECKED_BUY });
  };

  return {
    VerificationUserHasNotAccount,
    handleRedirectToCheckedBuy,
  };
};
