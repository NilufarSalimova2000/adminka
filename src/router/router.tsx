import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { MainLayout } from "../layout/main-layout";
import { MainRouter } from "./main-router";


export const Router = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
            {MainRouter.map(({id, path, component: Component}) => (
                <Route key={id} index={!path && true} path={path} element={<Component/>} />
            ))}
        </Route>
    </Routes>
}