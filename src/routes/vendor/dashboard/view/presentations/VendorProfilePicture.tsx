// import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Avatar, Form } from 'antd';

export default function VendorProfilePicture() {
	const form = Form.useFormInstance();

	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Profile Picture</h3>
				<h4 className="font-light text-ny-gray-400">
					This will be displayed on your profile
				</h4>
			</div>

			<div className="flex flex-grow gap-4">
				<Avatar
					shape="square"
					className="border-2 border-white size-32 shrink-0"
					src={form.getFieldValue('profile_image_uri')}>
					tes
				</Avatar>

				{/* <DraggerUpload /> */}
			</div>
		</section>
	);
}
