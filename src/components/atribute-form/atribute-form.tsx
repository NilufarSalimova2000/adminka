import { Button, Card, Form, Input, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";

interface FormType {
    onSubmit: (data: any) => void;
    data?: { attributes: Value[] }; // To'g'ri struktura buni o'z ichiga oladi
    isLoading?: boolean;
}

interface Value {
    category?: number[];
    key?: number;
    id?: number;
    title: string;
    values: string[];
}

export const AttributeForm: React.FC<FormType> = ({ onSubmit, data, isLoading }) => {
    const [form] = Form.useForm();

    // Ma'lumotlarni to'g'ri formatlash
    const initialValue = {
        items: data?.attributes?.map((item: Value) => ({
            name: item.title,
            list: item.values.map((val) => ({ first: val.value || val }))
        })),
    };

    useEffect(() => {
        if (data && !isLoading) {
            form.setFieldsValue(initialValue);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            onFinish={onSubmit}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Item ${field.name + 1}`}
                                key={field.key}
                                extra={<CloseOutlined onClick={() => remove(field.name)} />}
                            >
                                <Form.Item
                                    label="Title"
                                    name={[field.name, "name"]}
                                    rules={[{ required: true, message: "Please input title!" }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Value">
                                    <Form.List name={[field.name, "list"]}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item
                                                            noStyle
                                                            name={[subField.name, "first"]}
                                                            rules={[{ required: true, message: "Please input value!" }]}
                                                        >
                                                            <Input placeholder="Value" />
                                                        </Form.Item>
                                                        <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                                    </Space>
                                                ))}
                                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                                    + Add Sub Item
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Card>
                        ))}
                        <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </div>
                )}
            </Form.List>
        </Form>
    );
};

