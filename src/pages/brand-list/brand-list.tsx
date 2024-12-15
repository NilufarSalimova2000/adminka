import { useNavigate } from "react-router-dom";
import { Button, Image, Popconfirm, Table, message } from "antd";
import React from "react";
import { useGetBrand } from "./service/query/useGetBrand";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";

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

export const BrandList: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useGetBrand();
    
    const dataSource = data?.results.map((item) => {
        return {
            key: item.id,
            id: item.id,
            img: item.image,
            title: item.title,
        }
    })

    const { mutate } = useDeleteBrand();

    const deleteBanner = (id: number) => {
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
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: (image: string) => (
                <div>
                    <Image style={{
                        width: "80px",
                    }} src={image} alt="imag" />
                </div>
            ),
        },
        {
            title: 'Title',
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
                        onConfirm={() => deleteBanner(record.id)}
                        okText="Yes"
                        cancelText="No"><Button type="primary">Delete</Button></Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/app/edit-brand/${record.id}`)}>Edit</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <Button onClick={() => navigate("/app/create-brand")} type="primary" variant="dashed">Create brand</Button>
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}