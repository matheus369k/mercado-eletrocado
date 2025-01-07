import { PiShoppingCartFill } from 'react-icons/pi';
import { IoStorefrontSharp } from 'react-icons/io5';
import { BiSolidUserPlus } from 'react-icons/bi';
import { FaCircleUser } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { routesPath } from '@/routes/routes-path';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';
import { NavbarItem } from './NavbarItem';

export const Navbar = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { userDatas } = appUseSelector((state) => state.user);
  const { pathname } = useLocation();

  const isCurrentPageHome = routesPath.HOME === pathname;
  const isCurrentPageCar = pathname.includes(routesPath.CAR);
  const isCurrentPageUser = pathname.includes(routesPath.USER);

  const userStatusAccount = !!userDatas ? 'profiler' : document.cookie ? 'login' : 'register';

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_list}>
        <NavbarItem isCurrentPageHome={isCurrentPageHome} redirectionRoute={routesPath.HOME}>
          <IoStorefrontSharp />
          Produtos
        </NavbarItem>
        <NavbarItem isCurrentPageHome={isCurrentPageCar} redirectionRoute={routesPath.CAR}>
          <PiShoppingCartFill />
          {cartProducts.length > 0 && <span className={styles.product_car_point}></span>}
          Carrinho
        </NavbarItem>
        {userStatusAccount === 'profiler' && (
          <NavbarItem
            isCurrentPageHome={isCurrentPageUser}
            redirectionRoute={routesPath.USER_PROFILER}>
            <FaCircleUser />
            Perfil
          </NavbarItem>
        )}
        {userStatusAccount === 'login' && (
          <NavbarItem
            isCurrentPageHome={isCurrentPageUser}
            redirectionRoute={routesPath.USER_LOGIN}>
            <FaUser />
            Login
          </NavbarItem>
        )}
        {userStatusAccount === 'register' && (
          <NavbarItem
            isCurrentPageHome={isCurrentPageUser}
            redirectionRoute={routesPath.USER_REGISTER}>
            <BiSolidUserPlus />
            Registrar-se
          </NavbarItem>
        )}
      </ul>
    </nav>
  );
};
