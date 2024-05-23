import { Form, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { citiesList, vendorTypes } from '../../repositories/constants';
import type { ICreateUserVendorInput } from '@/shared/models/userServicesInterface';

export default function VendorAdditionalDetails() {
	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Additional Details</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your additional details to your profile
				</h4>
			</div>

			<div className="flex flex-col gap-5 flex-grow">
				<Form.Item<ICreateUserVendorInput>
					label="Description"
					name="vendor_description"
					className="flex flex-col gap-1 max-w-lg">
					<TextArea className="w-full" />
				</Form.Item>

				<div className="flex items-center gap-2 max-w-lg w-full">
					{[
						{
							label: 'Location',
							name: 'vendor_location' as const,
							options: citiesList,
						},
						{
							label: 'Profile',
							name: 'vendor_type' as const,
							options: vendorTypes,
						},
					].map((field) => (
						<Form.Item<ICreateUserVendorInput>
							label={field.label}
							name={field.name}
							className="flex flex-col gap-1 w-full">
							<Select options={field.options} className="w-full" />
						</Form.Item>
					))}
				</div>
			</div>
		</section>
	);
}
