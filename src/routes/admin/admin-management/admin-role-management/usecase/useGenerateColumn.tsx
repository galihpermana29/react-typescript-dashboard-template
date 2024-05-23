import {
	IRolePermission,
	IUpdateRolePayloadRoot,
	IUpdateRoleResponseRoot,
} from '@/shared/models/roleServicesInterface';
import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { TModalType } from './useModalReducer';

interface Option {
	value: string | number;
	label: string;
	children?: Option[];
}

const formatLabelSubject = (permission: string) => {
	return permission.split(' ')[0] + ' ' + permission.split(' ')[1];
};

export const options: Option[] = [
	{
		label: 'Admin User Management',
		value: 'admin user management',
		children: [
			{
				label: 'Create Admin User',
				value: 'create',
			},
			{
				label: 'View Admin User',
				value: 'view',
			},
			{
				label: 'Update Admin User',
				value: 'update',
			},
			{
				label: 'Delete Admin User',
				value: 'delete',
			},
		],
	},
	{
		label: 'Admin Role Management',
		value: 'admin role management',
		children: [
			{
				label: 'Create Admin Role',
				value: 'create',
			},
			{
				label: 'View Admin Role',
				value: 'view',
			},
			{
				label: 'Update Admin Role',
				value: 'update',
			},
			{
				label: 'Delete Admin Role',
				value: 'delete',
			},
		],
	},
	{
		label: 'Vendor User Management',
		value: 'vendor user management',
		children: [
			{
				label: 'Create Vendor User',
				value: 'create',
			},
			{
				label: 'View Vendor User',
				value: 'view',
			},
			{
				label: 'Update Vendor User',
				value: 'update',
			},
			{
				label: 'Delete Vendor User',
				value: 'delete',
			},
		],
	},
	{
		label: 'Vendor Content',
		value: 'vendor content',
		children: [
			{
				label: 'Create Vendor Content',
				value: 'create',
			},
			{
				label: 'View Vendor Content',
				value: 'view',
			},
			{
				label: 'Update Vendor Content',
				value: 'update',
			},
			{
				label: 'Delete Vendor Content',
				value: 'delete',
			},
		],
	},
	{
		label: 'Vendor Master Data',
		value: 'vendor master data',
		children: [
			{
				label: 'Create Master Data',
				value: 'create',
			},
			{
				label: 'View Master Data',
				value: 'view',
			},
			{
				label: 'Update Master Data',
				value: 'update',
			},
			{
				label: 'Delete Master Data',
				value: 'delete',
			},
		],
	},
];

const useGenerateColumnAdminRole = (
	remove: boolean,
	edit: boolean,
	onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
	onChangeStatus?: UseMutateFunction<
		IUpdateRoleResponseRoot,
		AxiosError,
		{
			payload: IUpdateRolePayloadRoot;
			id: string;
			type: 'delete' | 'update';
		},
		unknown
	>
) => {
	const columns: TableProps['columns'] = [
		{
			title: 'Role',
			dataIndex: 'name',
			key: 'role',
			render: (text) => {
				return {
					children: <a>{text}</a>,
				};
			},
		},
		{
			title: 'Feature Permission',
			dataIndex: 'permissions',
			key: 'feature_permission',
			render: (permissions: IRolePermission[]) => {
				return {
					children: (
						<div className="flex flex-col gap-4 bg-transparent divide-y">
							{options?.map(({ label, value }, idx) => {
								let index = -1;

								for (let i = 0; i < permissions?.length; i++) {
									if (
										permissions[i]?.feature_permission.includes(value as string)
									) {
										index = i;
									}
								}

								return (
									<Row
										className={`flex flex-nowrap gap-10 ${idx > 0 && 'pt-4'}`}>
										<p className="w-1/4 shrink-0">{label}</p>

										<div className="grid grid-cols-2 h-fit w-3/4">
											<Checkbox
												checked={
													permissions?.[index]?.feature_access.includes(
														'create'
													) ?? false
												}
												className="cursor-default items-center h-fit">
												<span className="text-black capitalize">
													Create {formatLabelSubject(value as string)}
												</span>
											</Checkbox>
											<Checkbox
												checked={
													permissions?.[index]?.feature_access.includes(
														'view'
													) ?? false
												}
												className="cursor-default">
												<span className="text-black capitalize">
													View {formatLabelSubject(value as string)}
												</span>
											</Checkbox>
											<Checkbox
												checked={
													permissions?.[index]?.feature_access.includes(
														'update'
													) ?? false
												}
												className="cursor-default">
												<span className="text-black capitalize">
													Update {formatLabelSubject(value as string)}
												</span>
											</Checkbox>
											<Checkbox
												checked={
													permissions?.[index]?.feature_access.includes(
														'delete'
													) ?? false
												}
												className="cursor-default">
												<span className="text-black capitalize">
													Delete {formatLabelSubject(value as string)}
												</span>
											</Checkbox>
										</div>
									</Row>
								);
							})}
						</div>
					),
					props: { colSpan: 2 },
				};
			},
		},
		{
			title: 'Feature Access',
			dataIndex: 'permissions',
			key: 'feature_access',
			render: () => {
				return {
					children: null,
					props: { colSpan: 0 },
				};
			},
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (text: string) => (
				<Tag className="capitalize" color={text === 'active' ? 'green' : 'red'}>
					{text}
				</Tag>
			),
		},
		{
			title: 'Actions',
			dataIndex: '',
			key: 'actions',
			render: ({ id, status }) => (
				<Row gutter={[12, 12]}>
					<Dropdown
						menu={{
							items: [
								{
									label: 'Edit',
									key: '1',
									onClick: () => onOpenModal!('edit', id),
									disabled: !edit,
								},
								{
									label: status === 'active' ? 'Deactivate' : 'Activate',
									key: '2',

									onClick: () =>
										onChangeStatus!({
											payload: {
												status: status === 'active' ? 'inactive' : 'active',
											},
											id,
											type: 'delete',
										}),
									disabled: !remove,
								},
							],
						}}>
						<Button className="bg-ny-primary-100 text-caption-1 text-ny-primary-500 hover:!bg-ny-primary-100 hover:!text-ny-primary-500">
							<Space>
								Actions
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</Row>
			),
		},
	];

	return { columns };
};

export default useGenerateColumnAdminRole;
