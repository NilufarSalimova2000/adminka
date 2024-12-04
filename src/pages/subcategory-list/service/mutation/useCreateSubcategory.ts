import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateSubcategory = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/category/", data).then((res) => res.data)
    })
}