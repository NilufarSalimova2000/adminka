import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { MainLayout } from "../layout/main-layout";
import { CategoryList } from "../pages/category-list";
import { CreateCategory } from "../pages/creat-category";
import { EditCategory } from "../pages/edit-category";
import { SubcategoryList } from "../pages/subcategory-list";
import { EditSubcategory } from "../pages/edit-subcategory";
import { CreateSubcategory } from "../pages/create-subcategory";
import { BannerList } from "../pages/banner-list";
import { CreateBanner } from "../pages/create-banner";
import { EditBanner } from "../pages/edit-banner";
import { BrandList } from "../pages/brand-list";
import { ProductList } from "../pages/product-list/product-list";
import { CreateBrand } from "../pages/create-brand";
import { EditBrand } from "../pages/edit-brand";
import { CreateProduct } from "../pages/create-product";
import { EditProduct } from "../pages/edit-product";
import { ProductVariants } from "../pages/product-variants";
import { CreateProductVariants } from "../pages/create-product-variants";
import { VariantsImage } from "../pages/product-variants/Variants-image";


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
            <Route path="banner" element={<BannerList />} />
            <Route path="create-banner" element={<CreateBanner />} />
            <Route path="edit-banner/:id" element={<EditBanner />} />
            <Route path="brand" element={<BrandList />} />
            <Route path="create-brand" element={<CreateBrand />} />
            <Route path="edit-brand/:id" element={<EditBrand />} />
            <Route path="product" element={<ProductList />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="product-variants/:id" element={<ProductVariants />} />
            <Route path="create-product-variants/:id" element={<CreateProductVariants />} />
            <Route path="variants-image/:id" element={<VariantsImage />} />
        </Route>
    </Routes>
}