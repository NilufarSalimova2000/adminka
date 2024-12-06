import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleCategory } from "../category-list/service/query/useGetSingleCategory";
import { Tabs, TabsProps, message } from "antd";
import { RcFile } from "antd/es/upload";
import { FormCreate } from "../../components/form-create";
import { useEditCategory } from "../edit-category/service/useEditCategory";
// import { AttributeForm } from "../../components/atribute-form";

interface FormDatas {
    title: string;
    image?: { file: RcFile };
}

export const EditSubcategory = () => {
    const { id } = useParams();
    console.log(id);

    const { data: singleData, isLoading } = useGetSingleCategory(id);
    const { mutate } = useEditCategory();
    const navigate = useNavigate();
    const submit = (data: FormDatas) => {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.image) {
            formData.append("image", data.image.file);
        }

        mutate(
            { id, data: formData },
            {
                onSuccess: (data) => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app/subcategory");
                    console.log(data);

                },
                onError: (err) => {
                    message.error("Xatolik");
                    console.log(err);
                },
            }
        );
    }

    const onChange = (key: string) => {
        console.log(key);
      };
      
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Subcategory edit',
          children: <FormCreate submit={submit} data={singleData} />,
        },
        {
          key: '2',
          label: 'Attribute edit',
        //   children: <AttributeForm />
        },
      ];

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )

}