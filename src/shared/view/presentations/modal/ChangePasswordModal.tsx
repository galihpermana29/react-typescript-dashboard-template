import {
  IUpdateUserPayloadRoot,
  IUpdateUserResponseRoot,
} from "@/shared/models/userServicesInterface";

import { Form, FormInstance, Input } from "antd";
import { AxiosError } from "axios";
import { UseMutateFunction } from "react-query";

interface IFormEdit {
  form: FormInstance<any>;
  handleMutate?: UseMutateFunction<
    IUpdateUserResponseRoot,
    AxiosError<unknown, any>,
    {
      payload: IUpdateUserPayloadRoot;
      id: string;
      type: "delete" | "update";
    },
    unknown
  >;
  footer: React.ReactNode;
  id?: string;
}
const FormChangePassword = ({ form, handleMutate, footer, id }: IFormEdit) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({ payload: value, id: id!, type: "update" });
        }}
      >
        <div className="flex-1">
          <Form.Item
            className="my-[8px]"
            name={"new_password"}
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input a new password!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Enter new password"
              className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={"password_confirmation"}
            label="Re-enter Password"
            rules={[
              {
                required: true,
                message: "Please re-type your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("New password does not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              type="password"
              placeholder="Re-enter new password"
              className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
            />
          </Form.Item>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormChangePassword;
