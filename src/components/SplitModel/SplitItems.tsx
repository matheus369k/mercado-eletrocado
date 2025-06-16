/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.css';

interface SplitItemButtonProps extends ComponentProps<'button'> {
  customClass?: string;
}

export const SplitItemButton = ({ customClass = '', ...props }: SplitItemButtonProps) => {
  const [IsOpenSlitModel, setIsOpenSlitModel] = useState(false);
  const { pathname } = useLocation();
  const PathRef = useRef(pathname);

  const handleToggleSplit = () => {
    setIsOpenSlitModel((state) => !state);
  };

  useEffect(() => {
    if (PathRef.current !== pathname) {
      PathRef.current = pathname;
      setIsOpenSlitModel(false);
    }

    document.getElementById('split-items-container')?.childNodes.forEach((element) => {
      element.addEventListener('click', () => {
        if (IsOpenSlitModel) {
          setIsOpenSlitModel(false);
        }
      });
    });

    document.addEventListener('keyup', (event) => {
      if (/Escape/i.test(event.code)) {
        if (IsOpenSlitModel) {
          setIsOpenSlitModel(false);
        }
      }
    });
  }, [pathname, IsOpenSlitModel]);

  return (
    <button
      {...props}
      onClick={handleToggleSplit}
      data-open={IsOpenSlitModel}
      type="button"
      className={`${styles[customClass]} ${styles.split_item_button}`}
    />
  );
};

export const SplitItemListContainer = ({ ...props }: ComponentProps<'div'>) => {
  return <div {...props} id="split-items-container" />;
};
