import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface FormType {
    submit?: (values: any) => void;
    data?: object;
    form?: any;
  }
export const FormCreate:React.FC<FormType> = ({ data, submit, form }) => {

    return (
        <div style={{maxWidth: "500px"}}>
            <Form initialValues={{ ...data }} form={form} layout="vertical" name="creat" onFinish={submit} >
                <Form.Item name={"title"} label={"Category name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"image"}  valuePropName="file" label={"Image"}>
                    <Upload
                        listType="picture"
                        accept="image"
                        beforeUpload={() => false}
                    >
                        <Button type="primary" icon={<UploadOutlined />}>
                            Upload 
                        </Button>
                    </Upload>
                </Form.Item>
                <Button type="primary" htmlType="submit">Create</Button>
            </Form>
        </div>
    )
}