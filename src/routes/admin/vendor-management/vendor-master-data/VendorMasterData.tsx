import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { Tabs } from 'antd';
import { useGenerateTabItems } from './usecase/useGenerateTabItems';

export const VendorMasterDataContainer = () => {
	const { tabItems, currentActiveTab, setCurrentActiveTab } =
		useGenerateTabItems();

	return (
		<>
			<TableHeaderTitle
				title={tabItems[currentActiveTab - 1].label as string}
			/>

			<Tabs
				items={tabItems}
				defaultActiveKey="1"
				onChange={(key) => setCurrentActiveTab(parseInt(key))}
			/>
		</>
	);
};
