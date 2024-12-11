import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useGetCategory } from "../../pages/category-list/service/query/useGetCategory";
import { DataType } from "../../pages/subcategory-list";

interface FormType {
    submit?: (values: any) => void;
    data?: object;
    form?: any;
}
export const FormWithselect: React.FC<FormType> = ({ data, submit, form }) => {
    const { data: parent } = useGetCategory();
    return (
        <div style={{ maxWidth: "500px" }}>
            <Form initialValues={{ ...data }} form={form} layout="vertical" name="creat" onFinish={submit} >
                <Form.Item
                    label={"Parent"}
                    name={"parent"}
                    rules={[{ required: true, message: "title kiriting" }]}
                >
                    <Select>
                        {parent?.results?.map((item: DataType | any) => (
                            <Select.Option key={item.id} >{item.title}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name={"title"} label={"Subcategory name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"image"} valuePropName="file" label={"Image"}>
                    <Upload
                        listType="picture-card"
                        accept="image"
                        beforeUpload={() => false}
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