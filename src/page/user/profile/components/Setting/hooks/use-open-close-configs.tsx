import { useState } from 'react';

export const useOpenCloseConfigs = () => {
  const [isOpenConfig, setIsOpenConfig] = useState(false);

  const handleOpenCloseConfigs = () => {
    setIsOpenConfig((state) => {
      return !state;
    });
  };

  return {
    isOpenConfig,
    handleOpenCloseConfigs,
  };
};
