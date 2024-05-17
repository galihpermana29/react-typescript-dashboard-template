import { IUpdateUserPayloadRoot } from "@/shared/models/userServicesInterface";
import { DashboardUserAPI } from "@/shared/repositories/userServices";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useMutation } from "react-query";

const useMutateEditVendorUser = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editRoles = async (payload: IUpdateUserPayloadRoot, id: string) => {
    const newPayload: IUpdateUserPayloadRoot = {
      ...payload,
      profile_image_uri: "",
      type: "admin",
      date_of_birth: dayjs(payload.date_of_birth).format("YYYY-MM-DD"),
    };
    const data = await DashboardUserAPI.editUser(newPayload, id);
    return data;
  };

  const updateStatus = async (payload: IUpdateUserPayloadRoot, id: string) => {
    const data = await DashboardUserAPI.editUser(payload, id);
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
      payload: IUpdateUserPayloadRoot;
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
      showSuccessMessage("Vendor has been successfully edited!");
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateEditVendorUser;
