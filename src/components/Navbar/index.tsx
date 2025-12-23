import { IoPersonAdd, IoStorefrontSharp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import styles from './index.module.css';
import { NavbarDropdownItemRoot, NavbarItemLink, NavbarItemRoot } from './components/NavbarItem';
import { FaUser } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import { ROUTES_PATHNAMES } from '@/util/const';
import { useProfileAccount } from '@/http/use-profile-account';
import { useDetectedScreenMode } from '@/hooks';
import { DropdownModelContent, DropdownModelRoot, DropdownModelToggle } from '../DropdownModel';
import { GoTriangleDown } from 'react-icons/go';
import { CartNavbarItem } from './components/CartNavbarItem';

export const Navbar = () => {
  const { isMobileMode } = useDetectedScreenMode({ maxWidth: 769 });
  const userHaveAuthorization = useProfileAccount().isSuccess;
  const { pathname } = useLocation();

  const isHomePage = ROUTES_PATHNAMES.HOME === pathname;
  const isCartPage = pathname.includes(ROUTES_PATHNAMES.CAR);
  const isProfilerPage = pathname.includes(ROUTES_PATHNAMES.USER_PROFILER);
  const isRegisterPage = pathname.includes(ROUTES_PATHNAMES.USER_REGISTER);
  const isLoginPage = pathname.includes(ROUTES_PATHNAMES.USER_LOGIN);

  if (isMobileMode) {
    return (
      <DropdownModelRoot
        className={styles.navbar_mobile_container}
        mode="dropdown"
        referenceId="navbarMenu">
        <DropdownModelToggle mode="dropdown" referenceId="navbarMenu">
          <FiMenu className={styles.navbar_menu_icon} />
        </DropdownModelToggle>

        <DropdownModelContent
          className={styles.navbar_list_container}
          mode="dropdown"
          referenceId="navbarMenu">
          <NavbarDropdownItemRoot referenceId="navbarMenu" isCurrentPage={isHomePage}>
            <NavbarItemLink to={ROUTES_PATHNAMES.HOME}>
              <IoStorefrontSharp />
              Produtos
            </NavbarItemLink>
          </NavbarDropdownItemRoot>

          <CartNavbarItem
            hasAuthorization={userHaveAuthorization}
            isCartPage={isCartPage}
            device="mobile"
          />

          {userHaveAuthorization && (
            <NavbarDropdownItemRoot referenceId="navbarMenu" isCurrentPage={isProfilerPage}>
              <NavbarItemLink to={ROUTES_PATHNAMES.USER_PROFILER}>
                <FaUser />
                Usuário
              </NavbarItemLink>
            </NavbarDropdownItemRoot>
          )}

          {!userHaveAuthorization && (
            <>
              <NavbarDropdownItemRoot referenceId="navbarMenu" isCurrentPage={isLoginPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_LOGIN}>
                  <FaUser />
                  Entrar
                </NavbarItemLink>
              </NavbarDropdownItemRoot>

              <NavbarDropdownItemRoot referenceId="navbarMenu" isCurrentPage={isRegisterPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_REGISTER}>
                  <IoPersonAdd />
                  Registrar-se
                </NavbarItemLink>
              </NavbarDropdownItemRoot>
            </>
          )}
        </DropdownModelContent>
      </DropdownModelRoot>
    );
  }

  return (
    <nav className={styles.navbar_desktop_container}>
      <ul className={styles.navbar_list_container}>
        <NavbarItemRoot isCurrentPage={isHomePage}>
          <NavbarItemLink to={ROUTES_PATHNAMES.HOME}>
            <IoStorefrontSharp />
            Produtos
          </NavbarItemLink>
        </NavbarItemRoot>

        <CartNavbarItem
          hasAuthorization={userHaveAuthorization}
          isCartPage={isCartPage}
          device="desktop"
        />

        {userHaveAuthorization && (
          <NavbarItemRoot isCurrentPage={isProfilerPage}>
            <NavbarItemLink to={ROUTES_PATHNAMES.USER_PROFILER}>
              <FaUser />
              Usuário
            </NavbarItemLink>
          </NavbarItemRoot>
        )}

        {!userHaveAuthorization && (
          <DropdownModelRoot
            mode="dropdown"
            referenceId="userWithoutAccount"
            customClass={styles.navbar_user_dropdown}>
            <DropdownModelToggle
              mode="dropdown"
              referenceId="userWithoutAccount"
              className={styles.menu_toggle_icon}
              {...((isRegisterPage || isLoginPage) && { ['data-is-current']: true })}>
              <FaUser />
              Usuário
              <GoTriangleDown />
            </DropdownModelToggle>

            <DropdownModelContent
              mode="dropdown"
              referenceId="userWithoutAccount"
              className={styles.links_content_dropdown}>
              <NavbarDropdownItemRoot referenceId="userWithoutAccount" isCurrentPage={isLoginPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_LOGIN}>
                  <FaUser /> Entrar
                </NavbarItemLink>
              </NavbarDropdownItemRoot>

              <NavbarDropdownItemRoot
                referenceId="userWithoutAccount"
                isCurrentPage={isRegisterPage}>
                <NavbarItemLink to={ROUTES_PATHNAMES.USER_REGISTER}>
                  <IoPersonAdd /> Registrar-se
                </NavbarItemLink>
              </NavbarDropdownItemRoot>
            </DropdownModelContent>
          </DropdownModelRoot>
        )}
      </ul>
    </nav>
  );
};
