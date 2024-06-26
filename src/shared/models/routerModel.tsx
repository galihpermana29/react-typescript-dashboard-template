import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../view/container/general-layout/view/RootLayout';
import generateRoutesChild from '../usecase/useRenderRoutes';
import LoginContainer from '@/routes/admin/login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: generateRoutesChild(),
  },
  {
    path: '/login',
    element: <LoginContainer />,
  },
]);
