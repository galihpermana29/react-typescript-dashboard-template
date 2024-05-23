import { IUserVendorDetail } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

const useQueryVendorUserDetail = (id: string, form?: FormInstance) => {
	const getDetail = async () => {
		const { data } = await DashboardUserAPI.getUserById(id as string);

		const vendorDetail: IUserVendorDetail = JSON.parse(data.detail);

		form!.setFieldsValue({
			...data,
			date_of_birth: dayjs(data.date_of_birth),
			vendor_description: vendorDetail.vendor_description,
			vendor_type: vendorDetail.vendor_type,
			vendor_location: vendorDetail.vendor_location,
			vendor_album: vendorDetail.vendor_album,
		});
		return data;
	};

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['vendor-detail', id],
		queryFn: getDetail,
		enabled: id ? true : false,
	});

	return { data, error, isLoading, refetch };
};

export default useQueryVendorUserDetail;
