import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { ProductType } from "./ProductsType";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["product"],
        queryFn: () => request.get<ProductType>("/product/").then((res) => res.data)
    })
}