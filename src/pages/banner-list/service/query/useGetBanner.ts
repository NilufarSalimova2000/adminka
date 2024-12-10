import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BannerType } from "./getBannerType";

export const useGetBanner = () => {
    return useQuery({
        queryKey: ["banner"],
        queryFn: () => request.get<BannerType>("/banner/").then((res) => res.data)
    })
}