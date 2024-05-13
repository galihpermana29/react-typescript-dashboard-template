import { AxiosError } from 'axios';
import { Button, Form, Modal, Select } from 'antd';
import { IDetailUserData } from '@/shared/models/userServicesInterface';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import { useForm } from 'antd/es/form/Form';
import addIcon from '@/assets/icon/add.png';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import FormCreation from './view/presentations/Modal/FormCreation';
import FormFooter from './view/presentations/Modal/FormFooter';
import useGenerateColumnAdminUser from './usecase/useGenerateColumn';
import useModalReducer from './usecase/useModalReducer';
import useMutateCreateAdmins from './repositories/useCreateUser';
import useQueryAdmins from './repositories/useGetAllUser';
import FormEdit from './view/presentations/Modal/FormEdit';
import useQueryAdminsDetail from './repositories/useGetDetailUser';

const AdminUserManagementContainer = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const { openModal, closeModal, modalState } = useModalReducer(form);

	const {
		data,
		roles,
		error,
		isLoading: loadingGetAll,
		setQueryAdmins,
		queryAdmins,
		refetch,
		handleFilter,
		clearFilter,
	} = useQueryAdmins(5, 1, form);

	const { mutate: mutateCreate } = useMutateCreateAdmins(closeModal, refetch);

	const { isLoading: loadingGetDetail } = useQueryAdminsDetail(
		modalState,
		formModal
	);

	const { columns } = useGenerateColumnAdminUser(openModal, null);

	const modalType = {
		create: (
			<FormCreation
				roles={roles as TGeneralSelectOptions[]}
				form={formModal}
				handleMutate={mutateCreate}
				footer={
					<FormFooter
						secondaryText="Cancel"
						secondaryProps={{
							onClick: () => closeModal!(),
						}}
						primaryText="Create"
						primaryProps={{ type: 'submit' }}
					/>
				}
			/>
		),
		detail: (
			<FormEdit
				roles={roles as TGeneralSelectOptions[]}
				form={formModal}
				handleMutate={null}
				disable={true}
				footer={
					<FormFooter
						secondaryText="Cancel"
						secondaryProps={{
							onClick: () => closeModal!(),
						}}
						primaryText="Edit"
						primaryProps={{ onClick: () => openModal!('edit'), type: 'button' }}
					/>
				}
			/>
		),
		edit: (
			<FormEdit
				roles={roles as TGeneralSelectOptions[]}
				form={formModal}
				handleMutate={null}
				disable={false}
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
		<div>
			<ErrorBoundary error={error as AxiosError} refetch={refetch}>
				<>
					<Modal
						title="Basic Modal"
						open={modalState?.isOpen}
						footer={null}
						onCancel={closeModal}>
						{modalType[modalState!.type]}
					</Modal>

					<DashboardTable<IDetailUserData>
						filterComponents={
							<DashboardTableFilter
								form={form}
								queryAdmins={queryAdmins}
								onApplyFilter={handleFilter}
								onClearFilter={clearFilter}
								buttonComponents={
									<Button
										onClick={() => openModal!('create')}
										className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px]">
										<img src={addIcon} alt="add-icon" />
										Create User
									</Button>
								}
								filterComponents={
									<>
										<Form.Item
											name={'status'}
											label="Status"
											initialValue={queryAdmins.status}
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
									</>
								}
								onSearch={setQueryAdmins}
							/>
						}
						columns={columns}
						data={data}
						loading={loadingGetAll || loadingGetDetail}
						// metadata={data ? data.metadata : undefined}
						metadata={undefined}
						onPaginationChanges={setQueryAdmins}
					/>
				</>
			</ErrorBoundary>
		</div>
	);
};

export default AdminUserManagementContainer;
