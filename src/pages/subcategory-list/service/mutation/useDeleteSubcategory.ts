import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteSubcategory = () => {
    return useMutation({
        mutationFn:(id:number) => request.delete(`/category/${id}/`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["subcategory"])
        }
    })
}