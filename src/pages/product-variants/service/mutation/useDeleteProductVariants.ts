import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProductVariants = () => {
    return useMutation({
        mutationFn:(id:number) => request.delete(`/product_variant/${id}/`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["product-variant"])
        }
    })
}