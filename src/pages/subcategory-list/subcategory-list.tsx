import { useNavigate } from "react-router-dom";
import { Button, Popconfirm, Table, message } from "antd";
import React from "react";
import { useGetSubcategory } from "./service/query/useGetSubcategory";
import { useDeleteSubcategory } from "./service/mutation/useDeleteSubcategory";

interface columnType {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}

export interface DataType {
    key: number;
    id: number;
    image: string;
    title: string;
    parent?: string | any;
}

export const SubcategoryList: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useGetSubcategory();
    const dataSource = data?.results.map((item: DataType | any) => {
        return {
            key: item.id,
            id: item.id,
            img: item.image,
            title: item?.title,
            parent: item.parent?.title,
        }
    })

    const { mutate } = useDeleteSubcategory();

    const deleteSubcategory = (id: number) => {
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
            title: "Parent",
            dataIndex: "parent",
            key: "parent",
        },
        {
            title: 'IMG',
            dataIndex: 'img',
            key: 'img',
            render: (image: string) => (
                <div>
                    <img style={{
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
                        onConfirm={() => deleteSubcategory(record.id)}
                        okText="Yes"
                        cancelText="No"><Button type="primary">Delete</Button></Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/app/edit-subcategory/${record.id}`)}>Edit</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <Button onClick={() => navigate("/app/create-subcategory")} type="primary" variant="dashed">Create subcategory</Button>
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}