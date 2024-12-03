import { client } from "../../../config/query-client";
import { request } from "../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useEditCategory = () => {
    return useMutation({
        mutationFn: ({id, data}: any) => request.put(`/category/${id}/`, data).then((res) => res.data),
        onSuccess: (_, { id }) => {
            client.invalidateQueries(["category"])
            client.invalidateQueries(["singleCategory", id])
        }
    })
}