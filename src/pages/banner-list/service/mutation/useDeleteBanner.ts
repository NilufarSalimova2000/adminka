import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBanner = () => {
    return useMutation({
        mutationFn:(id:number) => request.delete(`/banner/${id}/`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["banner"])
        }
    })
}