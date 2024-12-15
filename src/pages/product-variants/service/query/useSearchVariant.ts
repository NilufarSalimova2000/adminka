import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantsType } from "./ProductVariantsType";

export const useSearchVariant = (input = "") => {
    return useQuery({
        queryKey: ["search-variant", input],
        queryFn: () => request.get<ProductVariantsType>("/product_variant/", {
            params: {
                search: input ? input : "00000"
            }
        }).then((res) => res.data)
    })
}