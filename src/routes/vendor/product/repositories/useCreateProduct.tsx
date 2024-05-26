import { ICreateProductPayloadRoot } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useCreateProduct = () => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();
	const navigate = useNavigate();

	const createProduct = async (payload: ICreateProductPayloadRoot) => {
		const newPayload = {
			...payload,
			status: 'active',
			tags: payload.tags!.map((dx) => ({ id: dx })),
		};
		const data = await DashboardProductAPI.createProduct(newPayload);
		return data;
	};

	const handleError = (err: AxiosError) => {
		const msg = generateErrorMsg(err);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: (payload: ICreateProductPayloadRoot) => {
			return createProduct(payload);
		},
		onError: handleError,
		onSuccess: () => {
			navigate('/vendor-product');
			showSuccessMessage('Product has successfully been created!');
		},
	});

	return {
		mutate,
		error,
		isLoading,
	};
};

export default useCreateProduct;
