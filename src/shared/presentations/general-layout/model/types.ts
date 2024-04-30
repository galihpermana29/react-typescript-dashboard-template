import { MenuProps } from 'antd';

//type
export type MenuItem = Required<MenuProps>['items'][number];

// interface
export interface ItemsDataI {
	label: string;
	key: string;
	children: ItemsDataI[];
	icon: any;
	components: React.ReactNode;
	show: boolean;
	path: string;
}
