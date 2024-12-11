import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBrand = () => {
    return useMutation({
        mutationFn:(id:number) => request.delete(`/brand/${id}/`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["brand"])
        }
    })
}