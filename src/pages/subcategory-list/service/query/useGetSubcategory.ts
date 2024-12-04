import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { getSubcategoryType } from "./getSubcategoryType";

export const useGetSubcategory = () => {
    return useQuery({
        queryKey: ["subcategory"],
        queryFn: () => request.get<getSubcategoryType>("/api/subcategory/").then((res) => res.data)
    })
}