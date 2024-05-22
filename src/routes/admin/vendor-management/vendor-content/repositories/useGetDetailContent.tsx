import { FormInstance } from "antd"
import { TModalState } from "../../vendor-user-management/usecase/useModalReducer"
import { DashboardProductAPI } from "@/shared/repositories/productService"
import { useQuery } from "react-query"

const useQueryVendorContentsDetail = (
    modalState?: TModalState,
    form?: FormInstance<any>
) => {
    const getDetail = async () => {
        const { data } = await DashboardProductAPI.getProductDetail(modalState!.id as string);
        form!.setFieldsValue({
            ...data
        })
        return data;
    }

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['vendor-content-detail', modalState!.id],
        queryFn: getDetail,
        enabled: modalState!.id ? true : false,
    })

    return {
        data,
        error,
        isLoading,
        refetch,
    }
}

export default useQueryVendorContentsDetail;