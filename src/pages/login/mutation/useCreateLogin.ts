import { request } from "../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "./LoginType";

export const useCreateLogin = () => {
    return useMutation({
        mutationFn: (data: LoginType) => request.post("/api/admin-login/", data).then((res) => res.data),
    })
}