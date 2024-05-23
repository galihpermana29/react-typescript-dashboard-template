import {
	IAllProductResponseRoot,
	IAllProductTagResponseRoot,
	ICreateProductTagPayloadRoot,
	ICreateProductTagResponseRoot,
	IDetailProductResponseRoot,
	IDetailProductTagResponseRoot,
	IUpdateProductPayloadRoot,
	IUpdateProductResponseRoot,
	IUpdateProductTagPayloadRoot,
	IUpdateProductTagResponseRoot,
	ICreateProductPayloadRoot,
	ICreateProductResponseRoot,
	IDetailProductResponseRoot,
	IUpdateProductPayloadRoot,
	IUpdateProductResponseRoot,
} from '../models/productServicesInterface';
import { ApiClass } from './generalApi';

class DashboardProductServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async getAllProducts(
		query?: string
	): Promise<IAllProductResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllProductResponseRoot>(
			`/products${query ? `?${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	}

	public async getProductDetail(
		id: string
	): Promise<IDetailProductResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IDetailProductResponseRoot>(
			`/products/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return data;
	}

	public async editProduct(
		payload: IUpdateProductPayloadRoot,
		id: string
	): Promise<IUpdateProductResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.patch<IUpdateProductResponseRoot>(
			`/products/${id}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return data;
	}

	public async createProductTag(
		payload: ICreateProductTagPayloadRoot
	): Promise<ICreateProductTagResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);
		const { data } =
			await this.axiosInstance.post<ICreateProductTagResponseRoot>(
				'/tags',
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		return data;
	}

	public async getAllProductTags(
		query?: string
	): Promise<IAllProductTagResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllProductTagResponseRoot>(
			`/tags${query ? `?${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	}

	public async editProductTag(
		payload: IUpdateProductTagPayloadRoot,
		id: string
	): Promise<IUpdateProductTagResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } =
			await this.axiosInstance.patch<IUpdateProductTagResponseRoot>(
				`/tags/${id}`,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

		return data;
	}

	public async getProductTagDetail(
		id: string
	): Promise<IDetailProductTagResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } =
			await this.axiosInstance.get<IDetailProductTagResponseRoot>(
				`/tags/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

		return data;
	}
  
  public async createProduct(
		payload: ICreateProductPayloadRoot
	): Promise<ICreateProductResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);
		const { data } = await this.axiosInstance.post<ICreateProductResponseRoot>(
			`/products`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return data;
	}
}

export const DashboardProductAPI = new DashboardProductServices();
