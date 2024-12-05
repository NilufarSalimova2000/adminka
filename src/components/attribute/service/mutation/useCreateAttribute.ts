import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { createAttributeType } from "./createAttributeType";

export const useCreateAttribute = () => {
    return useMutation({
        mutationFn: (data: createAttributeType) => request.post("/attribute/", data).then((res) => res.data)
    })
}