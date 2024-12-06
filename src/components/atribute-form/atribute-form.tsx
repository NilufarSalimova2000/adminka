import { Button, Card, Form, Input, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface AttributeFormProps {
    onSubmit: (data: any) => void;
}

export const AttributeForm: React.FC<AttributeFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            onFinish={onSubmit}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            display: "flex",
                            rowGap: 16,
                            flexDirection: "column",
                        }}
                    >
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Item ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <Form.Item
                                    label="Title"
                                    name={[field.name, "name"]}
                                >
                                    <Input />
                                </Form.Item>

                                {/* Nest Form.List */}
                                <Form.Item label="Value">
                                    <Form.List name={[field.name, "list"]}>
                                        {(subFields, subOpt) => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: 16,
                                                }}
                                            >
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item
                                                            noStyle
                                                            name={[
                                                                subField.name,
                                                                "first",
                                                            ]}
                                                        >
                                                            <Input placeholder="first" />
                                                        </Form.Item>
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                subOpt.remove(
                                                                    subField.name
                                                                );
                                                            }}
                                                        />
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
                        <Button type="primary" htmlType="submit">Create</Button>
                    </div>
                )}
            </Form.List>
        </Form>
    );
};
