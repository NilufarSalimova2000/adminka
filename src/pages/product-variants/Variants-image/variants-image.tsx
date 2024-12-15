import React from "react";
import { useCreateImage } from "./service/mutation/useCreateImage";
import { Button, Form, message } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

interface FormType {
    data?: { image?: string; product_variant?: number };
    form?: any;
}

export const VariantsImage: React.FC<FormType> = ({ data, form }) => {
    const { mutate } = useCreateImage();
    const navigate = useNavigate();
    const { id } = useParams();

    const submit = (values: { product_variant: number; image: RcFile }) => {
        const formData = new FormData();
        formData.append("product_variant", String(id)); // Faqat product_variant
        if (values.image) {
            formData.append("image", values.image); // Faylni jo'natish
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Muvaffaqiyatli image yaratildi");
                navigate("/app/product");
            },
            onError: (error) => {
                message.error("Image yaratishda xatolik yuz berdi");
                console.error("Error:", error);
            },
        });
    };

    return (
        <div style={{ maxWidth: "500px" }}>
            <Form
                initialValues={{ ...data }}
                form={form}
                layout="vertical"
                name="create"
                onFinish={(values) => {
                    const file = values.image?.fileList?.[0]?.originFileObj;
                    submit({ ...values, image: file }); // Fayl obyektini jo‘natish
                }}
            >
                <Form.Item
                    name="image"
                    label="Image"
                    rules={[{ required: true, message: "Rasm yuklang" }]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false} // Fayl yuklashni oldini olish
                    >
                        <Button type="primary" icon={<UploadOutlined />}>
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
