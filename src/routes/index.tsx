import * as Page from '@/page';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorRoute } from '@/components';
import { Layout } from '@/root/layout';
import { ROUTES_PATHNAMES } from '@/util/const';
import 'react-multi-carousel/lib/styles.css';
import { useProfileAccount } from '@/http/use-profile-account';

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
        action: async () => {
          return useProfileAccount();
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
