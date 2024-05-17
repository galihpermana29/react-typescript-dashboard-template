import {
  IUpdateUserPayloadRoot,
  IUpdateUserResponseRoot,
} from "@/shared/models/userServicesInterface";

import DraggerUpload from "@/shared/view/presentations/dragger-upload/DraggerUpload";
import { Button, DatePicker, Form, FormInstance, Input } from "antd";
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
  disable: boolean;
  id?: string;
  onChangePasswordClick: () => void;
}
const FormEdit = ({
  form,
  handleMutate,
  footer,
  disable,
  id,
  onChangePasswordClick,
}: IFormEdit) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({ payload: value, id: id!, type: "update" });
        }}
        disabled={disable}
      >
        <div className="flex gap-[20px]">
          <div className="w-full max-w-[187px] flex-1">
            <Form.Item noStyle name={"profile_image_uri"}>
              <DraggerUpload
                data={null}
                form={form}
                formItemName="profile_image_uri"
              />
            </Form.Item>
          </div>

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
            <div className="flex justify-end">
              <Button
                type="text"
                disabled={false}
                onClick={onChangePasswordClick}
                className="text-ny-primary-500"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormEdit;
