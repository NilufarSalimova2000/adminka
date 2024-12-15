import React from "react";
import { client } from "../../config/query-client";
import { Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProductVariants } from "../product-variants/service/mutation/useCreateProductVariants";
import { ProductVariantsForm } from "../../components/product-variants-form";



export const CreateProductVariants: React.FC = () => {
    const { mutate } = useCreateProductVariants();
    const [variantForm] = Form.useForm();
    const navigate = useNavigate();
    const {id} = useParams()
    
    const submit = (values: any) => {
        const data = {
          is_available: values.isAvailable,
          other_detail: values.description,
          price: values.price,
          price_with_discount: values.priceWithDiscount,
          quantity: values.quantity,
          title: values.title,
          images: null,
          product: Number(id),
          attribute_value: values.attribute_value,
        };
        mutate(data, {
          onSuccess: () => {
            client.invalidateQueries(["product-variant"])
            navigate(`/app/product-variants/${id}`)
            message.success("Product variant muvaffaqiyatli qo'shildi");
          },
          onError: () => {
            message.error("Failed to create product variant.");
          },
        });
      };
    

    return (
        <div>
            <ProductVariantsForm submit={submit} form={variantForm} />
        </div>
    )
}
