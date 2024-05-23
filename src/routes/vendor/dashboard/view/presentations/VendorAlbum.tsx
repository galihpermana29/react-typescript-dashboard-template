import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form } from 'antd';
import type { ICreateUserVendorInput } from '@/shared/models/userServicesInterface';

export default function VendorAlbum() {
	const form = Form.useFormInstance();
	const current = form.getFieldValue(
		'vendor_album'
	) as ICreateUserVendorInput['vendor_album'];

	const maxLength = 3;

	return (
		<section className="flex items-start gap-4 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[36.5%]">
				<h3 className="text-lg">Album</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your additional photo to your album
				</h4>
			</div>

			<Form.Item<ICreateUserVendorInput>
				className="mr-auto"
				name="vendor_album">
				<DraggerUpload
					profileImageURL={current}
					form={form}
					formItemName="vendor_album"
					limit={maxLength}
				/>
			</Form.Item>
		</section>
	);
}
