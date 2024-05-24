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
import { useGenerateCascaderOptions } from './useGenerateCascaderOptions';

const formatLabelSubject = (permission: string) => {
	return permission.split(' ')[0] + ' ' + permission.split(' ')[1];
};

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
	const { options } = useGenerateCascaderOptions();

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
