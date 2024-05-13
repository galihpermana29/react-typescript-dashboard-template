import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../view/container/general-layout/view/RootLayout';
import NotFound from '../view/container/not-found/NotFound';
import generateRoutesChild from '../usecase/useRenderRoutes';
import LoginContainer from '@/routes/login/Login';

/**
 * INFO: This is where routes and components belongs
 */

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
