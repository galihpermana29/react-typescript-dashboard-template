import type { IUserVendorDetail } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

export const useGetVendor = (id: string) => {
	const getDetail = async () => {
		const { data: result } = await DashboardUserAPI.getUserById(id);

		const data = {
			...result,
			date_of_birth: dayjs(result.date_of_birth),
			detail: (result.detail
				? JSON.parse(result.detail)
				: {
						vendor_description: '',
						vendor_location: '',
						vendor_type: '',
						vendor_album: '',
				  }) as IUserVendorDetail,
		};

		return data;
	};

	const query = useQuery({
		queryKey: ['vendor-user', id],
		queryFn: getDetail,
	});

	return query;
};
