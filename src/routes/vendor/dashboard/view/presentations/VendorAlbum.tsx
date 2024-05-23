import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form } from 'antd';
import type { TVendorFormType } from '../../repositories/vendor-form-type';

export default function VendorAlbum() {
	const form = Form.useFormInstance();
	const maxLength = 3;

	return (
		<section className="flex items-start gap-4 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[36.5%]">
				<h3 className="text-lg">Album</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your additional photo to your album
				</h4>
			</div>

			<Form.Item<TVendorFormType> className="mr-auto" name="vendor_album">
				<DraggerUpload
					form={form}
					formItemName="vendor_album"
					limit={maxLength}
				/>
			</Form.Item>
		</section>
	);
}
