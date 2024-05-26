import { FormInstance } from 'antd';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import { useQuery } from 'react-query';

const useQueryVendorContentsDetail = (id: string, form?: FormInstance<any>) => {
	const getDetail = async () => {
		const { data } = await DashboardProductAPI.getProductDetail(id as string);
		form!.setFieldsValue({
			...data,
			tags: data.tags.map((dx) => dx.id),
		});
		return data;
	};

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['vendor-content-detail', id],
		queryFn: getDetail,
		enabled: id ? true : false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});

	return {
		data,
		error,
		isLoading,
		refetch,
	};
};

export default useQueryVendorContentsDetail;
