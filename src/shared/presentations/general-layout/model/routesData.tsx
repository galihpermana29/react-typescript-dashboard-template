import { DesktopOutlined } from '@ant-design/icons';
import { ItemsDataI } from './types';
import DashboardContainer from '../../../../routes/dashboard/Dashboard';

export const staffRoutes: ItemsDataI[] = [
	{
		label: 'Dashboard',
		key: '/home',
		path: 'home',
		children: [],
		icon: <DesktopOutlined />,
		components: <DashboardContainer />,
		show: true,
	},
];
