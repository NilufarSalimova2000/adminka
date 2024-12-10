import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleCategory } from "../category-list/service/query/useGetSingleCategory";
import { Tabs, TabsProps, message } from "antd";
import { RcFile } from "antd/es/upload";
import { FormCreate } from "../../components/form-create";
import { useEditCategory } from "../edit-category/service/useEditCategory";
import { useEditAttribute } from "../../components/attribute/service/mutation/useEditAttribute";
import { AttributeForm } from "../../components/atribute-form";

interface FormData {
    title: string;
    image?: { file: RcFile };
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

// interface AttributeValuesType {
//     title?: string;
//     values?: {
//       value?: string;
//       value_id?: number;
//     }[];
//     category_id?: number;
//     attribute_id?: number;
//     attributes?: string[] | any;
//   }

export const EditSubcategory = () => {
    const { id } = useParams();
    const { data: singleData, isLoading } = useGetSingleCategory(id);
    const { mutate } = useEditCategory();
    const { mutate: attributeEdit } = useEditAttribute();
    const navigate = useNavigate();

    const submitSub = (data: FormData) => {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.image) {
            formData.append("image", data.image.file);
        }

        mutate({ id, data: formData }, {
            onSuccess: () => {
                message.success("Muvaffaqiyatli o'zgartirildi");
            },
            onError: (err) => {
                message.error("Xatolik");
                console.error(err);
            },
        });
    }

    const AttributeId = singleData?.attributes?.map((item: any) => item.id);
    const valueId = singleData?.attributes?.map((item: any) =>
        item.values.map((subItem: any) => subItem.id)
    );

    const submitAttribute = (values: any) => {

        const processedAttributes = Array.isArray(values?.attributes)
            ? values.attributes.map((item: AttributeValuesType, index: number) => ({
                attribute_id: AttributeId?.[index] ?? null, // Tekshirish qo'shildi
                title: item?.title ?? '', // Default qiymat
                values: Array.isArray(item?.values) // Null yoki undefined emasligini tekshiramiz
                    ? item.values.map((subItem, subIndex) => ({
                        value: subItem?.value ?? '', // Default qiymat
                        value_id: valueId?.[index]?.[subIndex] ?? null, // Tekshirish qo'shildi
                    }))
                    : [] // Agar item.values bo'sh bo'lsa, bo'sh massiv qaytariladi
            }))
            : [];

        attributeEdit(
            { attributes: processedAttributes, category_id: Number(id) },
            {
                onSuccess: () => {
                    message.success("Attribute muvaffaqiyatli o'zgartirildi");
                    navigate("/app/subcategory");
                },
                onError: (err) => {
                    message.error("Xatolik");
                    console.error(err);
                },
            }
        );
    };


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Subcategory edit',
            children: <FormCreate submit={submitSub} data={singleData} />,
        },
        {
            key: '2',
            label: 'Attribute edit',
            children: <AttributeForm onSubmit={submitAttribute} data={singleData} isLoading={isLoading} />
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}
