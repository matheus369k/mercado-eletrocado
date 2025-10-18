import {
  UserLogin,
  UserProfile,
  UserRegister,
  StoreCart,
  CheckedPage,
  Home,
  ProductPage,
} from '@/page';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorRoute } from '@/components';
import { Layout } from '@/root/layout';
import { ROUTES_PATHNAMES } from '@/util/const';
import 'react-multi-carousel/lib/styles.css';

export const routes = createBrowserRouter([
  {
    path: ROUTES_PATHNAMES.HOME,
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      { path: ROUTES_PATHNAMES.HOME, element: <Home /> },
      { path: ROUTES_PATHNAMES.CAR, element: <StoreCart /> },
      { path: ROUTES_PATHNAMES.CHECKED, element: <CheckedPage /> },
      { path: ROUTES_PATHNAMES.USER_PROFILER, element: <UserProfile /> },
      { path: ROUTES_PATHNAMES.USER_LOGIN, element: <UserLogin /> },
      { path: ROUTES_PATHNAMES.USER_REGISTER, element: <UserRegister /> },
      { path: ROUTES_PATHNAMES.PRODUCT, element: <ProductPage /> },
    ],
  },
]);
