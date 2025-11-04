import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertMessage = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      limit={1}
      style={{
        fontWeight: 'bold',
      }}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
