import { routesPath } from '@/routes/routes-path';
import { deleteCookies } from '@/functions';

export const useConfigsProfile = () => {
  const handleDeleteCont = () => {
    localStorage.setItem('autLogin', 'false');

    deleteCookies('user', '');

    window.location.replace(routesPath.HOME);
  };

  const handleLogOut = () => {
    localStorage.setItem('autLogin', 'false');

    window.location.replace(routesPath.HOME);
  };

  return {
    handleDeleteCont,
    handleLogOut,
  };
};
