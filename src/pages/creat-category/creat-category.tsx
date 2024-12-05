import { Form, Tabs, message } from "antd";
import { FormCreate } from "../../components/form-create";
import { client } from "../../config/query-client";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { useCreateSubcategory } from "../../pages/subcategory-list/service/mutation/useCreateSubcategory";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import React from "react";

export const CreateCategory = () => {
    const { mutate: createCategory } = useCreateCategory();
    const { mutate: createSubcategory } = useCreateSubcategory();
    const [categoryForm] = Form.useForm();
    const [subcategoryForm] = Form.useForm();
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = React.useState("1");
    const [categoryId, setCategoryId] = React.useState<string | null>(null);
    const [isCategoryCreated, setIsCategoryCreated] = React.useState(false); 

    // Kategoriya yaratish
    const submitCategory = (values: { title: string; image: { file: RcFile }}) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }

        createCategory(formData, {
            onSuccess: (data) => {
                client.invalidateQueries(["category"]);
                message.success("Muvaffaqiyatli kategoriya yaratildi");
                setCategoryId(data.id);  // Kategoriya ID sini saqlash
                setIsCategoryCreated(true); // Kategoriya yaratildi deb belgilash
                setActiveKey("2");  // Subcategory tabiga o'tish
                categoryForm.resetFields();
            },
            onError: () => {
                message.error("Kategoriya yaratishda xatolik yuz berdi");
            },
        });
    };

    // Subcategory yaratish
    const submitSubCategory = (values: { title: string; image: { file: RcFile }; parent: string }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }
        formData.append("parent", categoryId!);  // Kategoriya ID sini 'parent' sifatida uzatish

        createSubcategory(formData, {
            onSuccess: () => {
                client.invalidateQueries(["subcategory"]);
                message.success("Muvaffaqiyatli subcategory yaratildi");
                subcategoryForm.resetFields();
                navigate("/app");
            },
            onError: () => {
                message.error("Subcategory yaratishda xatolik yuz berdi");
            },
        });
    };

    const onChange = (key: string) => {
        // Agar kategoriya yaratilmagan bo'lsa, 2-tabga o'tishiga ruxsat bermaslik
        if (key === "2" && !isCategoryCreated) {
            message.warning("Avval kategoriya yarating");
            return;
        }
        setActiveKey(key);
    };

    const items = [
        {
            key: "1",
            label: "Create Category",
            children: <FormCreate submit={submitCategory} form={categoryForm} />,
        },
        {
            key: "2",
            label: "Create Subcategory",
            children: <FormCreate submit={submitSubCategory} form={subcategoryForm} />,
        },
    ];

    return (
        <div>
            <Tabs activeKey={activeKey} items={items} onChange={onChange} />
        </div>
    );
};
