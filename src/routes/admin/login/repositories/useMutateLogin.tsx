import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { ILoginPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';

const useMutateLogin = () => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const navigate = useNavigate();

	const login = async (payload: ILoginPayloadRoot) => {
		const data = await DashboardUserAPI.login(payload);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: (payload: ILoginPayloadRoot) => login(payload),
		onError: handleError,
		onSuccess: (response) => {
			const { token, user_id, email, permissions, type } = response.data;
			localStorage.setItem('token', JSON.stringify(token));
			localStorage.setItem(
				'admin',
				JSON.stringify({ user_id, email, permissions, type })
			);
			navigate('/home');
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateLogin;
