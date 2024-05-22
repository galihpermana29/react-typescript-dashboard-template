import { Button, Divider } from 'antd';

interface IPageHeader {
	title: string;
	onCancel: any;
	onSave: any;
}
const PageHeader = ({ title, onCancel, onSave }: IPageHeader) => {
	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-[#323232] text-heading-6">{title}</h1>
				<div className="flex items-center gap-[15px]">
					<Button
						onClick={onCancel}
						className="hover:!bg-white hover:!text-[#323232] h-[40px] bg-white text-[#323232] text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
						Cancel
					</Button>
					<Button
						onClick={onSave}
						className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
						Save
					</Button>
				</div>
			</div>
			<Divider className="my-[20px]" />
		</>
	);
};

export default PageHeader;
