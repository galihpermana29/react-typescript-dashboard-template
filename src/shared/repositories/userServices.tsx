import {
  IAllUserResponseRoot,
  ICreateUserPayloadRoot,
  ICreateUserResponseRoot,
  IDetailUserResponseRoot,
  ILoginPayloadRoot,
  ILoginResponseRoot,
  IUpdateUserPayloadRoot,
  IUpdateUserResponseRoot,
} from "../models/userServicesInterface";
import { ApiClass } from "./generalApi";

class DashboardUserServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }
  public async login(payload: ILoginPayloadRoot): Promise<ILoginResponseRoot> {
    const { data } = await this.axiosInstance.post<ILoginResponseRoot>(
      "/users/login",
      payload
    );
    return data;
  }

  public async getUserById(id: string): Promise<IDetailUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem("token")!);
    const { data } = await this.axiosInstance.get<IDetailUserResponseRoot>(
      `/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  public async getAllAdminUser(query?: string): Promise<IAllUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem("token")!);

    const { data } = await this.axiosInstance.get<IAllUserResponseRoot>(
      `/users?type=admin${query ? `&${query}` : ""}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  public async createUser(
    payload: ICreateUserPayloadRoot
  ): Promise<ICreateUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem("token")!);
    const { data } = await this.axiosInstance.post<ICreateUserResponseRoot>(
      "/users",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  public async editUser(
    payload: IUpdateUserPayloadRoot,
    id: string
  ): Promise<IUpdateUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem("token")!);
    const { data } = await this.axiosInstance.patch<IUpdateUserResponseRoot>(
      `/users/${id}`,
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

export const DashboardUserAPI = new DashboardUserServices();
