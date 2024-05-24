import {
	IUpdateProductTagPayloadRoot,
	IUpdateProductTagResponseRoot,
	IUpdateProductTypePayloadRoot,
	IUpdateProductTypeResponseRoot,
} from '@/shared/models/productServicesInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
	form: FormInstance;
	handleMutate:
	| UseMutateFunction<
		IUpdateProductTagResponseRoot,
		AxiosError,
		{
			payload: IUpdateProductTagPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		},
		unknown
	>
	| UseMutateFunction<
		IUpdateProductTypeResponseRoot,
		AxiosError,
		{
			payload: IUpdateProductTypePayloadRoot;
			id: string;
			type: 'delete' | 'update';
		},
		unknown
	>;
	type: 'tag' | 'product-type';
	footer: React.ReactNode;
	disable: boolean;
	id?: string;
}
const FormEdit = ({ form, handleMutate, footer, id, type }: IFormEdit) => {
	const isTag = type === 'tag';

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
							label={isTag ? 'Tag name' : 'Type name'}
							rules={[
								{
									required: true,
									message: `Please input ${isTag ? 'tag' : 'product type'} name!`,
								},
							]}>
							<Input
								placeholder={`Enter ${isTag ? 'tag' : 'product type'} name`}
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
