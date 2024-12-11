import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProduct = (id: string | undefined) => {
    return useQuery({
        queryKey: ["singleProduct", id],
        queryFn: () => request.get(`/product/${id}/`).then((res) => res.data)
    })
}