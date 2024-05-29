import { AxiosError } from "axios";
import { DashboardProductAPI } from "@/shared/repositories/productService";
import { ICreateVendorTypePayloadRoot } from "@/shared/models/productServicesInterface";
import { useMutation } from "react-query";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";

const useMutateCreateVendorType = (
    closeModal?: () => void,
    refetch?: () => void
) => {
    const { generateErrorMsg, showPopError } = useErrorAxios();
    const { showSuccessMessage } = useSuccessAxios();

    const createProductType = async (payload: ICreateVendorTypePayloadRoot) => {
        const data = await DashboardProductAPI.createVendorType(payload);
        return data;
    };

    const handleError = (error: AxiosError) => {
        const msg = generateErrorMsg(error);
        showPopError(msg);
    };

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (payload: ICreateVendorTypePayloadRoot) => createProductType(payload),
        onError: handleError,
        onSuccess: () => {
            closeModal!();
            refetch!();
            showSuccessMessage('Vendor Type successfully added!');
        },
    });

    return {
        mutate,
        error,
        isLoading
    };
}

export default useMutateCreateVendorType