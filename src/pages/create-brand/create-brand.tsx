import React from "react";
import { RcFile } from "antd/es/upload";
import { client } from "../../config/query-client";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateBrand } from "../brand-list/service/mutation/useCreateBrand";
import { FormCreate } from "../../components/form-create";

export const CreateBrand:React.FC = () => {
    const {mutate} = useCreateBrand()
    const [brandForm] = Form.useForm();
    const navigate = useNavigate();

    const submit = (values: { title: string; image: { file: RcFile }}) => {
        const formData = new FormData();
        formData.append("title", values.title);
        if (values.image) {
            formData.append("image", values.image.file);
        }

       mutate(formData, {
            onSuccess: () => {
                client.invalidateQueries(["brand"]);
                message.success("Muvaffaqiyatli brand yaratildi");
                navigate("/app/brand")
            },
            onError: () => {
                message.error("Brand yaratishda xatolik yuz berdi");
            },
        });
    };

    return (
        <div>
            <FormCreate submit={submit} form={brandForm} />
        </div>
    )
}