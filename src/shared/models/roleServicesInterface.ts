// Get all roles

export interface IRolePermission {
  feature_permission: string;
  feature_access: string[];
}

export interface IAllRolesData {
  id: number;
  name: string;
  permissions: IRolePermission[];
  status: string;
}

export interface IAllRolesResponseRoot {
  data: IAllRolesData[];
}
export interface IDetailRoleResponseRoot {
  data: IAllRolesData;
}

export interface ICreateRolePayloadRoot {
  name: string;
  permissions: IRolePermission[];
}

export interface ICreateRoleResponseRoot {
  data: string;
}

export interface IUpdateRolePayloadRoot {
  name?: string;
  permissions?: IRolePermission[];
  status?: string;
}

export interface IUpdateRoleResponseRoot {
  data: string;
}
