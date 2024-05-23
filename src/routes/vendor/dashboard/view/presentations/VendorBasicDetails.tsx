import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import type { ICreateUserVendorInput } from '@/shared/models/userServicesInterface';

export default function VendorBasicDetails() {
	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Basic Details</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your basic profile details
				</h4>
			</div>

			<div className="flex flex-col gap-5 flex-grow">
				{[
					{ label: 'E-mail', name: 'email' as const },
					{ label: 'Name', name: 'name' as const },
				].map((field) => (
					<Form.Item<ICreateUserVendorInput>
						label={field.label}
						name={field.name}
						className="flex flex-col gap-1 max-w-lg">
						<Input className="w-full" />
					</Form.Item>
				))}

				<Form.Item<ICreateUserVendorInput>
					label="Date of birth"
					name="date_of_birth"
					className="flex flex-col gap-1 max-w-lg">
					<DatePicker maxDate={dayjs(new Date())} className="w-full" />
				</Form.Item>
			</div>
		</section>
	);
}
