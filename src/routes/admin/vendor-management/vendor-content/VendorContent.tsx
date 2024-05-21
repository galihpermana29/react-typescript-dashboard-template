import DashboardTable from "@/shared/view/presentations/dashboard-table/DashboardTable";
import DashboardTableFilter from "@/shared/view/presentations/dashboard-table/DashboardTableFilter";
import TableHeaderTitle from "@/shared/view/presentations/table-header-title/TableHeaderTitle";
import { Form, Input, Select } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { useForm } from "antd/es/form/Form";
import PriceIcon from "@/assets/icon/price.png";
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
              <>
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
                <Form.Item
                  name={"tag"}
                  label="Tag"
                  initialValue={queryVendorContent.tag}
                  className="my-[10px]"
                >
                  <Select
                    mode="multiple"
                    className="w-full max-w-[224px] h-fit"
                    placeholder="tag"
                    options={[
                      { value: "book", label: "Book" },
                      { value: "atomic", label: "Atomic" },
                      { value: "habbit", label: "Habbit" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name={"max_price"}
                  initialValue={queryVendorContent.max_price}
                  className="my-[10px]"
                >
                  <Input
                    value={queryVendorContent.max_price}
                    onChange={(e) => setQueryVendorContent((dx) => ({ ...dx, max_price: e.target.value }))}
                    prefix={<img src={PriceIcon} alt="search" />}
                    className="h-[40px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
                    placeholder="Max Price"
                  />
                </Form.Item>
                <Form.Item
                  name={"min_price"}
                  initialValue={queryVendorContent.min_price}
                  className="my-[10px]"
                >
                  <Input
                    value={queryVendorContent.min_price}
                    onChange={(e) => setQueryVendorContent((dx) => ({ ...dx, min_price: e.target.value }))}
                    prefix={<img src={PriceIcon} alt="search" />}
                    className="h-[40px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
                    placeholder="Min Price"
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
