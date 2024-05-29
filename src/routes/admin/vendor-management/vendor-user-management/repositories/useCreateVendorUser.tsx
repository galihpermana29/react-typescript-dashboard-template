import {
	ICreateUserVendorInput,
	ICreateUserVendorPayload,
	IUserVendorDetail,
	type IUserVendorDetailJSON,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useMutateCreateVendorUser = () => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const navigate = useNavigate();

	const createAdmins = async (payload: ICreateUserVendorInput) => {
		const detail: IUserVendorDetail = {
			vendor_type_id: payload.vendor_type_id
				? parseInt(payload.vendor_type_id)
				: undefined,
			location: payload.location,
			json_text: JSON.stringify({
				vendor_description: payload.vendor_description,
				vendor_album: payload.vendor_album,
			} as IUserVendorDetailJSON),
		};

		const newPayload: ICreateUserVendorPayload = {
			name: payload.name,
			email: payload.email,
			password: payload.password,
			profile_image_uri: payload.profile_image_uri ?? '',
			type: 'vendor',
			role_id: 2,
			date_of_birth: dayjs(payload.date_of_birth).format('YYYY-MM-DD'),
			detail,
		};

		const data = await DashboardUserAPI.createUser(newPayload);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: (payload: ICreateUserVendorInput) => createAdmins(payload),
		onError: handleError,
		onSuccess: () => {
			showSuccessMessage('Vendor successfully added!');
			navigate('/vendor-user-management');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateCreateVendorUser;
