import { message } from 'antd';

const useSuccessAxios = () => {
	const showSuccessMessage = (success: string) => {
		message.success(success);
	};

	return { showSuccessMessage };
};

export default useSuccessAxios;
