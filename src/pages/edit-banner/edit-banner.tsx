import { useNavigate, useParams } from "react-router-dom"
import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { useGetSingleBanner } from "../banner-list/service/query/useGetSingleBanner";
import { useEditBanner } from "../banner-list/service/mutation/useEditBanner";
import { BannerForm } from "../../components/banner-form/banner-form";

interface FormDatas {
    title: string;
    description: string;
    image?: { file: RcFile };
}

export const EditBanner = () => {
    const { id } = useParams();
    console.log(id);

    const { data: singleData, isLoading } = useGetSingleBanner(id)
    const { mutate } = useEditBanner();
    const navigate = useNavigate();
    const submit = (data: FormDatas) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.image) {
            formData.append("image", data.image.file);
        }

        mutate(
            { id, data: formData },
            {
                onSuccess: (data) => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app/banner");
                    console.log(data);

                },
                onError: (err) => {
                    message.error("Xatolik");
                    console.log(err);
                },
            }
        );
    }

    // const onChange = (key: string) => {
    //     console.log(key);
    //   };
      
    //   const items: TabsProps['items'] = [
    //     {
    //       key: '1',
    //       label: 'Category edit',
    //       children: <FormCreate submit={submit} data={singleData} />,
    //     },
    //     {
    //       key: '2',
    //       label: 'Tab 2',
    //       children: 'Content of Tab Pane 2',
    //     },
    //   ];

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <BannerForm submit={submit} data={singleData} />
        </div>
    )

}