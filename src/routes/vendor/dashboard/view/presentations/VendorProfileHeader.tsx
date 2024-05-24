import { Button, Form } from 'antd';
import type { ICreateUserVendorInput } from '@/shared/models/userServicesInterface';
import VendorChangePassword from './VendorChangePassword';

export default function VendorProfileHeader() {
	const form = Form.useFormInstance();

	return (
		<div className="flex items-center justify-between -mb-7">
			<h1 className="text-xl font-medium">Profile Details</h1>

			<Form.Item<ICreateUserVendorInput>>
				<div className="flex items-center gap-2">
					<VendorChangePassword />

					<Button onClick={() => form.resetFields()} type="default">
						Cancel
					</Button>

					<Button htmlType="submit" type="primary">
						Save
					</Button>
				</div>
			</Form.Item>
		</div>
	);
}
