import LoadingHandler from '@/shared/view/container/loading/Loading';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import { Button, Form, Modal } from 'antd';
import FormFooter from '@/routes/admin/admin-management/admin-user-management/view/presentations/Modal/FormFooter';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import useModalReducer from '../../usecase/useModalReducer';
import { useGetVendor } from '../../usecase/useGetVendor';
import type { ILoginData } from '@/shared/models/userServicesInterface';

export default function VendorChangePassword() {
	const [form] = Form.useForm();

	const { closeModal, modalState, openModal } = useModalReducer();

	const userDetail = localStorage ? localStorage.getItem('admin') : null;

	const parsedUserDetail = userDetail
		? (JSON.parse(userDetail) as ILoginData)
		: undefined;

	const userId = parsedUserDetail ? parsedUserDetail.user_id : '';

	const { refetch } = useGetVendor(userId);

	const { mutate, isLoading } = useMutateEditPassword(closeModal, refetch);

	return (
		<LoadingHandler isLoading={isLoading}>
			<Modal
				title="Change Password"
				open={modalState ? modalState['isOpen'] : undefined}
				footer={null}>
				<FormChangePassword
					id={userId}
					form={form}
					handleMutate={mutate}
					footer={
						<FormFooter
							secondaryText="Cancel"
							secondaryProps={{
								onClick: () => {
									form.setFieldsValue({ new_password: '', old_password: '' });
									closeModal!();
								},
							}}
							primaryText="Save"
							primaryProps={{ type: 'submit' }}
						/>
					}
				/>
			</Modal>

			<Button
				onClick={() => openModal!('password', modalState?.id)}
				type="link"
				className="text-ny-primary-400">
				Change password
			</Button>
		</LoadingHandler>
	);
}
