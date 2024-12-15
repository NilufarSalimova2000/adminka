import { Form, Tabs, message } from "antd";
import { client } from "../../config/query-client";
import { useCreateSubcategory } from "../../pages/subcategory-list/service/mutation/useCreateSubcategory";
import React from "react";
import { FormWithselect } from "../../components/form-withselect";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { useCreateAttribute } from "../../components/attribute/service/mutation/useCreateAttribute";
import { AttributeForm } from "../../components/atribute-form";

interface AttributeValue {
    category?: number[];
    key?: number;
    id?: number;
    title: string;
    values: string[];
}

interface AttributeValuesType {
    title?: string;
    values?: {
        value?: string;
        value_id?: number;
    }[];
    category_id?: number;
    attribute_id?: number;
    attributes?: string[] | any;
}

export const CreateSubcategory = () => {
    const { mutate: createSubcategory } = useCreateSubcategory();
    const { mutate: createAttribute } = useCreateAttribute();
    const [categoryForm] = Form.useForm();
    const [activeKey, setActiveKey] = React.useState("1");
    const [subcategoryId, setSubcategoryId] = React.useState<number>(0);
    const [isCategoryCreated, setIsCategoryCreated] = React.useState(false);
    const navigate = useNavigate()

    const submitSubCategory = (values: { title: string; image: { file: RcFile }; parent: number }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }
        formData.append("parent", String(values.parent));

        createSubcategory(formData, {
            onSuccess: (res) => {
                setSubcategoryId(res.data.id);
                setIsCategoryCreated(true);
                client.invalidateQueries(["subcategory"]);
                message.success("Muvaffaqiyatli subcategory yaratildi");
                setActiveKey("2");
            },
            onError: () => {
                message.error("Subcategory yaratishda xatolik yuz berdi");
            },
        });
    };


    const submitAttribute = (data: AttributeValuesType) => {
        const formattedData = {
            attr_list: data?.attributes?.map((item: AttributeValue) => ({
                category: [subcategoryId],
                title: item?.title,
                values:
                    item?.values?.map(
                        (value: string | undefined | any) => value?.value
                    ) || [],
            })),
        };

        createAttribute(formattedData, {
            onSuccess: () => {
                message.success("Muvaffaqiyatli attribute yaratildi");
                navigate("/app/subcategory");
            },
            onError: (err) => {
                console.log(err);
                message.error("Attribute yaratishda xatolik yuz berdi");
            },
        });
    };

    const onChange = (key: string) => {
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
            label: "Attribute",
            children: <AttributeForm submit={submitAttribute} />,
        },
    ];

    return <Tabs activeKey={activeKey} items={items} onChange={onChange} />;
};
