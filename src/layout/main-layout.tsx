import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom"

export const MainLayout = () => {
    const user = Cookies.get("token");
    if(!user) {
        return <Navigate replace to={"/"} />
    }
    return (
        <div>
            <header></header>
            <Outlet />
        </div>
    )
}