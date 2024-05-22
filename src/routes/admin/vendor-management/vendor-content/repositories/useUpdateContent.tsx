import { IUpdateProductPayloadRoot } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
// import useUploadImage from '@/shared/usecase/useUploadImage';
// import { FormInstance } from 'antd';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateEditVendorContent = (
	// form: FormInstance<any>,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();
	// const { mutate: mutateImage, resultImage } = useUploadImage();

	const editContent = async (
		payload: IUpdateProductPayloadRoot,
		id: string
	) => {
		// await mutateImage({ form, fieldName: 'Uimages' });
		const newPayload: IUpdateProductPayloadRoot = {
			...payload,
			images: [''],
		};
		const data = await DashboardProductAPI.editProduct(newPayload, id);
		return data;
	};

	const updateStatus = async (
		payload: IUpdateProductPayloadRoot,
		id: string
	) => {
		const data = await DashboardProductAPI.editProduct(payload, id);
		return data;
	};

	const handleError = (err: AxiosError) => {
		const msg = generateErrorMsg(err);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: ({
			payload,
			id,
			type,
		}: {
			payload: IUpdateProductPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		}) => {
			if (type === 'delete') {
				return updateStatus(payload, id);
			}
			return editContent(payload, id);
		},
		onError: handleError,
		onSuccess: () => {
			refetch!();
			showSuccessMessage('Content has successfully been edited!');
		},
	});

	return {
		mutate,
		error,
		isLoading,
	};
};

export default useMutateEditVendorContent;
