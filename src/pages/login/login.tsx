import { Button, Form, Input, message } from "antd";
import { useCreateLogin } from "./mutation/useCreateLogin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

interface LoginData {
  phone_number: string;
  password: string;
}

export const Login: React.FC = () => {
  const { mutate } = useCreateLogin();
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginData>();

  const submit = (data: LoginData): void => {
    mutate(data, {
      onSuccess: (res: string) => {
        message.success("Muvaffaqiyatli o'tdingiz");
        Cookies.set("token", res);
        navigate("/app");
      },
      onError: (error: unknown) => {
        console.error(error);
      },
    });
    form.resetFields();
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
        navigate("/app", { replace: true });
    }
}, [navigate]);

  return (
    <div>
      <div className="login_block">
        <h1 className="login_title">Admin paneli</h1>
        <Form form={form} layout="vertical" name="login" onFinish={submit}>
          <Form.Item
            name="phone_number"
            label={"Phone number"}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button style={{width: "100%"}} size="large" type="primary" htmlType="submit">
            Kirish
          </Button>
        </Form>
      </div>
    </div>
  );
};