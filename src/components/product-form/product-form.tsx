import { Button, Form, Input, Select, Switch, Upload, UploadFile } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useGetSubcategory } from "../../pages/subcategory-list/service/query/useGetSubcategory";


interface FormType {
    submit?: (values: any) => void;
    data?: { title?: string; image?: string;};
    form?: any;
}

interface Type {
    key: number;
    id: number;
    image: string;
    title: string;
    price: string;
}

export const ProductForm: React.FC<FormType> = ({ data, submit, form }) => {
    const defaultFileList: UploadFile[] = data?.image
        ? [
            {
                uid: "-1",
                status: "done",
                url: data.image,
            },
        ]
        : [];

    const { data: category } = useGetSubcategory();
    return (
        <div style={{ maxWidth: "500px" }}>
            <Form initialValues={{ ...data }} form={form} layout="vertical" name="creat" onFinish={submit} >
                <Form.Item
                    label={"Subcategory"}
                    name={"category"}
                    rules={[{ required: true, message: "title kiriting" }]}
                >
                    <Select>
                        {category?.results?.map((item: Type | any) => (
                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Form.Item label="Is New" name="is_new" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Is Available"
                        name="is_available"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                </div>
                <Form.Item name={"title"} label={"Name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"price"} label={"Price"} rules={[{ required: true, message: 'Please input your price!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"image"} valuePropName="file" label={"Image"}>
                    <Upload
                        listType="picture-card"
                        accept="image"
                        beforeUpload={() => false}
                        maxCount={1}
                        defaultFileList={defaultFileList}
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