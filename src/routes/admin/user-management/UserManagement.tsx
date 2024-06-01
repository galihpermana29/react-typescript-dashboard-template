import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useGenerateColumn } from './usecase/useGenerateColumn';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import { Form, Select } from 'antd';
import useQueryClientUser from './repositories/useGetAllUser';
import { useForm } from 'antd/es/form/Form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ILoaderData } from '@/routes/root';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { AxiosError } from 'axios';
import useMutateEditClientUser from './repositories/useUpdateUser';

export const UserManagementContainer = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const {
    data,
    queryClientUser,
    setQueryClientUser,
    error,
    refetch,
    handleFilter,
    clearFilter,
    isLoading: loadingGetAll,
  } = useQueryClientUser(form);

  const { permissions } = useLoaderData() as ILoaderData;
  const { view, edit, remove } = permissions;

  const { mutate: mutateEdit } = useMutateEditClientUser(refetch);

  const { columns } = useGenerateColumn(
    remove,
    edit,
    view,
    navigate,
    mutateEdit
  );
  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <TableHeaderTitle title="User Account" />
      <DashboardTable
        columns={columns}
        data={data?.data}
        onPaginationChanges={setQueryClientUser}
        loading={loadingGetAll}
        filterComponents={
          <DashboardTableFilter
            form={form}
            queryAdmins={queryClientUser}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryClientUser}
            buttonComponents={undefined}
            filterComponents={
              <>
                <Form.Item
                  name={'status'}
                  label="Status"
                  initialValue={queryClientUser.status}
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
              </>
            }
          />
        }
      />
    </ErrorBoundary>
  );
};
