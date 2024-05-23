import LoadingHandler from '@/shared/view/container/loading/Loading';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import PageFormCreate from '../../presentations/PageForm/PageFormCreate';
import useCreateProduct from '../../../repositories/useCreateProduct';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';

const VendorProductCreateContainer = () => {
	const { mutate, isLoading } = useCreateProduct();
	const [form] = useForm();

	const userId = JSON.parse(localStorage.getItem('admin')!)?.user_id;

	const navigate = useNavigate();

	return (
		<div>
			<TableHeaderTitle title="Create Vendor Product" withArrow={true} />
			<div className="p-[20px]">
				<LoadingHandler isLoading={isLoading} fullscreen={true}>
					<PageFormCreate
						disabled={false}
						id={userId as string}
						form={form}
						onSave={mutate}
						onCancel={() => navigate(-1)}
					/>
				</LoadingHandler>
			</div>
		</div>
	);
};

export default VendorProductCreateContainer;
