import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import { router } from './components/router/Router.tsx';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
      ></Toaster>
    </Provider>
  );
}
