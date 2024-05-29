import useQueryVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetVendorTypes';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import { Form, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export default function VendorAdditionalDetails() {
	const { result } = useQueryVendorTypes();
	const vendorTypes = result?.data ?? [];

	return (
		<FormRow
			title="Additional Details"
			description="Set your additional details to your profile">
			<div className="flex flex-col w-full">
				<Form.Item
					className="my-[8px]"
					name={'vendor_description'}
					label="Vendor Description"
					rules={[
						{
							required: true,
							message: 'Please input vendor description!',
						},
					]}>
					<TextArea
						placeholder="Enter a description ..."
						className="text-caption-1"
						style={{ height: 120, resize: 'none' }}
					/>
				</Form.Item>
				<div className="flex w-full gap-2">
					<Form.Item
						className="my-[8px] w-full"
						name={'location'}
						label="Vendor Location"
						rules={[
							{
								required: true,
								message: 'Please select vendor location!',
							},
						]}>
						<Select
							options={[
								{ label: 'Bali', value: 'bali' },
								{ label: 'Jakarta', value: 'jakarta' },
							]}
							placeholder="Enter your detail here!"
							className="text-caption-1"
						/>
					</Form.Item>
					<Form.Item
						className="my-[8px] w-full"
						name={'vendor_type_id'}
						label="Vendor Type"
						rules={[
							{
								required: true,
								message: 'Please select vendor type!',
							},
						]}>
						<Select
							showSearch
							optionFilterProp="children"
							filterOption={(
								input: string,
								option?: { label: string; value: string }
							) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							filterSort={(optionA, optionB) =>
								(optionA?.label ?? '')
									.toLowerCase()
									.localeCompare((optionB?.label ?? '').toLowerCase())
							}
							options={vendorTypes
								.filter((type) => type.status === 'active')
								.map((type) => ({
									label: type.name,
									value: type.id.toString(),
								}))}
							placeholder="Enter your detail here!"
							className="text-caption-1"
						/>
					</Form.Item>
				</div>
			</div>
		</FormRow>
	);
}
