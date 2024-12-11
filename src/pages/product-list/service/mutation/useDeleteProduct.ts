import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProducts = () => {
    return useMutation({
        mutationFn:(id:number) => request.delete(`/product/${id}/`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["product"])
        }
    })
}