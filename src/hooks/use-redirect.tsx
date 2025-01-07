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

  return {
    handleTogglePage,
    handleBackPage,
    handleReplacePage,
  };
};
