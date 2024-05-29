import { DashboardVendorAPI } from '@/shared/repositories/vendorService';
import { useQuery } from 'react-query';

const useQueryVendorTypes = () => {
	const getVendorTypes = async () => {
		const { data, meta_data } = await DashboardVendorAPI.getAllTypes();

		return { data, meta_data };
	};

	const {
		data: result,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['vendor-types'],
		queryFn: getVendorTypes,
	});

	return {
		result,
		error,
		isLoading,
		refetch,
	};
};

export default useQueryVendorTypes;
