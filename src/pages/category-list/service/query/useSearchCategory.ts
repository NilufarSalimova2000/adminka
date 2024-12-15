import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "./GetType";


export const useSearchCategory = (input = "") => {
    return useQuery({
        queryKey: ["search-category", input],
        queryFn: () => request.get<CategoryType>("/category/", {
            params: {
                search: input ? input : "00000"
            }
        }).then((res) => res.data)
    })
}