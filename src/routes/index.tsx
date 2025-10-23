import * as Page from '@/page';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorRoute } from '@/components';
import { Layout } from '@/root/layout';
import { COOKIES_KEYS, ROUTES_PATHNAMES } from '@/util/const';
import 'react-multi-carousel/lib/styles.css';
import cookies from 'js-cookie';

export const routes = createBrowserRouter([
  {
    path: ROUTES_PATHNAMES.HOME,
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      { path: ROUTES_PATHNAMES.HOME, element: <Page.Home /> },
      { path: ROUTES_PATHNAMES.CAR, element: <Page.StoreCart /> },
      { path: ROUTES_PATHNAMES.CHECKED, element: <Page.CheckedPage /> },
      {
        path: ROUTES_PATHNAMES.USER_PROFILER,
        element: <Page.UserProfile />,
        loader: () => {
          const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
          if (authorizationToken) {
            return new Error('User not have authorization');
          }
        },
      },
      {
        path: ROUTES_PATHNAMES.USER_LOGIN,
        element: <Page.UserLogin />,
      },
      {
        path: ROUTES_PATHNAMES.USER_REGISTER,
        element: <Page.UserRegister />,
      },
      {
        path: ROUTES_PATHNAMES.PRODUCT,
        element: <Page.ProductPage />,
      },
    ],
  },
]);
