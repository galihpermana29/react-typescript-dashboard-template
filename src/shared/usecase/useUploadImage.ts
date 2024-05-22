import { useMutation } from 'react-query';
import { DashboardUploadAPI } from '../repositories/uploadDocumentService';
import useErrorAxios from './useErrorAxios';
import useSuccessAxios from './useSuccessAxios';
import { AxiosError } from 'axios';

const useUploadImage = () => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const uploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('image', file);
		const { data } = await DashboardUploadAPI.uploadDocs(formData);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutateAsync, error, isLoading, data } = useMutation({
		mutationFn: (file: File) => uploadImage(file),
		onError: handleError,
		onSuccess: () => {
			showSuccessMessage('Image has successfully uploaded!');
		},
	});

	return { mutate: mutateAsync, error, isLoading, resultImage: data };
};

export default useUploadImage;
