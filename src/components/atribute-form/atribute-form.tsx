import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

interface AttrValue {
    category?: number[];
    key?: number;
    id?: number;
    title: string;
    values: string[];
}

interface FormDataType {
    submit?: (values: any) => void;
    data?: object | any;
    formForCreate?: any;
    isLoading?: boolean;
    defaultFileList?: any;
}

export const AttributeForm: React.FC<FormDataType> = ({
    submit,
    data,
    isLoading,
}) => {
    const [form] = Form.useForm();
    const initialData = {
        attributes: data?.attributes?.map((item: AttrValue) => ({
            title: item.title,
            values: item.values || [],
        })),
    };
    return (
        <>
            {!isLoading && (
                <Form
                    onFinish={submit}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    initialValues={initialData}
                    autoComplete="off"
                >
                    <Form.List name="attributes">
                        {(fields, { add, remove }) => (
                            <div
                                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
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
                                        <Form.Item label="Name" name={[field.name, "title"]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="attributes">
                                            <Form.List name={[field.name, "values"]}>
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
                                                                    name={[subField.name, "value"]}
                                                                >
                                                                    <Input placeholder="add attribute" />
                                                                </Form.Item>
                                                                <CloseOutlined
                                                                    onClick={() => {
                                                                        subOpt.remove(subField.name);
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
                            </div>
                        )}
                    </Form.List>
                    <div>
                        <Form.Item style={{ marginTop: "30px" }}>
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item>
                    </div>
                </Form>
            )}
        </>
    );
};
