import { Button, Form } from 'antd';
import type { TVendorFormType } from '../../repositories/vendor-form-type';

export default function VendorProfileHeader() {
	const form = Form.useFormInstance();

	return (
		<div className="flex items-center justify-between -mb-7">
			<h1 className="text-xl font-medium">Profile Details</h1>

			<Form.Item<TVendorFormType>>
				<div className="flex items-center gap-2">
					<Button type="link" className="text-ny-primary-400">
						Change password
					</Button>

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
