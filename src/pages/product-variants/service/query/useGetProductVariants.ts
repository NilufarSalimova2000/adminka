import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ProductVariantsType } from "./ProductVariantsType";

export const useGetProductVariants = (productId: number) => {
    return useQuery({
        queryKey: ["product-variant", productId],
        queryFn: () => request.get<ProductVariantsType>("/product_variant/").then((res) => res.data)
    })
}