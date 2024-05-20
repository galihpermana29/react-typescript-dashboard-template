import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../view/container/general-layout/view/RootLayout';
import NotFound from '../view/container/not-found/NotFound';
import generateRoutesChild from '../usecase/useRenderRoutes';
import LoginContainer from '@/routes/admin/login/Login';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: generateRoutesChild(),
		errorElement: <NotFound />,
	},
	{
		path: '/login',
		element: <LoginContainer />,
	},
]);
