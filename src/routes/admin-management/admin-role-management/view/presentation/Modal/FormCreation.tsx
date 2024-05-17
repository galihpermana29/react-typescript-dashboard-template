import {
  ICreateRolePayloadRoot,
  ICreateRoleResponseRoot,
} from "@/shared/models/roleServicesInterface";
import {
  Checkbox,
  Form,
  FormInstance,
  Input,
  Table,
  TableColumnsType,
} from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";

interface IFormCreation {
  form: FormInstance<any>;
  handleMutate: UseMutateFunction<
    ICreateRoleResponseRoot,
    AxiosError<unknown, any>,
    ICreateRolePayloadRoot,
    unknown
  >;
  footer: React.ReactNode;
}

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

const columns: TableColumnsType<any> = [
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
      <Form.Item name={`feature_access${index}`} valuePropName="checked">
        <Checkbox.Group className="grid grid-cols-2" options={feature_access} />
      </Form.Item>
    ),
  },
];

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

const FormCreation = ({ form, handleMutate, footer }: IFormCreation) => {
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

  const handleFinish = (values: any) => {
    const permissions = data.map((item, index) => ({
      feature_permission: item.feature_permission,
      feature_access: values[`feature_access${index}`] || [],
    }));

    const formattedValues = {
      name: values.name,
      permissions,
    };

    handleMutate(formattedValues as ICreateRolePayloadRoot);
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="flex gap-[20px]">
          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={"name"}
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please input role name!",
                },
              ]}
            >
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>

            <div>
              <div className="flex items-center gap-[3px]">
                <div className="text-red-400/90 text-lg translate-y-1">*</div>{" "}
                Feature Permission
              </div>
              <p className="text-sm text-ny-gray-400">
                Select all permissions you'd like to assign to this role. Feel
                free to make multiple selections
              </p>
            </div>

            <Table
              pagination={false}
              rowSelection={{
                onChange: handleRowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormCreation;
