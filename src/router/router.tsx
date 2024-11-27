
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { MainLayout } from "../layout/main-layout";
import { Home } from "../pages/home";

export const Router = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>
}