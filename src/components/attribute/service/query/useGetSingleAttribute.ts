import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleAttribute = (id: number) => {
    return useQuery({
        queryKey:["attribute", id],
        queryFn: () => request.get(`/attribute/`)
    })
}