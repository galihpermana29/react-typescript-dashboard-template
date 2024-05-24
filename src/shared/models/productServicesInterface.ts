import { Metadata } from './generalInterfaces';

export interface IDetailProductData {
	id: number;
	title: string;
	tags: string[];
	vendor_id: string;
	vendor_name: string;
	price: string;
	description: string;
	images: string[];
	status: string;
}

export interface IAllProductResponseRoot {
	data: IDetailProductData[];
	meta_data: Metadata;
}

export interface ICreateProductPayloadRoot {
	title?: string;
	tags?: string[];
	vendor_id?: string;
	price?: number;
	description?: string;
	images?: string[];
	status: string;
}

export interface ICreateProductResponseRoot {
	data: string;
}

export interface IUpdateProductPayloadRoot {
	title?: string;
	tags?: string[];
	vendor_id?: string;
	price?: number;
	description?: string;
	images?: string[];
	status: string;
}

export interface IUpdateProductResponseRoot {
	data: string;
}

export interface IDetailProductResponseRoot {
	data: IDetailProductData;
}

export interface IDetailProductTag {
	id: string;
	name: string;
	status: string;
}

export interface IAllProductTagResponseRoot {
	data: IDetailProductData[];
	meta_data: Metadata;
}

export interface ICreateProductTagPayloadRoot {
	name: string;
}

export interface ICreateProductTagResponseRoot {
	data: string;
}

export interface IUpdateProductTagPayloadRoot {
	name?: string;
	status?: string;
}

export interface IUpdateProductTagResponseRoot {
	data: string;
}

export interface IDetailProductTagResponseRoot {
	data: IDetailProductData;
}

export interface IDetailProductTypeData {
	id: string;
	name: string;
	status: string;
}

export interface IDetailProductTypeResponseRoot {
	data: IDetailProductTypeData;
}

export interface IAllProductTypeResponseRoot {
	data: IDetailProductTypeResponseRoot[];
	meta_data: Metadata;
}

export interface ICreateProductTypePayloadRoot {
	name: string;
}

export interface ICreateProductTypeResponseRoot {
	data: string;
}

export interface IUpdateProductTypePayloadRoot {
	name?: string;
	status?: string;
}

export interface IUpdateProductTypeResponseRoot {
	data: string;
}
