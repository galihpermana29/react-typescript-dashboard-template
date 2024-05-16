import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Row, Space, TableProps, Tag } from "antd";

const useGenerateColumnAdminRole = () => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Feature Permission",
      dataIndex: "feature_permission",
      key: "feature_permission",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Feature Access",
      dataIndex: "feature_access",
      key: "feature_access",
      render: (text) => <a className="capitalize">{text}</a>,
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
      render: () => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: "Edit",
                  key: "1",
                  onClick: () => {},
                },
                {
                  label: "View Detail",
                  key: "2",
                  onClick: () => {},
                },
                {
                  label: status === "active" ? "Deactivate" : "Activate",
                  key: "3",
                  onClick: () => {},
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
