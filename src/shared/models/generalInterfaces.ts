export interface Metadata {
	total_items: number;
	total_pages: number;
	current_page: number;
	limit: number;
	next_page: number;
	previous_page: number;
}

export type TGeneralFilter = {
	limit: number;
	page: number;
	keyword?: string;
	status?: string;
	tag?: string[]
	max_price?: string;
	min_price?: string;
};

export type TGeneralSelectOptions = {
	value: any;
	label: any;
};
