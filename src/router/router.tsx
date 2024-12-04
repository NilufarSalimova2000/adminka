import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { MainLayout } from "../layout/main-layout";
import { CategoryList } from "../pages/category-list";
import { CreateCategory } from "../pages/creat-category";
import { EditCategory } from "../pages/edit-category";
import { SubcategoryList } from "../pages/subcategory-list";
import { EditSubcategory } from "../pages/edit-subcategory";
import { CreateSubcategory } from "../pages/create-subcategory";


export const Router = () => {
    return <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
            <Route index element={<CategoryList />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route path="subcategory" element={<SubcategoryList />} />
            <Route path="edit-subcategory/:id" element={<EditSubcategory />} />
            <Route path="create-subcategory" element={<CreateSubcategory />} />
        </Route>
    </Routes>
}