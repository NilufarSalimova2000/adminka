import { useNavigate, useParams } from "react-router-dom"
import { useEditCategory } from "./service/useEditCategory";
import { useGetSingleCategory } from "../category-list/service/query/useGetSingleCategory";
import { Tabs, TabsProps, message } from "antd";
import { FormCreate } from "../../components/form-create";

interface FormDatas {
    title: string;
    image?: { fileList: { originFileObj: File }[] };
}

export const EditCategory = () => {
    const { id } = useParams();
    console.log(id);

    const { data: singleData, isLoading } = useGetSingleCategory(id);
    const { mutate } = useEditCategory();
    const navigate = useNavigate();
    const submit = (data: FormDatas) => {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.image && data.image.fileList && data.image.fileList[0]) {
            const file = data.image.fileList[0].originFileObj; // Faylni olish
            formData.append("image", file); // Faylni formData ga qo'shish
        }

        mutate(
            { id, data: formData },
            {
                onSuccess: (data) => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app");
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
          label: 'Category edit',
          children: <FormCreate submit={submit} data={singleData} />,
        },
        {
          key: '2',
          label: 'Tab 2',
          children: 'Content of Tab Pane 2',
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