import { Form, message } from "antd";
import { FormCreate } from "../../components/form-create"
import { client } from "../../config/query-client";
import { useCreateCategory } from "./service/mutation/useCreateCategory"
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";

export const CreatCategory = () => {
    const { mutate } = useCreateCategory();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submit = (values: { title: string; image: { file: RcFile } }) => {
        const formData = new FormData();

        formData.append("title", values.title);

        if (values.image) {
            formData.append("image", values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
                client.invalidateQueries(["category"])
                message.success("Muvaffaqiyatli qo'shildi")
                navigate("/app");
                form.resetFields();
            },
            onError: () => {
                message.error("Xatolik")
            }
        })
    }
    return <div>
        Create category
        <FormCreate submit={submit} form={form} />
    </div>
}