import {
	staffRoutes,
	vendorRoutes,
} from '../view/container/general-layout/model/routesData';
import { actionType } from '../view/container/general-layout/usecase/useGenerateItems';
import useMapRoutes from './useMapRoutes';

function generateRoutesChild() {
	const { mappingRoutes } = useMapRoutes();

	const userType: actionType | null = JSON.parse(localStorage.getItem('admin')!)
		?.type as actionType;

	const whichData = userType === 'admin' ? staffRoutes : vendorRoutes;

	const renderedRoutes = mappingRoutes(whichData);
	return renderedRoutes;
}

export default generateRoutesChild;
