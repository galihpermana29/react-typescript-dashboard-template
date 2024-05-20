import { ICreateUserPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import useUploadImage from '@/shared/usecase/useUploadImage';
import { FormInstance } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';

const useMutateCreateAdmins = (
	form: FormInstance<any>,
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();
	const { mutate: mutateImage, resultImage } = useUploadImage();

	const createAdmins = async (payload: ICreateUserPayloadRoot) => {
		// TODO: integrate and test with error state while upload the image
		// TODO: modal should still be opened while error
		mutateImage({ form, fieldName: 'profile_image_uri' });
		const newPayload: ICreateUserPayloadRoot = {
			...payload,
			profile_image_uri: resultImage?.data as string,
			type: 'admin',
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
			showSuccessMessage('Admin successfully added!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateCreateAdmins;
