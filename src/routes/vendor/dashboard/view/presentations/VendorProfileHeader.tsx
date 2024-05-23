import { Button } from 'antd';

export default function VendorProfileHeader() {
	return (
		<div className="flex items-center justify-between -mb-7">
			<h1 className="text-xl font-medium">Profile Details</h1>

			<div className="flex items-center gap-2">
				<Button type="link" className="text-ny-primary-400">
					Change password
				</Button>
				<Button type="default">Cancel</Button>
				<Button type="primary">Save</Button>
			</div>
		</div>
	);
}
