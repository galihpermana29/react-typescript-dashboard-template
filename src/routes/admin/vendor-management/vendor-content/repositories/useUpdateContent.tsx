import { IUpdateProductPayloadRoot } from "@/shared/models/productServicesInterface";
import { DashboardProductAPI } from "@/shared/repositories/productService";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

const useMutateEditVendorContent = (
    closeModal?: () => void,
    refetch?: () => void
) => {

    const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

    const editContent = async (payload: IUpdateProductPayloadRoot, id: string) => {
        const newPayload: IUpdateProductPayloadRoot = {
            ...payload,
            images: ["book.jpg", "atomic.jpg", "habbit.jpg"]
        }; 
        const data = await DashboardProductAPI.editProduct(newPayload, id);
        return data;
    }

    const updateStatus = async (payload: IUpdateProductPayloadRoot, id: string) => {
		const data = await DashboardProductAPI.editProduct(payload, id);
		return data;
	};

    const handleError = (err: AxiosError) => {
        const msg = generateErrorMsg(err);
        showPopError(msg)
    };

    const { mutate, error, isLoading } = useMutation({
		mutationFn: ({
			payload,
			id,
			type,
		}: {
			payload: IUpdateProductPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		}) => {
			if (type === 'delete') {
				return updateStatus(payload, id);
			}
			return editContent(payload, id);
		},
        onError: handleError,
        onSuccess: () => {
            closeModal!();
            refetch!();
            showSuccessMessage('Content has successfully been edited!');
        }
    })

    return {
        mutate,
        error,
        isLoading
    }
}

export default useMutateEditVendorContent;