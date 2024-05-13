import React from 'react';

import { MenuItem } from '../model/types';
import { staffRoutes } from '../model/routesData';
import { useNavigate } from 'react-router-dom';

export type actionType = 'manage' | 'staff';

const UseGenerateItems = () => {
	const navigate = useNavigate();

	const whichData = staffRoutes;

	function getItem(
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[]
	): MenuItem {
		if (children) {
			return {
				key,
				icon,
				children,
				label,
				type: 'group',
			} as MenuItem;
		}
		return {
			key,
			icon,
			children,
			label,
		} as MenuItem;
	}

	const handleClickMenu = (path: string) => {
		navigate(path);
	};

	const items: MenuItem[] = whichData.map((data) => {
		const childrens: any = [];

		// if (!data.show) return;

		if (data.children && data.children.length > 0) {
			data.children.forEach((child) => childrens.push(child));
			return getItem(data.label, data.key, data.icon, childrens);
		}

		return getItem(data.label, data.key, data.icon);
	});

	return { items, handleClickMenu };
};

export default UseGenerateItems;
