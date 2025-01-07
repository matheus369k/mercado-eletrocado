import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertMessage = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={10000}
      limit={1}
      style={{
        fontWeight: 'bold',
      }}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
