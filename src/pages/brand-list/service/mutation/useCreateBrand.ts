import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateBrand = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/brand/", data).then((res) => res.data)
    })
}