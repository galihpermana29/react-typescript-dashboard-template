// Login
export interface ILoginPayloadRoot {
	email: string;
	password: string;
}

export interface ILoginData {
	user_id: string;
	email: string;
	token: string;
}

// Response

export interface ILoginResponseRoot {
	data: ILoginData;
}

// Get user detail

export interface IDetailUserData {
	id: string;
	name: string;
	email: string;
	date_of_birth: string;
	type: string;
	role_id: number;
	role_name: string;
	status: string;
	profile_image_uri: string;
}

// Response

export interface IDetailUserResponseRoot {
	data: IDetailUserData;
}

// Get all user

// Response
export interface IAllUserResponseRoot {
	data: IDetailUserData[];
}

// Create user

export interface ICreateUserPayloadRoot {
	name: string;
	email: string;
	password: string;
	date_of_birth: string;
	type: string;
	profile_image_uri: string;
	role_id: number;
}

// Response
export interface ICreateUserResponseRoot {
	data: string;
}
