import { ItemsDataI } from '../presentations/general-layout/model/types';
import { actionType } from '../presentations/general-layout/usecase/useGenerateItems';

const useMapRoutes = () => {
	const mappingRoutes = (data: ItemsDataI[]) => {
		const createBrowserRoutes = data.map((dx) => ({
			path: dx.path,
			element: dx.components,
		}));

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
