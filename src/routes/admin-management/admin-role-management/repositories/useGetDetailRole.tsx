import { DashboardRoleAPI } from "@/shared/repositories/roleServies";
import { FormInstance } from "antd";
import { useQuery } from "react-query";
import { TModalState } from "../usecase/useModalReducer";

const useQueryRoleDetail = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const getDetail = async () => {
    const { data } = await DashboardRoleAPI.getRoleById(
      modalState!.id as string
    );
    form!.setFieldsValue({
      ...data,
    });
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["role-detail", modalState!.id],
    queryFn: getDetail,
    enabled: modalState!.id ? true : false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryRoleDetail;
