import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorUserDetail from '../../../repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from '../../../repositories/useUpdateVendorUser';
import { PageFormEdit } from '../../presentations/PageForm/PageFormEdit';

const VendorUserDetailContainer = () => {
	const [form] = useForm();

	const navigate = useNavigate();

	const { id } = useParams();

	const { isLoading: loadingGetDetail, refetch } = useQueryVendorUserDetail(
		id as string,
		form
	);

	const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);

	return (
		<div>
			<ErrorBoundary error={undefined as any} refetch={() => ({})}>
				<div className="bg-white">
					<TableHeaderTitle title="Vendor User Detail" withArrow={true} />
					<LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
						<PageFormEdit
							form={form}
							onSave={mutateEdit}
							onCancel={() => {
								navigate(-1);
							}}
							id={id as string}
							disabled={true}
						/>
					</LoadingHandler>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorUserDetailContainer;
