import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { MainLayout } from "../layout/main-layout";
import { Home } from "../pages/home";
import { CategoryList } from "../pages/category-list";
import { CreatCategory } from "../pages/creat-category";
import { EditCategory } from "../pages/edit-category";


export const Router = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
            <Route index element={<CategoryList />} />
            <Route path="create-category" element={<CreatCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route path="subcategory" element={<Home />} />
        </Route>
    </Routes>
}