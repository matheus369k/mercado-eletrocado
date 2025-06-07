import { getCookies, deleteCache, getCache } from '@/functions';
import { addFavoriteProduct } from '@/redux/favorite/slice';
import { addEnvoyProducts } from '@/redux/envoy/slice';
import { addCartProducts } from '@/redux/cart/slice';
import { appUseSelector } from '@/redux/hook';
import { addUser } from '@/redux/user/slice';
import { useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';

export function useAutoLogin() {
  const { userDatas } = appUseSelector((state) => state.user);

  const dispatch = useDispatch();

  const hasCookiesDatas = !!document.cookie;
  const isActiveAutoLogin = localStorage.autLogin === 'true';
  const envoyCacheDatas = getCache('envoyProducts');

  if (hasCookiesDatas && !userDatas && isActiveAutoLogin) {
    dispatch(addUser(getCookies()));

    dispatch(addCartProducts(getCache('cartProducts')));

    dispatch(addFavoriteProduct(getCache('favoriteProducts')));

    dispatch(addEnvoyProducts(envoyCacheDatas));
  }

  if (!hasCookiesDatas && !isActiveAutoLogin) {
    deleteCache('favoriteProducts', 'envoyProducts', 'cartProducts');
  }

  if (sessionStorage.statusFetchApi === 'complete') {
    sessionStorage.removeItem('statusFetchApi');
  }
}
