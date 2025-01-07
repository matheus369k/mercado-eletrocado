import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/PagesRoutes';
import { useAutoLogin } from './hooks';
import './styles/variables.css';
import './styles/index.css';
import './styles/util.css';

export function App() {
  useAutoLogin();

  return <RouterProvider router={routes} />;
}
