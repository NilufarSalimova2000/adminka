import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";

export const useEditBanner = () => {
    return useMutation({
        mutationFn: ({id, data}: any) => request.patch(`/banner/${id}/`, data).then((res) => res.data),
        onSuccess: (_, { id }) => {
            client.invalidateQueries(["banner"])
            client.invalidateQueries(["singleBanner", id])
        }
    })
}