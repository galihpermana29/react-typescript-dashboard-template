import { Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export default function VendorAdditionalDetails() {
	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Additional Details</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your additional details to your profile
				</h4>
			</div>

			{/* This should be a form */}
			<div className="flex flex-col gap-5 flex-grow">
				<div className="flex flex-col gap-1 max-w-lg">
					<h4>
						Description <span className="text-ny-primary-500">*</span>
					</h4>
					<TextArea className="w-full" />
				</div>

				<div className="flex items-center gap-2 max-w-lg w-full">
					{['location', 'profile'].map((field) => (
						<div className="flex flex-col gap-1 w-full">
							<h4>
								Vendor {field} <span className="text-ny-primary-500">*</span>
							</h4>
							<Select className="w-full" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
