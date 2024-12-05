import { Button, Card, Form, Input, Space } from "antd";

interface AttributeFormProps {
    onSubmit: (data: any) => void;
}

export const AttributeForm: React.FC<AttributeFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
        >
            <Form.List name="items">
                {(fields, { add }) => (
                    <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                        {fields.map((field) => (
                            <Card size="small" title={`Item ${field.name + 1}`} key={field.key}>
                                <Form.Item label="Name" name={[field.name, "name"]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="List">
                                    <Form.List name={[field.name, "list"]}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item noStyle name={[subField.name, "first"]}>
                                                            <Input placeholder="first" />
                                                        </Form.Item>
                                                    </Space>
                                                ))}
                                                <Button
                                                    type="dashed"
                                                    onClick={() => subOpt.add()}
                                                    block
                                                >
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
