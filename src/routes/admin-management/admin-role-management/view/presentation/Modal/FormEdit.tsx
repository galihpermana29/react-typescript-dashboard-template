import {
  IAllRolesData,
  ICreateRoleResponseRoot,
  IUpdateRolePayloadRoot
} from "@/shared/models/roleServicesInterface";
import { Form, FormInstance, Input, Table } from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";
import useGenerateModalProps from "../../../usecase/useGenerateModalProps";

interface IFormEdit {
  form: FormInstance;
  handleMutate: UseMutateFunction<
    ICreateRoleResponseRoot,
    AxiosError,
    {
			payload: IUpdateRolePayloadRoot;
			id: string;
			type: 'delete' | 'update';
		},
    unknown
  >;
  footer: React.ReactNode;
	disable: boolean;
	id?: string;
  detail: IAllRolesData | undefined
}
const FormEdit = ({ form, handleMutate, footer, id, detail}: IFormEdit) => {
  const {columns, data, transformRoleData, handleRowSelection, parseFormValues} = useGenerateModalProps(form)

  const defaultValues = transformRoleData(detail)

  form.setFieldsValue(defaultValues)

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={(value) => {
					handleMutate!({ payload: parseFormValues(value), id: id!, type: 'update' });
				}}>
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

export default FormEdit;
