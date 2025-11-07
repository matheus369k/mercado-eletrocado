import { createContext, useState, type ReactNode } from 'react';

type ShowModelType = 'close' | 'open';

type ToggleModelContextType = {
  showModel: ShowModelType;
  toggleModel: () => void;
  closeModel: () => void;
  openModel: () => void;
};

export const ToggleModelContext = createContext({} as ToggleModelContextType);

export const ToggleModelContextProvider = ({ children }: { children: ReactNode }) => {
  const [showModel, setShowModel] = useState<ShowModelType>('close');

  const toggleModel = () => {
    setShowModel((state) => {
      if (state === 'open') {
        return 'close';
      }
      return 'open';
    });
  };

  const openModel = () => {
    setShowModel('open');
  };

  const closeModel = () => {
    setShowModel('close');
  };

  return (
    <ToggleModelContext.Provider value={{ toggleModel, showModel, openModel, closeModel }}>
      {children}
    </ToggleModelContext.Provider>
  );
};
