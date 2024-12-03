import {request} from "../../../../config/request"
import { useQuery } from "@tanstack/react-query";
import {CategoryType} from "./GetType"

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => request.get<CategoryType>("/category/").then((res) => res.data)
    })
}