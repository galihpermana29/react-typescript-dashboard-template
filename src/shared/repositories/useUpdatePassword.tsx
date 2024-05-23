import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import {
	IUpdatePasswordInputRoot,
	IUpdatePasswordPayloadRoot,
} from '../models/userServicesInterface';
import { DashboardUserAPI } from './userServices';

const useMutateEditPassword = (
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const updatePassword = async (
		payload: IUpdatePasswordInputRoot,
		id: string
	) => {
		const newPayload: IUpdatePasswordPayloadRoot = {
			user_id: id,
			...payload,
		};

		const data = await DashboardUserAPI.updateUserPassword(newPayload);
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
		}: {
			payload: IUpdatePasswordInputRoot;
			id: string;
		}) => {
			return updatePassword(payload, id);
		},
		onError: handleError,
		onSuccess: () => {
			closeModal!();
			refetch!();
			showSuccessMessage('Password successfully changed!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateEditPassword;
