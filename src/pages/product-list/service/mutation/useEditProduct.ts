import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";

export const useEditProduct = () => {
    return useMutation({
        mutationFn: ({id, data}: any) => request.patch(`/product/${id}/`, data).then((res) => res.data),
        onSuccess: (_, { id }) => {
            client.invalidateQueries(["product"])
            client.invalidateQueries(["singleProduct", id])
        }
    })
}