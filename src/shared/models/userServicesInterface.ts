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
