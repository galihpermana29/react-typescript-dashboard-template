import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';

const VendorContentEditContainer = () => {
	return (
		<div>
			<ErrorBoundary error={undefined as any} refetch={() => ({})}>
				<TableHeaderTitle title="Edit Vendor Product" withArrow={true} />
				<div className="p-[20px]">
					<PageHeader
						title="Edit Vendor Product"
						onCancel={null}
						onSave={null}
					/>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorContentEditContainer;
