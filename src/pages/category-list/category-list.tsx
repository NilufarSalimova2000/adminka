import { useNavigate } from "react-router-dom";
import { useGetCategory } from "./service/query/useGetCategory"
import { Button, Image, Popconfirm, Table, message } from "antd";
import React from "react";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";

interface columnType {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}

interface DataType {
    key: number;
    id: number;
    image: string;
    title: string;
}

export const CategoryList: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useGetCategory();
    const dataSource = data?.results.map((item) => {
        return {
            key: item.id,
            id: item.id,
            img: item.image,
            title: item.title,
        }
    })

    const { mutate } = useDeleteCategory();

    const deleteCategory = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Muvaffaqiyatli o'chirildi")
            },
            onError: () => {
                message.error("Xatolik")
            }
        })
    }

    const columns: columnType[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'IMG',
            dataIndex: 'img',
            key: 'img',
            render: (image: string) => (
                <div style={{ textAlign: "center" }}>
                    <Image style={{
                        width: "80px",
                    }} src={image} alt="imag" />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Change',
            dataIndex: 'change',
            key: 'action',
            render: (_: any, record: DataType) => (
                <div style={{ display: "flex", gap: "15px" }}>
                    <Popconfirm title="Delete the task"
                        description="O'chirishni istaysizmi?"
                        onConfirm={() => deleteCategory(record.id)}
                        okText="Yes"
                        cancelText="No"><Button type="primary">Delete</Button></Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/app/edit-category/${record.id}`)}>Edit</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <Button onClick={() => navigate("/app/create-category")} type="primary" variant="dashed">Create category</Button>
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}