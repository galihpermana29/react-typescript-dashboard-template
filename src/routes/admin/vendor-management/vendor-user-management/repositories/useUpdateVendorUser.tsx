import {
	IUpdateUserPayloadRoot,
	IUpdateUserVendorInput,
	IUpdateUserVendorPayload,
	IUserVendorDetail,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';

const useMutateEditVendorUser = (refetch?: () => void) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const editVendorUser = async (
		payload: IUpdateUserVendorInput,
		id: string
	) => {
		const detail: IUserVendorDetail = {
			vendor_description: payload.vendor_description,
			vendor_location: payload.vendor_location,
			vendor_type: payload.vendor_type,
			vendor_album: payload.vendor_album ?? [],
		};

		const newPayload: IUpdateUserVendorPayload = {
			name: payload.name,
			email: payload.email,
			profile_image_uri: payload.profile_image_uri ?? '',
			date_of_birth: dayjs(payload.date_of_birth).format('YYYY-MM-DD'),
			detail: JSON.stringify(detail),
		};
		const data = await DashboardUserAPI.editUser(newPayload, id);
		return data;
	};

	const updateStatus = async (payload: IUpdateUserPayloadRoot, id: string) => {
		const data = await DashboardUserAPI.editUser(payload, id);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: ({
			payload,
			id,
			type,
		}: {
			payload: IUpdateUserPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		}) => {
			if (type === 'delete') {
				return updateStatus(payload, id);
			}
			return editVendorUser(payload, id);
		},
		onError: handleError,
		onSuccess: () => {
			refetch!();
			showSuccessMessage('Vendor has been successfully edited!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateEditVendorUser;
