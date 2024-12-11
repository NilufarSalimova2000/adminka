import React from "react";
import { useCreateBanner } from "../banner-list/service/mutation/useCreateBanner";
import { RcFile } from "antd/es/upload";
import { client } from "../../config/query-client";
import { Form, message } from "antd";
import { BannerForm } from "../../components/banner-form/banner-form";
import { useNavigate } from "react-router-dom";

export const CreateBanner:React.FC = () => {
    const {mutate} = useCreateBanner();
    const [bannerForm] = Form.useForm();
    const navigate = useNavigate();

    const submit = (values: { title: string; description: string; image: { file: RcFile }}) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        if (values.image) {
            formData.append("image", values.image.file);
        }

       mutate(formData, {
            onSuccess: () => {
                client.invalidateQueries(["banner"]);
                message.success("Muvaffaqiyatli banner yaratildi");
                navigate("/app/banner")
            },
            onError: () => {
                message.error("Banner yaratishda xatolik yuz berdi");
            },
        });
    };

    return (
        <div>
            <BannerForm submit={submit} form={bannerForm} />
        </div>
    )
}