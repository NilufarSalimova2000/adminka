import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useEditAttribute = () => {
    return useMutation({
        mutationFn: (data: any) => request.patch("/api/category_edit/", data).then((res) => res.data)
    })
}