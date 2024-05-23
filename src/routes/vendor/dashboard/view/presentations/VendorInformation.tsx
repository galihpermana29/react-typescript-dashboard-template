import { Avatar } from 'antd';

export default function VendorInformation() {
	return (
		<section className="flex flex-col justify-end relative h-64">
			<div className="flex items-end gap-5">
				<Avatar
					shape="square"
					className="border-2 border-white size-32 shrink-0">
					tes
				</Avatar>

				<div className="flex flex-col gap-0 py-3">
					<h1 className="font-semibold text-xl">Tommy Turner</h1>
					<h3 className="font-light text-ny-gray-400">tommyturner@gmail.com</h3>
				</div>
			</div>
		</section>
	);
}
