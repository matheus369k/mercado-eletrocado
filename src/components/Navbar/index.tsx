import { PiShoppingCartFill } from 'react-icons/pi';
import { IoStorefrontSharp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { routesPath } from '@/routes/routes-path';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';
import { NavbarItemLink, NavbarItemRoot } from './NavbarItem';
import { GoTriangleDown } from 'react-icons/go';
import { SplitItemButton, SplitItemListContainer } from '../SplitModel/SplitItems';
import { FaUser } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';

export const Navbar = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { userDatas } = appUseSelector((state) => state.user);
  const { pathname } = useLocation();

  const isHomePage = routesPath.HOME === pathname;
  const isCarPage = pathname.includes(routesPath.CAR);
  const isRegisterPage = pathname.includes(routesPath.USER_REGISTER);
  const isLoginPage = pathname.includes(routesPath.USER_LOGIN);
  const isProfilerPage = pathname.includes(routesPath.USER_PROFILER);

  return (
    <nav className={styles.navbar_container}>
      <SplitItemButton customClass="navbar__menu_icon">
        <FiMenu className={styles.navbar__menu_icon} />
      </SplitItemButton>
      <ul className={styles.navbar__links_list_container}>
        <NavbarItemRoot isCurrentPage={isHomePage}>
          <NavbarItemLink to={routesPath.HOME}>
            <IoStorefrontSharp />
            Produtos
          </NavbarItemLink>
        </NavbarItemRoot>
        <NavbarItemRoot isCurrentPage={isCarPage}>
          <NavbarItemLink to={routesPath.CAR}>
            <PiShoppingCartFill />
            {cartProducts.length > 0 && <span className={styles.product_car_point}></span>}
            Carrinho
          </NavbarItemLink>
        </NavbarItemRoot>
        {userDatas ? (
          <NavbarItemRoot isCurrentPage={isProfilerPage}>
            <NavbarItemLink to={routesPath.USER_PROFILER}>
              <FaUser />
              Usuário
            </NavbarItemLink>
          </NavbarItemRoot>
        ) : (
          <>
            <div className={styles.navbar__links__mobile_items}>
              <NavbarItemRoot isCurrentPage={isLoginPage}>
                <NavbarItemLink to={routesPath.USER_LOGIN}>
                  <FaUser />
                  Entrar
                </NavbarItemLink>
              </NavbarItemRoot>
              <NavbarItemRoot isCurrentPage={isRegisterPage}>
                <NavbarItemLink to={routesPath.USER_REGISTER}>
                  <IoPersonAdd />
                  Registrar-se
                </NavbarItemLink>
              </NavbarItemRoot>
            </div>
            <li className={styles.navbar__links_desktop_items}>
              <SplitItemButton
                customClass="navbar_user_header"
                {...((isRegisterPage || isLoginPage) && { 'data-is-current': true })}>
                <FaUser />
                Usuário
                <GoTriangleDown />
              </SplitItemButton>
              <SplitItemListContainer className={styles.navbar__links_desktop__model}>
                <NavbarItemLink to={routesPath.USER_LOGIN}>Entrar</NavbarItemLink>
                <NavbarItemLink to={routesPath.USER_REGISTER}>Registrar-se</NavbarItemLink>
              </SplitItemListContainer>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
