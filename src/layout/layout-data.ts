import { DatabaseOutlined, FileAddOutlined, PictureOutlined } from "@ant-design/icons";

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
]