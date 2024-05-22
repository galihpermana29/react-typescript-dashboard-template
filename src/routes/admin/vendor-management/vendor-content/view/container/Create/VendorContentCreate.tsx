import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { AxiosError } from 'axios';

const VendorContentCreateContainer = () => {
	return (
		<div>
			<ErrorBoundary error={{} as AxiosError} refetch={() => ({})}>
				<TableHeaderTitle title="Create Vendor Account" withArrow={true} />
			</ErrorBoundary>
		</div>
	);
};

export default VendorContentCreateContainer;
