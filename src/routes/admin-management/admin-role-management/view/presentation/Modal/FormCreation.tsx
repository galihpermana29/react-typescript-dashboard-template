import {
  ICreateRolePayloadRoot,
  ICreateRoleResponseRoot,
} from "@/shared/models/roleServicesInterface";
import {
  Form,
  FormInstance,
  Input,
  Table
} from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";
import useGenerateModalProps from "../../../usecase/useGenerateModalProps";

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

const FormCreation = ({ form, handleMutate, footer }: IFormCreation) => {

  const {columns, data, handleFinish, handleRowSelection} = useGenerateModalProps(form, handleMutate)

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
