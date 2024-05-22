
export interface IDetailProductData {
  id: number,
  title: string,
  tags: string[],
  vendor_id: string
  vendor_name: string
  price: string
  description: string
  images: string[]
  status: string
}

export interface IAllProductResponseRoot {
  data: IDetailProductData[]
}

export interface ICreateProductPayloadRoot {
  title?: string
  tags?: string[]
  vendor_id?: string
  price?: number
  description?: string
  images?: string[]
  status: string
}

export interface ICreateProductResponseRoot {
 	data: string;
}

export interface IUpdateProductPayloadRoot {
  title?: string
  tags?: string[]
  vendor_id?: string
  price?: number
  description?: string
  images?: string[]
  status: string
}

export interface IUpdateProductResponseRoot {
  data: string;
}

export interface IDetailProductResponseRoot {
  data: IDetailProductData;
}