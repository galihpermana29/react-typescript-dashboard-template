import { IUpdateRolePayloadRoot } from "@/shared/models/roleServicesInterface";
import { DashboardRoleAPI } from "@/shared/repositories/roleServies";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

const useMutateEditAdminRoles = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editRoles = async (payload: IUpdateRolePayloadRoot, id: string) => {
    const newPayload: IUpdateRolePayloadRoot = {
      ...payload,
    };
    const data = await DashboardRoleAPI.editRole(newPayload, id);
    return data;
  };

  const updateStatus = async (payload: IUpdateRolePayloadRoot, id: string) => {
    const data = await DashboardRoleAPI.editRole(payload, id);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: ({
      payload,
      id,
      type,
    }: {
      payload: IUpdateRolePayloadRoot;
      id: string;
      type: "delete" | "update";
    }) => {
      if (type === "delete") {
        return updateStatus(payload, id);
      }
      return editRoles(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage("Role has successfully edited!");
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateEditAdminRoles;
