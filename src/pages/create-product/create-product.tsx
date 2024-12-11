import React from "react";
import { RcFile } from "antd/es/upload";
import { client } from "../../config/query-client";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../product-list/service/mutation/useCreateProduct";
import { ProductForm } from "../../components/product-form";


export const CreateProduct:React.FC = () => {
    const {mutate} = useCreateProduct();
    const [productForm] = Form.useForm();
    const navigate = useNavigate();

    
    const submit = (values: { title: string; price: string; is_available: boolean; is_new: boolean; image: { file: RcFile }; category: number}) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("price", values.price);
        formData.append("is_available", values.is_available ? 'true' : 'false'); 
        formData.append("is_new", values.is_new ? 'true' : 'false'); 
        if (values.image) {
            formData.append("image", values.image.file);
        }
        formData.append("category", String(values.category)); 

       mutate(formData, {
            onSuccess: (res) => {
                client.invalidateQueries(["product"]);
                message.success("Muvaffaqiyatli product yaratildi");
                if (res?.data?.id) {
                    
                }
                navigate("/app/product")

                
            },
            onError: () => {
                message.error("Product yaratishda xatolik yuz berdi");
            },
        });
    };

    return (
        <div>
            <ProductForm submit={submit} form={productForm} />
        </div>
    )
}