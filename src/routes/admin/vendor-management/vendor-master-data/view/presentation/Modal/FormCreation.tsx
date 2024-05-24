import {
	ICreateProductTagPayloadRoot,
	ICreateProductTagResponseRoot,
	ICreateProductTypePayloadRoot,
	ICreateProductTypeResponseRoot,
} from '@/shared/models/productServicesInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormCreation {
	form: FormInstance;
	handleMutate:
	| UseMutateFunction<
		ICreateProductTagResponseRoot,
		AxiosError,
		ICreateProductTagPayloadRoot,
		unknown
	>
	| UseMutateFunction<
		ICreateProductTypeResponseRoot,
		AxiosError,
		ICreateProductTypePayloadRoot,
		unknown
	>;
	footer: React.ReactNode;
	type: 'tag' | 'product-type';
}

const FormCreation = ({ form, handleMutate, footer, type }: IFormCreation) => {
	const isTag = type === 'tag';

	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleMutate}
				className="w-[30rem]">
				<div className="flex gap-[20px]">
					<div className="flex-1">
						<Form.Item
							className="my-[8px]"
							name={'name'}
							label={isTag ? 'Tag name' : 'Product Type name'}
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

export default FormCreation;
