import { TGeneralFilter } from "@/shared/models/generalInterfaces";
import { DashboardUserAPI } from "@/shared/repositories/userServices";
import useConvertQuery from "@/shared/usecase/useConvertQuery";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { useDebounce } from "@uidotdev/usehooks";
import { FormInstance } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

const useQueryVendorUser = (
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

  const [queryVendorUser, setQueryVendorUser] = useState<TGeneralFilter>({
    ...initialFilterState,
    keyword: keyword ? keyword : "",
    status: status ? status : "default",
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorUser, 1000);

  const getVendorUser = async () => {
    const keywordQuery = {
      keyword: queryVendorUser.keyword,
      status: queryVendorUser.status,
    };

    const queryParams = objectToQueryParams(keywordQuery);
    setSearchParams(queryParams);

    const { data } = await DashboardUserAPI.getAllVendorUser(queryParams);

    return addIndexToData(data);
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["vendor", { ...queries }],
    queryFn: getVendorUser,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorUser((val) => ({ ...val, [x]: value[x] }));
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

    setQueryVendorUser(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    data,
    error,
    isLoading,
    refetch,
    setQueryVendorUser,
    queryVendorUser,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorUser;
