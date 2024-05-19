import { IAllProductResponseRoot } from '../models/productServicesInterface';
import { ApiClass } from './generalApi';

class DashboardProductServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async getAllProducts(query?: string): Promise<IAllProductResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllProductResponseRoot>(
			`/products${query ? `?${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	}
}

export const DashboardProductAPI = new DashboardProductServices();
