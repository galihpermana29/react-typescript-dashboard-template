export interface Metadata {
	total_items: number;
	total_pages: number;
	current_page: number;
	limit: number;
	next_page: any;
	previous_page: any;
}

export type TGeneralFilter = {
	limit: number;
	page: number;
	keyword?: string;
	status?: string;
};

export type TGeneralSelectOptions = {
	value: any;
	label: any;
};
