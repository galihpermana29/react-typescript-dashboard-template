import addIcon from "@/assets/icon/add.png";
import { IDetailUserData } from "@/shared/models/userServicesInterface";
import DashboardTable from "@/shared/view/presentations/dashboard-table/DashboardTable";
import DashboardTableFilter from "@/shared/view/presentations/dashboard-table/DashboardTableFilter";
import TableHeaderTitle from "@/shared/view/presentations/table-header-title/TableHeaderTitle";
import { Button, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import useGenerateColumnAdminRole from "./usecase/useGenerateColumn";
import useQueryAdminRoles from "./repositories/useGetAllRole";

export const AdminRoleManagementContainer = () => {
  const [form] = useForm();

  const { queryAdminRoles } = useQueryAdminRoles(form);

  const { columns } = useGenerateColumnAdminRole();

  return (
    <>
      <TableHeaderTitle title="Admin Role Management" />

      <DashboardTable<IDetailUserData>
        filterComponents={
          <DashboardTableFilter
            form={form}
            queryAdmins={queryAdminRoles}
            onApplyFilter={() => {}}
            onClearFilter={() => {}}
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
              <>
                <Form.Item
                  name={"status"}
                  label="Status"
                  initialValue={null}
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
              </>
            }
            onSearch={() => {}}
          />
        }
        columns={columns}
        data={undefined}
        loading={false}
        onPaginationChanges={() => {}}
      />
    </>
  );
};
