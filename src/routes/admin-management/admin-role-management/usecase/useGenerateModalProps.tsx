import { Checkbox, Form, FormInstance, TableColumnsType } from "antd";

const formatPermission = (permission: string) => {
  switch (permission) {
    case "admin management":
      return "Admin User Management";
    case "vendor management":
      return "Vendor Management";
    case "vendor content":
      return "Vendor Content";
  }
};

function transformRoleData(input) {
  const output = { name: input.name };

  input.permissions.forEach((permission, index) => {
    output[`feature_access${index}`] = permission.feature_access;
  });

  return output;
}

const data = [
  {
    key: "1",
    feature_permission: "admin management",
    feature_access: [
      {
        label: "Create Admin user",
        value: "create",
      },
      {
        label: "View Admin user",
        value: "view",
      },
      {
        label: "Update Admin user",
        value: "update",
      },
      {
        label: "Delete Admin user",
        value: "delete",
      },
    ],
  },
  {
    key: "2",
    feature_permission: "vendor management",
    feature_access: [
      {
        label: "Create Vendor",
        value: "create",
      },
      {
        label: "View Vendor",
        value: "view",
      },
      {
        label: "Update Vendor",
        value: "update",
      },
      {
        label: "Delete Vendor",
        value: "delete",
      },
    ],
  },
];


const useGenerateModalProps = (
  form: FormInstance,
) => {
    const columns: TableColumnsType = [
  {
    title: "Access Permission",
    dataIndex: "feature_permission",
    render: (feature_permission) => (
      <a>{formatPermission(feature_permission)} (P1)</a>
    ),
  },
  {
    title: "Feature Permission",
    dataIndex: "feature_access",
    render: (feature_access, _, index) => (
      <Form.Item name={`feature_access${index}`} valuePropName="value">
        <Checkbox.Group className="grid grid-cols-2" options={feature_access}   />
      </Form.Item>
    ),
  },
  ]

    const handleRowSelection = (_, selectedRows: any[]) => {
    const allPermissions = ["create", "view", "update", "delete"];

    data.forEach((_, index) => {
      form.setFieldValue(`feature_access${index}`, []);
    });

    selectedRows.forEach((row) => {
      const rowIndex = data.findIndex((item) => item.key === row.key);
      if (rowIndex !== -1) {
        form.setFieldValue(`feature_access${rowIndex}`, allPermissions);
      }                                               
    });

  };

  const parseFormValues = (values) => {
    const permissions = data.map((item, index) => ({
      feature_permission: item.feature_permission,
      feature_access: values[`feature_access${index}`] || [],
    }));

    return {
      name: values.name,
      permissions,
    };
  }

  return {columns, data, parseFormValues, handleRowSelection, transformRoleData}
}

export default useGenerateModalProps