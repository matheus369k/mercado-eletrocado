import { restoreCartProducts } from '@/redux/cart/slice';
import { appUseSelector } from '@/redux/hook';
import { useDispatch } from 'react-redux';
import { NavbarDropdownItemRoot, NavbarItemLink, NavbarItemRoot } from '../NavbarItem';
import { ROUTES_PATHNAMES } from '@/util/const';
import { PiShoppingCartFill } from 'react-icons/pi';
import styles from './index.module.css';

type CartNavbarItemProps = {
  hasAuthorization?: boolean;
  isCartPage?: boolean;
  device: 'desktop' | 'mobile';
};

export const CartNavbarItem = ({
  device,
  hasAuthorization = false,
  isCartPage = false,
}: CartNavbarItemProps) => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const dispatch = useDispatch();

  const hastProductsInCart = cartProducts?.length > 0;
  if (hasAuthorization && !hastProductsInCart) {
    dispatch(restoreCartProducts());
  }

  if (device === 'mobile') {
    return (
      <NavbarDropdownItemRoot referenceId="navbarMenu" isCurrentPage={isCartPage}>
        <NavbarItemLink to={ROUTES_PATHNAMES.CAR}>
          <PiShoppingCartFill />
          {hastProductsInCart && (
            <span aria-label="carts count" className={styles.product_car_point} />
          )}
          Carrinho
        </NavbarItemLink>
      </NavbarDropdownItemRoot>
    );
  }

  return (
    <NavbarItemRoot isCurrentPage={isCartPage}>
      <NavbarItemLink to={ROUTES_PATHNAMES.CAR}>
        <PiShoppingCartFill />
        {cartProducts?.length > 0 && (
          <span
            aria-label="carts count"
            data-cart-count={cartProducts?.length}
            className={styles.product_car_point}
          />
        )}
        Carrinho
      </NavbarItemLink>
    </NavbarItemRoot>
  );
};
