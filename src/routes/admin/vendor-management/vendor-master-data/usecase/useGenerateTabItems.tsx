import { TabsProps } from 'antd';
import { useState } from 'react';
import { TableTagData } from '../view/presentation/Table/TableTagData';
import { TableProductType } from '../view/presentation/Table/TableProductType';
import { TableVendorType } from '../view/presentation/Table/TableVendorType';

export const useGenerateTabItems = () => {
	const [currentActiveTab, setCurrentActiveTab] = useState(1);

	const tabItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Tag Data',
			children: <TableTagData />,
		},
		{
			key: '2',
			label: 'Product Type',
			children: <TableProductType />,
		},
		{
			key: '3',
			label: 'Vendor Type',
			children: <TableVendorType />,
		},
	];

	return { tabItems, currentActiveTab, setCurrentActiveTab };
};
