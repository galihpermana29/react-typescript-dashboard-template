import { Avatar, Form } from 'antd';

export default function VendorInformation() {
	const form = Form.useFormInstance();

	return (
		<section className="flex flex-col justify-end relative h-64">
			<div className="flex items-end gap-5">
				<Avatar
					shape="square"
					className="border-2 border-white size-32 shrink-0 bg-white"
					src={form.getFieldValue('profile_image_uri')}>
					tes
				</Avatar>

				<div className="flex flex-col gap-0 py-3 -my-0">
					<h1 className="font-semibold text-xl">
						{form.getFieldValue('name')}
					</h1>
					<h3 className="font-light text-ny-gray-400">
						{form.getFieldValue('email')}
					</h3>
				</div>
			</div>
		</section>
	);
}
