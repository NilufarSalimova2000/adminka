import { request } from "../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { useLoginType } from "./useLoginType";

export const useCreateLogin = () => {
    return useMutation({
        mutationFn: (data: useLoginType) => request.post("/api/admin-login/", data).then((res) => res.data),
    })
}