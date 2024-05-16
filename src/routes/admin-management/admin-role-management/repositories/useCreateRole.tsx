import { ICreateRolePayloadRoot } from "@/shared/models/roleServicesInterface";
import { DashboardRoleAPI } from "@/shared/repositories/roleServies";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

const useMutateCreateAdminRole = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const createRole = async (payload: ICreateRolePayloadRoot) => {
    const newPayload: ICreateRolePayloadRoot = {
      ...payload,
    };

    const data = await DashboardRoleAPI.createRole(newPayload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateRolePayloadRoot) => createRole(payload),
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage("Role successfully added!");
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateAdminRole;
