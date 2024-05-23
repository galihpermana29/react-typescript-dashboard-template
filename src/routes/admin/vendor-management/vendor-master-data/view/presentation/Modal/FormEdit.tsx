import {
	IUpdateProductTagPayloadRoot,
	IUpdateProductTagResponseRoot,
} from '@/shared/models/productServicesInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
	form: FormInstance;
	handleMutate: UseMutateFunction<
		IUpdateProductTagResponseRoot,
		AxiosError,
		{
			payload: IUpdateProductTagPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		},
		unknown
	>;
	footer: React.ReactNode;
	disable: boolean;
	id?: string;
}
const FormEdit = ({ form, handleMutate, footer, id }: IFormEdit) => {
	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={(value) => {
					handleMutate!({
						payload: value,
						id: id!,
						type: 'update',
					});
				}}>
				<div className="flex gap-[20px]">
					<div className="flex-1">
						<Form.Item
							className="my-[8px]"
							name={'name'}
							label="Tag name"
							rules={[
								{
									required: true,
									message: 'Please input tag name!',
								},
							]}>
							<Input
								placeholder="Enter tag name"
								className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
							/>
						</Form.Item>
					</div>
				</div>
				{footer}
			</Form>
		</div>
	);
};

export default FormEdit;
