import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { getAttributeType } from "./getAttributeType";

export const useGetAttribute = () => {
    return useQuery({
        queryKey: ["attribute"],
        queryFn: () => request.get<getAttributeType>("/attribute/").then((res) => res.data)
    })
}