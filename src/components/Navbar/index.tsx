import { PiShoppingCartFill } from 'react-icons/pi';
import { IoStorefrontSharp } from 'react-icons/io5';
import { Navigate, useLocation } from 'react-router-dom';
import { appUseSelector } from '@/redux/hook';
import styles from './index.module.css';
import { NavbarItemLink, NavbarItemRoot } from './NavbarItem';
import { GoTriangleDown } from 'react-icons/go';
import { SplitItemButton, SplitItemListContainer } from '../SplitModel/SplitItems';
import { FaUser } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import { useProfileAccount } from '@/http/use-profile-account';
import cookies from 'js-cookie';
import { useRedirect } from '@/hooks';

export const Navbar = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const profileAuthorization = useProfileAccount();
  const { handleReplacePage } = useRedirect();
  const { pathname } = useLocation();

  const isHomePage = ROUTES_PATHNAMES.HOME === pathname;
  const isCarPage = pathname.includes(ROUTES_PATHNAMES.CAR);
  const isRegisterPage = pathname.includes(ROUTES_PATHNAMES.USER_REGISTER);
  const isLoginPage = pathname.includes(ROUTES_PATHNAMES.USER_LOGIN);
  const isProfilerPage = pathname.includes(ROUTES_PATHNAMES.USER_PROFILER);

  if (profileAuthorization.isError && isProfilerPage) {
    cookies.remove(COOKIES_KEYS.AUTHORIZATION_TOKEN);
    handleReplacePage({ pathName: ROUTES_PATHNAMES.HOME });
  }

  return (
    <nav className={styles.navbar_container}>
      <SplitItemButton customClass="navbar__menu_icon">
        <FiMenu className={styles.navbar__menu_icon} />
      </SplitItemButton>
      <ul className={styles.navbar__links_list_container}>
        <NavbarItemRoot isCurrentPage={isHomePage}>
          <NavbarItemLink to={ROUTES_PATHNAMES.HOME}>
            <IoStorefrontSharp />
            Produtos
          </NavbarItemLink>
        </NavbarItemRoot>
        <NavbarItemRoot isCurrentPage={isCarPage}>
          <NavbarItemLink to={ROUTES_PATHNAMES.CAR}>
            <PiShoppingCartFill />
            {cartProducts.length > 0 && <span className={styles.product_car_point}></span>}
            Carrinho
          </NavbarItemLink>
        </NavbarItemRoot>
        {profileAuthorization.isSuccess ? (
          <NavbarItemRoot isCurrentPage={isProfilerPage}>
            <NavbarItemLink to={ROUTES_PATHNAMES.USER_PROFILER}>
              <FaUser />
              Usuário
            </NavbarItemLink>
          </NavbarItemRoot>
        ) : (
          <>
            <div className={styles.navbar__links__mobile_items}>
              <NavbarItemRoot isCurrentPage={isLoginPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_LOGIN}>
                  <FaUser />
                  Entrar
                </NavbarItemLink>
              </NavbarItemRoot>
              <NavbarItemRoot isCurrentPage={isRegisterPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_REGISTER}>
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
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_LOGIN}>Entrar</NavbarItemLink>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_REGISTER}>Registrar-se</NavbarItemLink>
              </SplitItemListContainer>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
