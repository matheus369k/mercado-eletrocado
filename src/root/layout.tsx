import { Outlet } from 'react-router-dom';
import { Footer, AlertMessage, Header, ErrorBoundary } from '@/components';
import { useProfileAccount } from '@/http/use-profile-account';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { browserLocalStorage } from '@/util/browser-storage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCartProducts } from '@/redux/cart/slice';

export function Layout() {
  const restoreCartDatas = browserLocalStorage.get(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  const authorization = useProfileAccount().isSuccess;
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization && restoreCartDatas) {
      dispatch(addCartProducts(restoreCartDatas.cartProducts));
    }
  }, [authorization]);

  return (
    <ErrorBoundary>
      <AlertMessage />

      <Header />
      <ErrorBoundary>
        <main className="main">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
