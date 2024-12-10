import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleBanner = (id: string | undefined) => {
    return useQuery({
        queryKey: ["singleBanner", id],
        queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data)
    })
}