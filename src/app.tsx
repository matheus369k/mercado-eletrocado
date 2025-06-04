import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/PagesRoutes';
import './styles/index.css';

export function App() {
  //useAutoLogin();

  return <RouterProvider router={routes} />;
}
