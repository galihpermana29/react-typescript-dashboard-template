import {
  IRolePermission,
  IUpdateRolePayloadRoot,
  IUpdateRoleResponseRoot,
} from "@/shared/models/roleServicesInterface";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Row,
  Space,
  TableProps,
  Tag
} from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";
import { TModalType } from "./useModalReducer";

const formatLabelSubject = (permission: string) => {
  switch (permission) {
    case "admin management":
      return "Admin User";
    case "vendor management":
      return "Vendor";
    case "vendor content":
      return "Vendor Content";
  }
};

const permissionList = [
  {
    label: "Admin User Management",
    value: 'admin management'
  },
  {
    label: "Vendor Management",
    value: 'vendor management'
  },
  {
    label: "Vendor Content",
    value: 'vendor content'
  },
]

const useGenerateColumnAdminRole = (
  onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
  onChangeStatus?: UseMutateFunction<
    IUpdateRoleResponseRoot,
    AxiosError,
    {
      payload: IUpdateRolePayloadRoot;
      id: string;
      type: "delete" | "update";
    },
    unknown
  >
) => {
  const columns: TableProps["columns"] = [
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

      render: () => (
        <div className="grid grid-rows-3 items-stretch h-max">
          {permissionList?.map(({ label }, idx) => {
            return <div key={idx}>{label}</div>;
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
          {permissionList?.map(({value}, idx) => {

            let index = -1

            for (let i = 0; i < permissions?.length; i++) {
                if (permissions[i]?.feature_permission.includes(value)) {
                    index = i
                }
            }

            return (
                <div className="grid grid-cols-2" key={idx}>
                  <Checkbox
                    checked={permissions?.[index]?.feature_access.includes('create') ?? false}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Create {formatLabelSubject(value)}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.[index]?.feature_access.includes('view') ?? false}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      View {formatLabelSubject(value)}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.[index]?.feature_access.includes('update') ?? false}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Update {formatLabelSubject(value)}
                    </span>
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.[index]?.feature_access.includes('delete') ?? false}
                    className="cursor-default"
                  >
                    <span className="text-black">
                      Delete {formatLabelSubject(value)}
                    </span>
                  </Checkbox>
                </div>
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
                  key: "2",

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
