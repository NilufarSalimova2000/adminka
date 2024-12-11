import { useNavigate, useParams } from "react-router-dom"
import { message } from "antd";
import { ProductForm } from "../../components/product-form";
import { useGetSingleProduct } from "../product-list/service/query/useGetSingleProduct";
import { useEditProduct } from "../product-list/service/mutation/useEditProduct";

interface FormDatas {
    id: number;
    title: string;
    image?: { fileList: { originFileObj: File }[] };
    price: string;
    is_available?: boolean;
    category: number;
    is_new?: boolean;
}

export const EditProduct = () => {
    const { id } = useParams();
    console.log(id);

    const { data: singleData, isLoading } = useGetSingleProduct(id)
    const { mutate } = useEditProduct();
    const navigate = useNavigate();
    const submit = (data: FormDatas) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("is_available", data.is_available ? 'true' : 'false'); 
        formData.append("is_new", data.is_new ? 'true' : 'false');
        if (data.image && data.image.fileList && data.image.fileList[0]) {
            const file = data.image.fileList[0].originFileObj; // Faylni olish
            formData.append("image", file); // Faylni formData ga qo'shish
        }
        formData.append("category", String(data.category));

        mutate(
            { id, data: formData },
            {
                onSuccess: () => {
                    message.success("Muvaffaqiyatli o'zgartirildi");
                    navigate("/app/product");

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
            <ProductForm submit={submit} data={singleData} />
        </div>
    )

}