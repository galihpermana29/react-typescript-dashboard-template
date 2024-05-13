// Get all roles

export interface IAllRolesData {
	id: number;
	name: string;
	permissions: string[];
	status: string;
}

export interface IAllRolesResponseRoot {
	data: IAllRolesData;
}
