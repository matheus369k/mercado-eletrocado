import { Login, UserProfile, UserRegister, StoreCart, CheckedBuy, Home, ProductPage } from '@/page';
import { createBrowserRouter } from 'react-router-dom';
import { routesPath } from './routes-path';
import { ErrorRoute } from '@/components';
import { Layout } from '@/root/layout';

export const routes = createBrowserRouter([
  {
    path: routesPath.HOME,
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      { path: routesPath.HOME, element: <Home /> },
      { path: routesPath.CAR, element: <StoreCart /> },
      { path: routesPath.CHECKED_BUY, element: <CheckedBuy /> },
      { path: routesPath.USER_PROFILER, element: <UserProfile /> },
      { path: routesPath.USER_LOGIN, element: <Login /> },
      { path: routesPath.USER_REGISTER, element: <UserRegister /> },
      { path: routesPath.PRODUCT, element: <ProductPage /> },
    ],
  },
]);
