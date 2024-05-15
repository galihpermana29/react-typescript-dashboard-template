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

  const initialFilterState: TGeneralFilter = {
    limit: limit,
    page: page,
    keyword: "",
    status: "default",
  };

  const [queryVendorContent, setQueryVendorContent] = useState<TGeneralFilter>({
    ...initialFilterState,
    keyword: keyword ? keyword : "",
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorContent, 1000);

  const getVendorContent = async () => {
    const keywordQuery = {
      keyword: queryVendorContent.keyword,
    };
    const queryParams = objectToQueryParams(keywordQuery);
    setSearchParams(queryParams);
    const { data } = await DashboardUserAPI.getAllAdminUser(queryParams);

    return addIndexToData(data);
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["vendor", { ...queries }],
    queryFn: getVendorContent,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorContent((val) => ({ ...val, [x]: value[x] }));
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

    setQueryVendorContent(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    data,
    error,
    isLoading,
    refetch,
    setQueryVendorContent,
    queryVendorContent,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorUser;
