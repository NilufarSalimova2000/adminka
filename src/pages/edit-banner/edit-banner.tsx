import { useNavigate, useParams } from "react-router-dom"
import { message } from "antd";
import { useGetSingleBanner } from "../banner-list/service/query/useGetSingleBanner";
import { useEditBanner } from "../banner-list/service/mutation/useEditBanner";
import { BannerForm } from "../../components/banner-form/banner-form";

interface FormDatas {
    title: string;
    description: string;
    image?: { fileList: { originFileObj: File }[] };
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
        if (data.image && data.image.fileList && data.image.fileList[0]) {
            const file = data.image.fileList[0].originFileObj; // Faylni olish
            formData.append("image", file); // Faylni formData ga qo'shish
        }

        mutate(
            { id, data: formData },
            {
                onSuccess: () => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app/banner");

                },
                onError: (err) => {
                    message.error("Xatolik");
                    console.log(err);
                },
            }
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <BannerForm submit={submit} data={singleData} />
        </div>
    )

}