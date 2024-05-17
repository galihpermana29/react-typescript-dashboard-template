import { TableProps, Tag } from "antd";

const useGenerateColumnVendorProduct = () => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (text) => <a className="capitalize">{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <Tag className="capitalize" color={text === "active" ? "green" : "red"}>
          {text}
        </Tag>
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
      render: () => <div>adsads</div>,
    },
  ];

  return { columns };
};

export default useGenerateColumnVendorProduct;
