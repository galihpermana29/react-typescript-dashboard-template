import {
	staffRoutes,
	vendorRoutes,
} from '../view/container/general-layout/model/routesData';
import { actionType } from '../view/container/general-layout/usecase/useGenerateItems';
import useMapRoutes from './useMapRoutes';

function generateRoutesChild() {
	const { mappingRoutes } = useMapRoutes();

	// TODO: change this logic once be ready
	const userType: actionType | null = JSON.parse(
		localStorage.getItem('type_user')!
	) as actionType;
	const isLoggedIn = JSON.parse(localStorage.getItem('token')!);

	if (!userType && isLoggedIn) window.location.reload();
	const whichData = userType === 'admin' ? staffRoutes : vendorRoutes;

	const renderedRoutes = mappingRoutes(whichData);
	return renderedRoutes;
}

export default generateRoutesChild;
