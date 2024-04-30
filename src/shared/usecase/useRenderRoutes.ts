import { staffRoutes } from '../presentations/general-layout/model/routesData';
import useMapRoutes from './useMapRoutes';

function generateRoutesChild() {
	const { mappingRoutes, getUserType } = useMapRoutes();
	const action = getUserType();

	// TODO: roles switcher if we want render different type of user/roles
	const whichData = action === 'staff' ? staffRoutes : staffRoutes;
	const renderedRoutes = mappingRoutes(whichData);

	return renderedRoutes;
}

export default generateRoutesChild;
