import { browserLocalStorage, browserSessionStorage } from './browser-storage';

export const CATEGORY_PRODUCTS_TYPES = {
  notebook: 'Notebook',
  tablet: 'Tablet',
  phone: 'Celular',
};

export const BROWSER_STORAGE_KEYS = {
  SELECTED_PRODUCT: 'ELETROCADO__PRODUCT__SELECT_PRODUCT',
  CART_PRODUCT: 'ELETROCADO__CART__CART_PRODUCT',
  ENVOY_PRODUCT: 'ELETROCADO__ENVOY__ENVOY_PRODUCT',
  FAVORITE_PRODUCT: 'ELETROCADO__FAVORITE__FAVORITE_PRODUCT',
  AUTO_CONNECTION: 'ELETROCADO__PERMISSION__AUTO_CONNECTION',
  PERCENT_DISCOUNT: 'ELETROCADO__DISCOUNT_PRODUCT__PERCENT_DISCOUNT',
};

export const COOKIES_KEYS = {
  USER_DATAS: 'ELETROCADO__USER__USER_DATAS',
};

export const AUTO_CONNECTION =
  browserLocalStorage.get(BROWSER_STORAGE_KEYS.AUTO_CONNECTION) ||
  browserSessionStorage.get(BROWSER_STORAGE_KEYS.AUTO_CONNECTION);

export const ROUTES_PATHNAMES = {
  HOME: '/',
  CAR: '/car',
  CHECKED: '/car/checkout',
  USER: '/user',
  USER_PROFILER: '/user/profile',
  USER_LOGIN: '/user/login',
  USER_REGISTER: '/user/register',
  PRODUCT: '/product/:productId',
};
