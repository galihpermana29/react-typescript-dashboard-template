import DashboardTable from "@/shared/view/presentations/dashboard-table/DashboardTable";
import DashboardTableFilter from "@/shared/view/presentations/dashboard-table/DashboardTableFilter";
import TableHeaderTitle from "@/shared/view/presentations/table-header-title/TableHeaderTitle";
import { Form, Select } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { useForm } from "antd/es/form/Form";
import useQueryVendorContent from "./repositories/useGetAllContent";
import useGenerateColumnVendorProduct from "./usecase/useGenerateColumn";

export const VendorContentContainer = () => {
  const [form] = useForm();

  const { columns } = useGenerateColumnVendorProduct();

  const {
    data,
    queryVendorContent,
    setQueryVendorContent,
    isLoading,
    handleFilter,
    clearFilter,
  } = useQueryVendorContent(form);


  return (
    <ErrorBoundary>
      <TableHeaderTitle title="Vendor Content" />

      <DashboardTable<any>
        columns={columns}
        onPaginationChanges={setQueryVendorContent}
        loading={isLoading}
        data={data}
        filterComponents={
          <DashboardTableFilter
            form={form}
            queryAdmins={queryVendorContent}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorContent}
            buttonComponents={undefined}
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
