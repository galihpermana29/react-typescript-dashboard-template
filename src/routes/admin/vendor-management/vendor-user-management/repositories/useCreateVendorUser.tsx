import { ICreateUserPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';

const useMutateCreateVendorUser = (
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const createAdmins = async (payload: ICreateUserPayloadRoot) => {
		const newPayload: ICreateUserPayloadRoot = {
			...payload,
			type: 'vendor',
			date_of_birth: dayjs(payload.date_of_birth).format('YYYY-MM-DD'),
		};

		const data = await DashboardUserAPI.createUser(newPayload);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: (payload: ICreateUserPayloadRoot) => createAdmins(payload),
		onError: handleError,
		onSuccess: () => {
			closeModal!();
			refetch!();
			showSuccessMessage('Vendor successfully added!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateCreateVendorUser;
