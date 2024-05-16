import {
  IRolePermission,
  IUpdateRolePayloadRoot,
  IUpdateRoleResponseRoot,
} from "@/shared/models/roleServicesInterface";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Row,
  Space,
  TableProps,
  Tag,
} from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";
import { TModalType } from "./useModalReducer";

const formatPermission = (permission: string) => {
  switch (permission) {
    case "admin management":
      return "Admin User Management";
    case "vendor management":
      return "Vendor Management";
  }
};

const formatLabelSubject = (permission: string) => {
  switch (permission) {
    case "admin management":
      return "Admin User";
    case "vendor management":
      return "Vendor";
  }
};

const useGenerateColumnAdminRole = (
  onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
  onChangeStatus?: UseMutateFunction<
    IUpdateRoleResponseRoot,
    AxiosError<unknown, any>,
    {
      payload: IUpdateRolePayloadRoot;
      id: string;
      type: "delete" | "update";
    },
    unknown
  >
) => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "No.",
      dataIndex: "id",
      key: "index",
      render: (_, __, index) => <a>{index + 1}</a>,
    },
    {
      title: "Role",
      dataIndex: "name",
      key: "role",
      render: (text) => {
        return <a>{text}</a>;
      },
    },
    {
      title: "Feature Permission",
      dataIndex: "permissions",
      key: "feature_permission",
      render: (permissions) => (
        <div className="grid grid-rows-2 items-center h-[6rem]">
          {permissions.map(({ feature_permission }) => {
            return <div>{formatPermission(feature_permission)}</div>;
          })}
        </div>
      ),
    },
    {
      title: "Feature Access",
      dataIndex: "permissions",
      key: "feature_access",
      render: (permissions: IRolePermission[]) => (
        <div className="flex flex-col gap-2">
          {permissions.map(({ feature_access, feature_permission }) => {
            return (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#E60B6A",
                  },
                }}
              >
                <div className="grid grid-cols-2">
                  <Checkbox
                    checked={feature_access.includes("create")}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Create {formatLabelSubject(feature_permission)}
                    </span>
                  </Checkbox>
                  <Checkbox checked className="cursor-default">
                    <span className="text-black">
                      View {formatLabelSubject(feature_permission)}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={feature_access.includes("create")}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Update {formatLabelSubject(feature_permission)}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={feature_access.includes("create")}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Create {formatLabelSubject(feature_permission)}
                    </span>
                  </Checkbox>
                </div>
              </ConfigProvider>
            );
          })}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag className="capitalize" color={text === "active" ? "green" : "red"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: ({ id, status }) => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: "Edit",
                  key: "1",
                  onClick: () => onOpenModal!("edit", id),
                },
                {
                  label: status === "active" ? "Deactivate" : "Activate",
                  key: "3",
                  onClick: () =>
                    onChangeStatus!({
                      payload: {
                        status: status === "active" ? "inactive" : "active",
                      },
                      id,
                      type: "delete",
                    }),
                },
              ],
            }}
          >
            <Button className="bg-ny-primary-100 text-caption-1 text-ny-primary-500 hover:!bg-ny-primary-100 hover:!text-ny-primary-500">
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Row>
      ),
    },
  ];

  return { columns };
};

export default useGenerateColumnAdminRole;
