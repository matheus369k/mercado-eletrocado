import { ROUTES_PATHNAMES } from '@/util/const';
import { useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();

  const handleTogglePage = ({ pathName }: { pathName: string }) => {
    navigate(pathName);
  };

  const handleBackPage = () => {
    window.history.back();
  };

  const handleReplacePage = ({ pathName }: { pathName: string }) => {
    window.location.replace(pathName);
  };

  const handleRedirectionToProduct = (productId: string) => {
    const productRoute = ROUTES_PATHNAMES.PRODUCT.replace(':productId', productId);
    navigate(productRoute);
  };

  return {
    handleTogglePage,
    handleBackPage,
    handleReplacePage,
    handleRedirectionToProduct,
  };
};
