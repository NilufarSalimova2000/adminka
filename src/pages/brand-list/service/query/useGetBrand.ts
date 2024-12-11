import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BrandType } from "./getBrandType";

export const useGetBrand = () => {
    return useQuery({
        queryKey: ["brand"],
        queryFn: () => request.get<BrandType>("/brand/").then((res) => res.data)
    })
}