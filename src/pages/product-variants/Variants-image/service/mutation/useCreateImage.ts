import { request } from "../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateImage = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/product_variant_image/", data).then((res) => res.data)
    })
}