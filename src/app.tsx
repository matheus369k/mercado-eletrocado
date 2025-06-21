import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/index.css';

export function App() {
  return <RouterProvider router={routes} />;
}
