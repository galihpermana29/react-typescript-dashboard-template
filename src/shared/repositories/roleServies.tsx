import { IAllRolesResponseRoot } from '../models/roleServicesInterface';
import { ApiClass } from './generalApi';

class DashboardRoleServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async getAllRoles(query?: string): Promise<IAllRolesResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllRolesResponseRoot>(
			`/roles${query ? `?${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	}
}

export const DashboardRoleAPI = new DashboardRoleServices();
