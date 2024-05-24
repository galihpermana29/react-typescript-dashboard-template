import {
	ICreateProductTagPayloadRoot,
	ICreateProductTagResponseRoot,
} from '@/shared/models/productServicesInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormCreation {
	form: FormInstance;
	handleMutate: UseMutateFunction<
		ICreateProductTagResponseRoot,
		AxiosError,
		ICreateProductTagPayloadRoot,
		unknown
	>;
	footer: React.ReactNode;
}

const FormCreation = ({ form, handleMutate, footer }: IFormCreation) => {
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

export default FormCreation;
