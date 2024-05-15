import addIcon from "@/assets/icon/add.png";
import DashboardTable from "@/shared/view/presentations/dashboard-table/DashboardTable";
import DashboardTableFilter from "@/shared/view/presentations/dashboard-table/DashboardTableFilter";
import TableHeaderTitle from "@/shared/view/presentations/table-header-title/TableHeaderTitle";
import { Button, Form, Select } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { useForm } from "antd/es/form/Form";
import useQueryVendorUser from "./repositories/useGetAllVendorUser";
import useGenerateColumnVendorUser from "./usecase/useGenerateColumn";

export const VendorUserManagementContainer = () => {
  const [form] = useForm();

  const { columns } = useGenerateColumnVendorUser();

  const {
    queryVendorContent,
    setQueryVendorContent,
    isLoading,
    handleFilter,
    clearFilter,
  } = useQueryVendorUser(form);

  return (
    <ErrorBoundary>
      <TableHeaderTitle title="Vendor User Management" />

      <DashboardTable<any>
        columns={columns}
        onPaginationChanges={setQueryVendorContent}
        loading={isLoading}
        filterComponents={
          <DashboardTableFilter
            form={form}
            queryAdmins={queryVendorContent}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorContent}
            buttonComponents={
              <Button
                onClick={() => {}}
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer"
              >
                <img src={addIcon} alt="add-icon" />
                Create User
              </Button>
            }
            filterComponents={
              <Form.Item
                name={"status"}
                label="Status"
                initialValue={queryVendorContent.status}
                className="my-[10px]"
              >
                <Select
                  className="h-[35px]"
                  options={[
                    { value: "default", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </Form.Item>
            }
          />
        }
      />
    </ErrorBoundary>
  );
};
