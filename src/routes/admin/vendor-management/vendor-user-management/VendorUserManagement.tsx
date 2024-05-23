import addIcon from '@/assets/icon/add.png';
import { ILoaderData } from '@/routes/root';
import { IDetailUserData } from '@/shared/models/userServicesInterface';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { Button, Form, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useQueryVendorUser from './repositories/useGetAllVendorUser';
import useMutateEditVendorUser from './repositories/useUpdateVendorUser';
import useGenerateColumnVendorUser from './usecase/useGenerateColumn';
import useModalReducer from './usecase/useModalReducer';
import FormFooter from './view/presentations/Modal/FormFooter';

export const VendorUserManagementContainer = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const navigate = useNavigate();

	const { permissions } = useLoaderData() as ILoaderData;
	const { create, view, edit, remove } = permissions;

	const { modalState, closeModal } = useModalReducer(formModal);

	const {
		result,
		queryVendorUser,
		setQueryVendorUser,
		isLoading: loadingGetAll,
		handleFilter,
		clearFilter,
		refetch,
		error,
	} = useQueryVendorUser(form);

	const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);

	const { columns } = useGenerateColumnVendorUser(
		remove,
		edit,
		view,
		navigate,
		mutateEdit
	);

	const { mutate: mutateEditPassword } = useMutateEditPassword(closeModal);

	const modalType = {
		password: (
			<FormChangePassword
				id={modalState?.id}
				form={formModal}
				handleMutate={mutateEditPassword}
				footer={
					<FormFooter
						secondaryText="Cancel"
						secondaryProps={{
							onClick: () => closeModal!(),
						}}
						primaryText="Save"
						primaryProps={{ type: 'submit' }}
					/>
				}
			/>
		),
	};

	return (
		<ErrorBoundary error={error as AxiosError} refetch={refetch}>
			<TableHeaderTitle title="Vendor User Management" />

			<Modal
				title={
					<div className="capitalize">
						{modalState?.type === 'password'
							? 'Change Password'
							: `${modalState?.type} User`}
					</div>
				}
				open={modalState?.isOpen}
				footer={null}
				onCancel={closeModal}>
				{modalType[modalState!.type]}
			</Modal>

			<DashboardTable<IDetailUserData>
				columns={columns}
				data={result?.data}
				onPaginationChanges={setQueryVendorUser}
				loading={loadingGetAll}
				metadata={result?.meta_data}
				filterComponents={
					<DashboardTableFilter
						form={form}
						queryAdmins={queryVendorUser}
						onApplyFilter={handleFilter}
						onClearFilter={clearFilter}
						onSearch={setQueryVendorUser}
						buttonComponents={
							<Button
								disabled={!create}
								href="vendor-user-management/create-user"
								className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
								<img src={addIcon} alt="add-icon" />
								Create User
							</Button>
						}
						filterComponents={
							<Form.Item
								name={'status'}
								label="Status"
								initialValue={queryVendorUser.status}
								className="my-[10px]">
								<Select
									className="h-[35px]"
									options={[
										{ value: 'default', label: 'All' },
										{ value: 'active', label: 'Active' },
										{ value: 'inactive', label: 'Inactive' },
									]}
								/>
							</Form.Item>
						}
					/>
				}
			/>
		</ErrorBoundary>
	);
};
