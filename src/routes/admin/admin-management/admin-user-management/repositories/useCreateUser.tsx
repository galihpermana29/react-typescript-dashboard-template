import { ICreateUserPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUploadAPI } from '@/shared/repositories/uploadDocumentService';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
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

	// to avoid type error
	const formImageValue = (
		form.getFieldValue('profile_image_uri') &&
		form.getFieldValue('profile_image_uri')['profile_image_uri']
			? form.getFieldValue('profile_image_uri')['profile_image_uri']
			: ''
	) as string;

	const createAdmins = async (payload: ICreateUserPayloadRoot) => {
		// TODO: fix errors that occurs after succesfully upload once
		const formData = new FormData();
		formData.append('image', formImageValue);

		const profileImageURI = await DashboardUploadAPI.uploadDocs(formData)
			.catch(() => {
				throw new AxiosError("There's a problem when uploading images");
			})
			.then((res) => res.data);

		const newPayload: ICreateUserPayloadRoot = {
			...payload,
			profile_image_uri: profileImageURI,
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
