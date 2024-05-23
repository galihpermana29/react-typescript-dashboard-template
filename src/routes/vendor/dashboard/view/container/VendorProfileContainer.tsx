import { Form } from 'antd';
import { useGetVendor } from '../../usecase/useGetVendor';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import type {
	ICreateUserVendorInput,
	ILoginData,
} from '@/shared/models/userServicesInterface';
import useMutateEditVendorUser from '@/routes/admin/vendor-management/vendor-user-management/repositories/useUpdateVendorUser';

export default function VendorProfileContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	const [form] = Form.useForm();

	const userDetail = localStorage ? localStorage.getItem('admin') : null;

	const parsedUserDetail = userDetail
		? (JSON.parse(userDetail) as ILoginData)
		: undefined;

	const userId = parsedUserDetail ? parsedUserDetail.user_id : '';

	const { data, isLoading, refetch } = useGetVendor(userId);

	const initialValues = {
		id: data?.id,
		name: data?.name,
		email: data?.email,
		date_of_birth: data?.date_of_birth,
		type: data?.type,
		role_id: data?.role_id,
		role_name: data?.role_name,
		status: data?.status,
		profile_image_uri: data?.profile_image_uri,
		vendor_description: data?.detail.vendor_description,
		vendor_type: data?.detail.vendor_type,
		vendor_location: data?.detail.vendor_location,
		vendor_album: data?.detail.vendor_album,
	};

	const { mutate } = useMutateEditVendorUser(refetch);

	return (
		<LoadingHandler
			classname="min-h-screen w-full justify-center items-center flex"
			isLoading={isLoading}>
			<Form<ICreateUserVendorInput>
				layout="vertical"
				initialValues={initialValues}
				form={form}
				onFinish={(payload) => mutate({ payload, id: userId, type: 'update' })}
				className="relative">
				<div className="bg-ny-primary-500 h-44 w-full absolute top-0 rounded-xl" />

				{children}
			</Form>
		</LoadingHandler>
	);
}
