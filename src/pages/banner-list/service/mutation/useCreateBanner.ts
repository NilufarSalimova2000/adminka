import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateBanner = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post("/banner/", data).then((res) => res.data)
    })
}