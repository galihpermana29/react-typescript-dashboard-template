import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { PageFormCreate } from '../../presentations/PageForm/PageFormCreate';
import useMutateCreateVendorUser from '../../../repositories/useCreateVendorUser';

const VendorUserCreateContainer = () => {
	const [form] = useForm();

	const navigate = useNavigate();

	const { mutate: mutateCreate } = useMutateCreateVendorUser();

	return (
		<div>
			<ErrorBoundary error={undefined as any} refetch={() => ({})}>
				<div className="bg-white">
					<TableHeaderTitle title="Create User" withArrow={true} />
					<PageFormCreate
						form={form}
						onSave={mutateCreate}
						onCancel={() => {
							form.resetFields();
							navigate(-1);
						}}
					/>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorUserCreateContainer;
