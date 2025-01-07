import { removeSelectProduct } from '@/redux/products/slice';
import { routesPath } from '@/routes/routes-path';
import { useLocation } from 'react-router-dom';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { Navbar, LogoDisplay } from '..';
import styles from './index.module.css';

export const Header = () => {
  const { selected } = appUseSelector((state) => state.product);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  if (pathname !== routesPath.PRODUCT && selected) {
    dispatch(removeSelectProduct());
  }

  return (
    <header className={styles.header_container}>
      <LogoDisplay customClass="header_logo" />
      <Navbar />
    </header>
  );
};
