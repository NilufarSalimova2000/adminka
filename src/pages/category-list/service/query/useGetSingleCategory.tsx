import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleCategory = (id: any) => {
    return useQuery({
        queryKey: ["singleCategory", id],
        queryFn: () => request.get(`/category/${id}/`).then((res) => res.data)
    })
}