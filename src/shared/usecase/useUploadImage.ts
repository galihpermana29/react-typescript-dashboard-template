import { FormInstance } from 'antd';
import { useMutation } from 'react-query';
import { DashboardUploadAPI } from '../repositories/uploadDocumentService';
import useErrorAxios from './useErrorAxios';
import useSuccessAxios from './useSuccessAxios';
import { AxiosError } from 'axios';

const useUploadImage = () => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const uploadImage = async ({
		form,
		fieldName,
	}: {
		form: FormInstance<any>;
		fieldName: string;
	}) => {
		const formData = new FormData();
		formData.append('image', form.getFieldValue(fieldName)[fieldName]);
		const data = await DashboardUploadAPI.uploadDocs(formData);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading, data } = useMutation({
		mutationFn: ({
			form,
			fieldName,
		}: {
			form: FormInstance<any>;
			fieldName: string;
		}) => uploadImage({ form, fieldName }),
		onError: handleError,
		onSuccess: () => {
			showSuccessMessage('Image has successfully uploaded!');
		},
	});

	return { mutate, error, isLoading, resultImage: data };
};

export default useUploadImage;
