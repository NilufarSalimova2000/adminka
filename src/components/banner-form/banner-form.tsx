import { Button, Form, Input, Upload, UploadFile } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface FormType {
    submit?: (values: any) => void;
    data?: { title?: string; image?: string; description: string, id: string };
    form?: any;
}
export const BannerForm: React.FC<FormType> = ({ data, submit, form }) => {
    const defaultFileList: UploadFile[] = data?.image
        ? [
            {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: data.image,
            },
        ]
        : [];

    return (
        <div style={{ maxWidth: "500px" }}>
            <Form initialValues={{ ...data }} form={form} layout="vertical" name="creat" onFinish={submit} >
                <Form.Item name={"title"} label={"Tile"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"description"} label={"Description"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"image"} valuePropName="file" label={"Image"} rules={[{ required: true, message: 'Ramm yuklang' }]}>
                    <Upload
                        listType="picture-card"
                        accept="image"
                        beforeUpload={() => false}
                        defaultFileList={defaultFileList}
                        maxCount={1}
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