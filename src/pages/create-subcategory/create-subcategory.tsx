import { Form, Tabs, message } from "antd";
import { client } from "../../config/query-client";
import { useCreateSubcategory } from "../../pages/subcategory-list/service/mutation/useCreateSubcategory";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FormWithselect } from "../../components/form-withselect";

export const CreateSubcategory = () => {
    const { mutate: createSubcategory } = useCreateSubcategory();
    const [categoryForm] = Form.useForm();
    const [subcategoryForm] = Form.useForm();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = React.useState("1");
    const [isCategoryCreated, setIsCategoryCreated] = React.useState(false); 


    const submitSubCategory = (values: { title: string; image: { file: RcFile }; parent: string }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }
        formData.append("parent", values.parent);  // Kategoriya ID sini 'parent' sifatida uzatish

        createSubcategory(formData, {
            onSuccess: () => {
                client.invalidateQueries(["subcategory"]);
                message.success("Muvaffaqiyatli subcategory yaratildi");
                subcategoryForm.resetFields();
                navigate("/app/subcategory");
            },
            onError: () => {
                message.error("Subcategory yaratishda xatolik yuz berdi");
            },
        });
    };

    const onChange = (key: string) => {
        // Agar kategoriya yaratilmagan bo'lsa, 2-tabga o'tishiga ruxsat bermaslik
        if (key === "2" && !isCategoryCreated) {
            message.warning("Avval subcategory yarating");
            return;
        }
        setActiveKey(key);
    };

    const items = [
        {
            key: "1",
            label: "Create subcategory",
            children: <FormWithselect submit={submitSubCategory} form={categoryForm} />,
        },
        {
            key: "2",
            label: "tab2",
            
        },
    ];

    return (
        <div>
            <Tabs activeKey={activeKey} items={items} onChange={onChange} />
        </div>
    );
};
