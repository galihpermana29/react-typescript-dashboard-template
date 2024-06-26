import { useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../breadcrumb/BreadCrumbCustom';
import arrowBack from '@/assets/icon/back-arrow.svg';
interface ITableHeaderTitle {
	title: string;
	withArrow?: boolean;
}

const TableHeaderTitle = ({ title, withArrow = false }: ITableHeaderTitle) => {
	const navigate = useNavigate();
	return (
		<div className="mb-[20px] flex items-center gap-[20px]">
			{withArrow && (
				<div className="cursor-pointer" onClick={() => navigate(-1)}>
					<img src={arrowBack} alt="arrow-back" />
				</div>
			)}

			<div>
				<h1 className="text-heading-6 font-[700]">{title}</h1>
				<CustomBreadcrumbs />
			</div>
		</div>
	);
};

export default TableHeaderTitle;
