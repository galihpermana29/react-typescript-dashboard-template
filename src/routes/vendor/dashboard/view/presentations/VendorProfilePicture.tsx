import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Avatar, Form } from 'antd';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';

export default function VendorProfilePicture() {
	const form = Form.useFormInstance();

	return (
		<FormRow
			title="Profile Picture"
			description="This will be displayed on your profile">
			<div className="flex items-start gap-2">
				<Avatar
					shape="square"
					className="border-2 border-white size-36 shrink-0 bg-white"
					src={form.getFieldValue('profile_image_uri')}>
					Avatar
				</Avatar>

				<Form.Item noStyle name={'profile_image_uri'}>
					<DraggerUpload form={form} formItemName="profile_image_uri" />
				</Form.Item>
			</div>
		</FormRow>
	);
}
