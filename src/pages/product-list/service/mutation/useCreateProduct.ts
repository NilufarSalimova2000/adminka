import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/product/", data).then((res) => res.data)
    })
}