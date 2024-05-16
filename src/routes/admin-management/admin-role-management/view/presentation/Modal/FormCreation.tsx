import {
  ICreateRolePayloadRoot,
  ICreateRoleResponseRoot,
} from "@/shared/models/roleServicesInterface";
import { DatePicker, Form, FormInstance, Input } from "antd";
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
const FormCreation = ({ form, handleMutate, footer }: IFormCreation) => {
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleMutate}>
        <div className="flex gap-[20px]">
          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={"email"}
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid email",
                },
              ]}
            >
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={"name"}
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={"password"}
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={"date_of_birth"}
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
              ]}
            >
              <DatePicker
                placeholder="Enter your detail here"
                className="w-full h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormCreation;
