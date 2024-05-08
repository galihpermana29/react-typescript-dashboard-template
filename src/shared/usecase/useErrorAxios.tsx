import { AxiosError } from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IErrorResponseRoot } from '../models/errorInterfaces';

const useErrorAxios = () => {
	const navigate = useNavigate();
	const generateErrorMsg = (error: AxiosError) => {
		const axiosError = error as AxiosError;
		const responseData = axiosError.response?.data as
			| IErrorResponseRoot
			| undefined;
		const err = responseData
			? responseData?.errors[0]
			: 'Ouch, an error happen!';

		if (err === 'Invalid token') {
			localStorage.clear();
			navigate('/login');
		}

		return err ? err : '404 Not Found Server Error';
	};

	const showPopError = (error: string) => {
		message.error(error);
	};

	return { generateErrorMsg, showPopError };
};

export default useErrorAxios;
