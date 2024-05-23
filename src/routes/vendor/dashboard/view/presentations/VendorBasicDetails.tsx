import { Input } from 'antd';

export default function VendorBasicDetails() {
	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Basic Details</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your basic profile details
				</h4>
			</div>

			{/* This should be a form */}
			<div className="flex flex-col gap-5 flex-grow">
				{['Email', 'Name', 'Date of Birth'].map((field) => (
					<div className="flex flex-col gap-1 max-w-lg">
						<h4>
							{field} <span className="text-ny-primary-500">*</span>
						</h4>
						<Input className="w-full" />
					</div>
				))}
			</div>
		</section>
	);
}
