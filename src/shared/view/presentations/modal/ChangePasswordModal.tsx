import {
	IUpdatePasswordInputRoot,
	IUpdatePasswordResponseRoot,
} from '@/shared/models/userServicesInterface';

import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
	form: FormInstance;
	handleMutate?: UseMutateFunction<
		IUpdatePasswordResponseRoot,
		AxiosError,
		{
			payload: IUpdatePasswordInputRoot;
			id: string;
		},
		unknown
	>;
	footer: React.ReactNode;
	id?: string;
	initialValues?: IUpdatePasswordInputRoot;
}
const FormChangePassword = ({
	form,
	handleMutate,
	footer,
	id,
	initialValues,
}: IFormEdit) => {
	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={(value) => {
					handleMutate!({ payload: value, id: id! });
				}}
				initialValues={initialValues}>
				<div className="flex-1">
					<Form.Item
						className="my-[8px]"
						name={'old_password'}
						label="Old Password"
						rules={[
							{
								required: true,
								message: 'Please input old password!',
							},
						]}>
						<Input
							type="password"
							placeholder="Enter old password"
							className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
						/>
					</Form.Item>
					<Form.Item
						className="my-[8px]"
						name={'new_password'}
						label="New Password"
						rules={[
							{
								required: true,
								message: 'Please input a new password!',
							},
						]}>
						<Input
							type="password"
							placeholder="Enter new password"
							className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
						/>
					</Form.Item>
				</div>
				{footer}
			</Form>
		</div>
	);
};

export default FormChangePassword;
