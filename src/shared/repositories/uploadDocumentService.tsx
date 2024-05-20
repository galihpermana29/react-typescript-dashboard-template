import { IUploadResponseRoot } from '../models/uploadDocumentServiceInterface';
import { ApiClass } from './generalApi';

class DashboardUserServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async uploadDocs(file: FormData): Promise<IUploadResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);
		const { data } = await this.axiosInstance.post<IUploadResponseRoot>(
			`/upload`,
			file,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	}
}

export const DashboardUploadAPI = new DashboardUserServices();
