import { DatabaseOutlined, FileAddOutlined, PictureOutlined, ApartmentOutlined, AppstoreOutlined } from "@ant-design/icons";

export const navList = [
    {
        id: 1,
        label: "Category list",
        path:"/app",
        icon: DatabaseOutlined
    },
    {
        id: 2,
        label: "Subcategory list",
        path:"/app/subcategory",
        icon: FileAddOutlined,
    },
    {
        id: 3,
        label: "Banner list",
        path:"/app/banner",
        icon: PictureOutlined,
    },
    {
        id: 4,
        label: "Brand list",
        path:"/app/brand",
        icon: AppstoreOutlined,
    },
    {
        id: 5,
        label: "Product list",
        path:"/app/product",
        icon: ApartmentOutlined,
    },
]