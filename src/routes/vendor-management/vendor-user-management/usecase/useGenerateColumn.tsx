import { TableProps, Tag } from "antd";

const useGenerateColumnVendorUser = () => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
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
      render: () => <div>adsads</div>,
    },
  ];

  return { columns };
};

export default useGenerateColumnVendorUser;
