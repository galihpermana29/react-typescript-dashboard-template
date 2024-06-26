import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useGenerateColumnVendorProduct from './usecase/useGenerateColumn';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import addIcon from '@/assets/icon/add.png';
import useQueryVendorContent from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllContent';
import useMutateEditVendorContent from '@/routes/admin/vendor-management/vendor-content/repositories/useUpdateContent';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';

export const VendorProductContainer = () => {
	const [form] = useForm();
	const navigate = useNavigate();

	const {
		result,
		queryVendorContent,
		setQueryVendorContent,
		isLoading,
		handleFilter,
		clearFilter,
		refetch,
		error,
	} = useQueryVendorContent(form);

	const { mutate: mutateEdit } = useMutateEditVendorContent(refetch);
	const { result: resultTags, error: errorTags } = useQueryTags();
	const { columns } = useGenerateColumnVendorProduct(navigate, mutateEdit);

	return (
		<ErrorBoundary error={(error || errorTags) as AxiosError} refetch={refetch}>
			<TableHeaderTitle title="Vendor Product" />
			<DashboardTable<any>
				columns={columns}
				onPaginationChanges={setQueryVendorContent}
				loading={isLoading}
				data={result?.data}
				metadata={result ? result.meta_data : undefined}
				filterComponents={
					<DashboardTableFilter
						form={form}
						queryAdmins={queryVendorContent}
						onApplyFilter={handleFilter}
						onClearFilter={clearFilter}
						onSearch={setQueryVendorContent}
						buttonComponents={
							<Button
								onClick={() => navigate('/vendor-product/create')}
								className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
								<img src={addIcon} alt="add-icon" />
								Create User
							</Button>
						}
						filterComponents={
							<>
								<Form.Item
									name={'status'}
									label="Status"
									initialValue={queryVendorContent.status}
									className="my-[10px]">
									<Select
										className="h-[35px]"
										options={[
											{ value: 'default', label: 'All' },
											{ value: 'active', label: 'Active' },
											{ value: 'inactive', label: 'Inactive' },
										]}
									/>
								</Form.Item>
								<Form.Item
									name={'tags'}
									label="Tag"
									initialValue={queryVendorContent.tags}
									className="my-[10px]">
									<Select
										showSearch
										filterOption={(input, option) =>
											(option?.label.toLowerCase() ?? '').includes(
												input.toLowerCase()
											)
										}
										filterSort={(optionA, optionB) =>
											(optionA?.label ?? '')
												.toLowerCase()
												.localeCompare((optionB?.label ?? '').toLowerCase())
										}
										mode="multiple"
										className="w-full max-w-[224px] h-[35px]"
										placeholder="Tag"
										options={resultTags?.filterOptions}
									/>
								</Form.Item>
								<Form.Item
									label="Price"
									name={'min_price'}
									initialValue={queryVendorContent.min_price}
									className="my-[10px]">
									<Input
										value={queryVendorContent.min_price}
										className="h-[35px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
										placeholder="Min Price"
									/>
								</Form.Item>
								<Form.Item
									name={'max_price'}
									initialValue={queryVendorContent.max_price}
									className="my-[10px]">
									<Input
										value={queryVendorContent.max_price}
										className="h-[35px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
										placeholder="Max Price"
									/>
								</Form.Item>
							</>
						}
					/>
				}
			/>
		</ErrorBoundary>
	);
};
