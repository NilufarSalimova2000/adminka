import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "./ProductsType";

export const useSearchProduct = (input = "") => {
    return useQuery({
        queryKey: ["search-product", input],
        queryFn: () => request.get<ProductType>("/product/", {
            params: {
                search: input ? input : "00000"
            }
        }).then((res) => res.data)
    })
}