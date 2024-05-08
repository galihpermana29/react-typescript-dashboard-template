import {
	ILoginPayloadRoot,
	ILoginResponseRoot,
} from '../models/userServicesInterface';
import { ApiClass } from './generalApi';

class DashboardUserServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}
	public async login(payload: ILoginPayloadRoot): Promise<ILoginResponseRoot> {
		const { data } = await this.axiosInstance.post<ILoginResponseRoot>(
			'/users/login',
			payload
		);
		return data;
	}

	// public async getAllRoles(query: string): Promise<RootRolesResponseI> {
	// 	try {
	// 		const token = JSON.parse(localStorage.getItem('token')!);

	// 		const { data } = await this.axiosInstance.get<RootRolesResponseI>(
	// 			`/roles${query ? `?${query}` : ''}`,
	// 			{ headers: { Authorization: `Bearer ${token}` } }
	// 		);
	// 		return data;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// public async creteRoles(
	// 	payload: RootRolesPayloadI
	// ): Promise<RootCreateRolesResponseI> {
	// 	try {
	// 		const token = JSON.parse(localStorage.getItem('token')!);
	// 		const { data } = await this.axiosInstance.post<RootCreateRolesResponseI>(
	// 			'/roles',
	// 			payload,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		return data;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// public async editRoles(
	// 	payload: RootRolesPayloadI,
	// 	id: string
	// ): Promise<RootCreateRolesResponseI> {
	// 	try {
	// 		const token = JSON.parse(localStorage.getItem('token')!);
	// 		const { data } = await this.axiosInstance.put<RootCreateRolesResponseI>(
	// 			`/roles/${id}`,
	// 			payload,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		return data;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// public async deleteRoles(id: string): Promise<RootCreateRolesResponseI> {
	// 	try {
	// 		const token = JSON.parse(localStorage.getItem('token')!);
	// 		const { data } =
	// 			await this.axiosInstance.delete<RootCreateRolesResponseI>(
	// 				`/roles/${id}`,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				}
	// 			);
	// 		return data;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}

export const DashboardUserAPI = new DashboardUserServices();
