import { Button, Form, Input, Select, Switch } from "antd";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useGetProducts } from "../../pages/product-list/service/query/useGetProducts";
import { useParams } from "react-router-dom";
import { useGetSingleCategory } from "../../pages/category-list/service/query/useGetSingleCategory";

interface FormType {
    submit?: (values: any) => void;
    data?: object;
    form?: any;
}

// interface Type {
//     key: number;
//     id: number;
//     title: string;
//     price: string;
//     attribute_value: any
// }


export const ProductVariantsForm: React.FC<FormType> = ({ data, form, submit }) => {

    const [editorState, setEditorState] = useState<string>(""); // ReactQuill uchun state ni string qilib o'zgartirdik

    const handleEditorChange = (value: string) => {
        setEditorState(value); // ReactQuill HTML yoki oddiy matnni qaytaradi
    };

    const { id } = useParams();
  
    const { data: hero } = useGetProducts();
    const { Option } = Select;
    const heroCategory = hero?.results.find(
        (item: any) => item.id === Number(id)
    )?.category;

    const { data: singleData } = useGetSingleCategory(heroCategory);

    return (
        <div style={{ maxWidth: "500px" }}>
            <Form
                initialValues={{ ...data }}
                form={form}
                layout="vertical"
                name="create"
                onFinish={submit} 
            >
                <Form.Item
                    label={"Attribute values"}
                    name={"attribute_value"}
                    rules={[{ required: true, message: "Attribute kiriting" }]}
                >
                    {/* <Select mode="multiple">
                        {singleData?.results?.map((item: Type | any) => (
                            <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                        ))}
                    </Select> */}
                    <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Attributes"
              optionLabelProp="label"
            >
              {singleData?.attributes?.map((item: any) => (
                <React.Fragment key={item.id}>
                  <Option key={item.id} disabled>
                    {item.title}
                  </Option>
                  {item.values.map((item2: any) => (
                    <Option
                      value={item2.id.toString()}
                      label={item2.value}
                      key={item2.id}
                    >
                      {item2.value}
                    </Option>
                  ))}
                </React.Fragment>
              ))}
            </Select>
                </Form.Item>
                <Form.Item name={"quantity"} label={"Quantity"} rules={[{ required: true, message: 'Please quantity!' }]}>
                    <Input />
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
                <Form.Item name={"title"} label={"Title"} rules={[{ required: true, message: 'Please title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"price"} label={"Price"} rules={[{ required: true, message: 'Please input your price!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="other_detail"
                    label="Description"
                    rules={[{ required: true, message: "Please provide a description!" }]}
                >
                    <ReactQuill
                        value={editorState}
                        onChange={handleEditorChange}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ "header": [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline'],
                                ['link'],
                            ],
                        }}
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit">Create</Button>
            </Form>
        </div>
    )
};
