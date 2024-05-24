import { staffRoutes } from '@/shared/view/container/general-layout/model/routesData';

interface IRoleCascaderOption {
	value: string | number;
	label: string;
	children?: IRoleCascaderOption[];
}

const removeManagement = (label: string): string => {
	return label.replace(/ Management/g, '');
};

const mapChildren = (label: string): IRoleCascaderOption[] => {
	return [
		{ label: `Create ${label}`, value: 'create' },
		{ label: `View ${label}`, value: 'view' },
		{ label: `Update ${label}`, value: 'update' },
		{ label: `Delete ${label}`, value: 'delete' },
	];
};

export const useGenerateCascaderOptions = () => {
	const routes: any[] = staffRoutes.filter((_, index) => index > 0);

	const options: IRoleCascaderOption[] = routes.flatMap((item) => {
		if (item.children && item.show) {
			return item.children
				.filter((child) => child.show)
				.map((child) => {
					const label = removeManagement(child.label.props.children);
					return {
						label: child.label.props.children,
						value: child.label.props.children.toLowerCase().replace(/ /g, ' '),
						children: mapChildren(label),
					};
				});
		}
		return [];
	});

	return { options };
};
