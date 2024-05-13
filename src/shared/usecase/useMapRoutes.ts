import { RouteObject } from 'react-router-dom';
import { ItemsDataI } from '../view/container/general-layout/model/types';
import { actionType } from '../view/container/general-layout/usecase/useGenerateItems';

const useMapRoutes = () => {
	const mappingRoutes = (data: ItemsDataI[]) => {
		const createBrowserRoutes: RouteObject[] | undefined = [];

		data.forEach((dx) => {
			if (dx.children && dx.children?.length > 0) {
				dx.children.forEach((dy) => {
					createBrowserRoutes.push({ path: dy.path, element: dy.components });
				});
			} else {
				createBrowserRoutes.push({ path: dx.path, element: dx.components });
			}
		});

		return createBrowserRoutes;
	};

	const getUserType = () => {
		const adminData = JSON.parse(localStorage.getItem('admin') as string);
		const action: actionType = adminData?.role.permissions[0].action;
		return action;
	};

	return { mappingRoutes, getUserType };
};

export default useMapRoutes;
