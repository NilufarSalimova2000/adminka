import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleBrand = (id: string | undefined) => {
    return useQuery({
        queryKey: ["singleBrand", id],
        queryFn: () => request.get(`/brand/${id}/`).then((res) => res.data)
    })
}