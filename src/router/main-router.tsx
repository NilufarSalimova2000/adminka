import React from "react";
import { nanoid } from "nanoid";
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
import { CreateBrand } from "../pages/create-brand";
import { EditBrand } from "../pages/edit-brand";
import { ProductList } from "../pages/product-list/product-list";
import { CreateProduct } from "../pages/create-product";
import { EditProduct } from "../pages/edit-product";
import { ProductVariants } from "../pages/product-variants";
import { CreateProductVariants } from "../pages/create-product-variants";
import { VariantsImage } from "../pages/product-variants/Variants-image";

interface Type {
    id: string,
    path?: string,
    component: React.FC
}

export const MainRouter: Type[] = [
    {
        id: nanoid(),
        component: CategoryList
    },
    {
        id: nanoid(),
        component: CreateCategory,
        path: "/app/create-category"
    },
    {
        id: nanoid(),
        component: EditCategory,
        path: "/app/edit-category/:id"
    },
    {
        id: nanoid(),
        component: SubcategoryList,
        path: "/app/subcategory"
    },
    {
        id: nanoid(),
        component: EditSubcategory,
        path: "/app/edit-subcategory/:id"
    },
    {
        id: nanoid(),
        component: CreateSubcategory,
        path: "/app/create-subcategory"
    },
    {
        id: nanoid(),
        component: BannerList,
        path: "/app/banner"
    },
    {
        id: nanoid(),
        component: CreateBanner,
        path: "/app/create-banner"
    },
    {
        id: nanoid(),
        component: EditBanner,
        path: "/app/edit-banner/:id"
    },
    {
        id: nanoid(),
        component: BrandList,
        path: "/app/brand"
    },
    {
        id: nanoid(),
        component: CreateBrand,
        path: "/app/create-brand"
    },
    {
        id: nanoid(),
        component: EditBrand,
        path: "/app/edit-brand/:id"
    },
    {
        id: nanoid(),
        component: ProductList,
        path: "/app/product"
    },
    {
        id: nanoid(),
        component: CreateProduct,
        path: "/app/create-product"
    },
    {
        id: nanoid(),
        component: EditProduct,
        path: "/app/edit-product/:id"
    },
    {
        id: nanoid(),
        component: ProductVariants,
        path: "/app/product-variants/:id"
    },
    {
        id: nanoid(),
        component: CreateProductVariants,
        path: "/app/create-product-variants/:id"
    },
    {
        id: nanoid(),
        component: VariantsImage,
        path: "/app/variants-image/:id"
    },
]