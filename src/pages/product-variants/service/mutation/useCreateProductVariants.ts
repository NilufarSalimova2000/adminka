import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateProductVariants = () => {
    return useMutation({
        mutationFn: (data: any) => request.post("/product_variant/", data).then((res) => res.data)
    })
}