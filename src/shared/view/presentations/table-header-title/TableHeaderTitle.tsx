import CustomBreadcrumbs from '../breadcrumb/BreadCrumbCustom';

interface ITableHeaderTitle {
	title: string;
}

const TableHeaderTitle = ({ title }: ITableHeaderTitle) => {
	return (
		<div className="mb-[20px]">
			<h1 className="text-heading-6 font-[700]">{title}</h1>
			<CustomBreadcrumbs />
		</div>
	);
};

export default TableHeaderTitle;
