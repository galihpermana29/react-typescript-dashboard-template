import { staffRoutes } from '../view/container/general-layout/model/routesData';
import useMapRoutes from './useMapRoutes';

function generateRoutesChild() {
	const { mappingRoutes } = useMapRoutes();

	// TODO: roles switcher if we want render different type of user/roles
	const whichData = staffRoutes;
	const renderedRoutes = mappingRoutes(whichData);

	return renderedRoutes;
}

export default generateRoutesChild;
