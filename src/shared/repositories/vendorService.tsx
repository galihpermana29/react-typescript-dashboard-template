import type { IAllVendorTypesResponseRoot } from '../models/roleServicesInterface';
import { ApiClass } from './generalApi';

class DashboardVendorServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async getAllTypes(
		query?: string
	): Promise<IAllVendorTypesResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllVendorTypesResponseRoot>(
			`/vendor-types${query ? `&${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return data;
	}
}

export const DashboardVendorAPI = new DashboardVendorServices();
