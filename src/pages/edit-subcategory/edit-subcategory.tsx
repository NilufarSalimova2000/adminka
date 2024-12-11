import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleCategory } from "../category-list/service/query/useGetSingleCategory";
import { Tabs, TabsProps, message } from "antd";
import { FormCreate } from "../../components/form-create";
import { useEditCategory } from "../edit-category/service/useEditCategory";
import { useEditAttribute } from "../../components/attribute/service/mutation/useEditAttribute";
import { AttributeForm } from "../../components/atribute-form";

interface FormData {
    title: string;
    image?: { fileList: { originFileObj: File }[] };
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

export const EditSubcategory = () => {
    const { id } = useParams();
    const { data: singleData, isLoading } = useGetSingleCategory(id);
    const { mutate } = useEditCategory();
    const { mutate: attributeEdit } = useEditAttribute();
    const navigate = useNavigate();

    const submitSub = (data: FormData) => {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.image && data.image.fileList && data.image.fileList[0]) {
          const file = data.image.fileList[0].originFileObj; // Faylni olish
          formData.append("image", file); // Faylni formData ga qo'shish
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


    const AttributeId = singleData?.attributes?.map(
        (item: number | any) => item.id
      );
      const valueId = singleData?.attributes?.map((item: number | any) =>
        item.values.map((subItem: any) => subItem.id)
      );
      const submitAttribute = (values: AttributeValuesType) => {
        const processedAttributes = [
          ...values?.attributes?.map(
            (item: AttributeValuesType, index: number) => ({
              attribute_id: AttributeId[index] ?? null,
              title: item.title,
              values: item.values?.map((subItem, subIndex) => ({
                value: subItem.value,
                value_id: valueId[index]?.[subIndex] ?? null,
              })),
            })
          ),
        ];
        attributeEdit(
          { attributes: processedAttributes, category_id: Number(id) },
          {
            onSuccess: () => {
              message.success("Attributes updated successfully!");
              navigate("/app/subcategory");
            },
            onError: (err) => {
              message.error("Failed to update attributes!");
              console.error( err);
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
            children: <AttributeForm submit={submitAttribute} data={singleData} isLoading={isLoading} />
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
