import { TGeneralFilter } from "@/shared/models/generalInterfaces";
import { DashboardRoleAPI } from "@/shared/repositories/roleServies";
import { DashboardUserAPI } from "@/shared/repositories/userServices";
import useConvertQuery from "@/shared/usecase/useConvertQuery";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { useDebounce } from "@uidotdev/usehooks";
import { FormInstance } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

const useQueryAdminRoles = (
  form: FormInstance<any>,
  page: number = 1,
  limit: number = 5
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const status = searchParams.get("status");

  const initialFilterState: TGeneralFilter = {
    limit: limit,
    page: page,
    keyword: "",
    status: "default",
  };

  const [queryAdminRoles, setQueryAdminRoles] = useState<TGeneralFilter>({
    ...initialFilterState,
    keyword: keyword ? keyword : "",
    status: status ? status : "default",
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData, dataToSelectOptions } = useSuccessAxios();
  const queries = useDebounce(queryAdminRoles, 1000);

  const getAdmins = async () => {
    //  TODO: change to limit and page
    const keywordQuery = {
      keyword: queryAdminRoles.keyword,
      status: queryAdminRoles.status,
    };
    const queryParams = objectToQueryParams(keywordQuery);
    setSearchParams(queryParams);
    const { data } = await DashboardUserAPI.getAllAdminUser(queryParams);

    return addIndexToData(data);
  };

  const getRoles = async () => {
    const { data } = await DashboardRoleAPI.getAllRoles("status=active");
    return dataToSelectOptions(data, "id", "name");
  };

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["admins", { ...queries }],
    queryFn: getAdmins,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryAdminRoles((val) => ({ ...val, [x]: value[x] }));
      }
    }
  };

  const clearFilter = () => {
    const clearFilterQuery = {
      ...initialFilterState,
      limit: queries.limit,
      page: queries.page,
    };
    form.setFieldsValue(clearFilterQuery);

    setQueryAdminRoles(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    data,
    roles,
    error,
    isLoading,
    refetch,
    setQueryAdminRoles,
    queryAdminRoles,
    handleFilter,
    clearFilter,
  };
};

export default useQueryAdminRoles;
