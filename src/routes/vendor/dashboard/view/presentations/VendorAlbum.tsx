import { Button } from 'antd';

export default function VendorAlbum() {
	return (
		<section className="flex items-start gap-36 justify-between w-full">
			<div className="flex flex-col gap-2 min-w-[28%]">
				<h3 className="text-lg">Album</h3>
				<h4 className="font-light text-ny-gray-400">
					Set your additional photo to your album
				</h4>
			</div>

			<div className="flex flex-col gap-8 w-full">
				<div className="flex items-center justify-between w-full">
					<Button type="primary">Add photo</Button>
					<p className="font-bold text-ny-gray-500">0/10</p>
				</div>

				<div className="min-h-80 w-full bg-ny-gray-100 rounded-xl flex items-center justify-center">
					No photos yet
				</div>
			</div>
		</section>
	);
}
