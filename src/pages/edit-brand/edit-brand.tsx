import { useNavigate, useParams } from "react-router-dom"
import { message } from "antd";
import { useGetSingleBrand } from "../brand-list/service/query/useGetSingleBrand";
import { FormCreate } from "../../components/form-create";
import { useEditBrand } from "../brand-list/service/mutation/useEditBrand";

interface FormDatas {
    title: string;
    image?: { fileList: { originFileObj: File }[] };
}

export const EditBrand = () => {
    const { id } = useParams();
    console.log(id);

    const { data: singleData, isLoading } = useGetSingleBrand(id)
    const { mutate } = useEditBrand();
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
                onSuccess: () => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app/brand");

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
            <FormCreate submit={submit} data={singleData} />
        </div>
    )

}