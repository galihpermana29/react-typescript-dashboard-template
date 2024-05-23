import { ILoaderData } from '@/routes/root';
import { Button, Divider } from 'antd';
import { useLoaderData } from 'react-router-dom';

interface IPageHeader {
	title: string;
	onCancel: any;
	id?: string;
	showEditButton?: boolean;
}
const PageHeader = ({
	title,
	onCancel,
	id,
	showEditButton = false,
}: IPageHeader) => {
	const { permissions } = useLoaderData() as ILoaderData;
	const { edit } = permissions;

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="text-[#323232] text-heading-6">{title}</h1>
				<div className="flex items-center gap-[15px]">
					<Button
						onClick={onCancel}
						className="enabled:hover:!bg-white enabled:hover:!text-[#323232] h-[40px] bg-white text-[#323232] text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
						Cancel
					</Button>
					<Button
						htmlType="submit"
						className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
						Save
					</Button>
					{showEditButton && (
						<Button
							htmlType="submit"
							href={`/vendor-user-management/detail-user/${id}`}
							disabled={!edit}
							className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
							Edit
						</Button>
					)}
				</div>
			</div>
			<Divider className="my-[5px]" />
		</>
	);
};

export default PageHeader;
