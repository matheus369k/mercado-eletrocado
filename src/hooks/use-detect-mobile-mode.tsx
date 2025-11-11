import { useEffect, useState } from 'react';

type UseDetectedScreenModeProps = {
  maxWidth: number;
};

export const useDetectedScreenMode = ({ maxWidth = 769 }: UseDetectedScreenModeProps) => {
  const [isMobileMode, setIsMobileMode] = useState(false);

  useEffect(() => {
    DetectedScreenMode();
    window.addEventListener('resize', DetectedScreenMode);
    return () => {
      window.removeEventListener('resize', DetectedScreenMode);
    };
  }, []);

  const DetectedScreenMode = () => {
    const currentSizeIsMobileMode = document.body.clientWidth < maxWidth;
    setIsMobileMode(() => {
      if (currentSizeIsMobileMode) return true;
      return false;
    });
  };

  return {
    isMobileMode,
  };
};
