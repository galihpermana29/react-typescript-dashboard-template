import { message } from 'antd';

const useSuccessAxios = () => {
	const showSuccessMessage = (success: string) => {
		message.success(success);
	};

	const addIndexToData = <T,>(data: T) => {
		if (Array.isArray(data)) {
			return data.map((item) => ({
				...item,
				key: Math.floor(Math.random() * 1000),
			}));
		}
	};

	const dataToSelectOptions = <T,>(data: T, value: string, label: string) => {
		if (Array.isArray(data)) {
			return data.map((item) => ({
				value: item[value],
				label: item[label],
			}));
		}
	};

	return { showSuccessMessage, addIndexToData, dataToSelectOptions };
};

export default useSuccessAxios;
