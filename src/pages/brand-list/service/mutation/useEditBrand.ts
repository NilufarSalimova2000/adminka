import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";

export const useEditBrand = () => {
    return useMutation({
        mutationFn: ({id, data}: any) => request.patch(`/brand/${id}/`, data).then((res) => res.data),
        onSuccess: (_, { id }) => {
            client.invalidateQueries(["brand"])
            client.invalidateQueries(["singleBrand", id])
        }
    })
}