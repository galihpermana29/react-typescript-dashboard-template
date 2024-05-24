import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import { Form } from 'antd';

export default function VendorProfileHeader() {
	const form = Form.useFormInstance();

	return (
		<FormRow
			title="Profile Picture"
			description="This will be displayed on your profile">
			<Form.Item noStyle name={'profile_image_uri'}>
				<DraggerUpload
					form={form}
					formItemName="profile_image_uri"
					profileImageURL={form.getFieldValue('profile_image_uri')}
				/>
			</Form.Item>
		</FormRow>
	);
}
