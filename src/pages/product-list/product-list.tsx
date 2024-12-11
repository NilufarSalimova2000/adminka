import { useNavigate } from "react-router-dom";
import { Button, Image, Popconfirm, Table, message } from "antd";
import React from "react";
import { useGetProducts } from "./service/query/useGetProducts";
import { useDeleteProducts } from "./service/mutation/useDeleteProduct";


interface columnType {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}

interface Type {
    key: number;
    id: number;
    image: string;
    title: string;
    price: string;
}

export const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useGetProducts();
    
    const dataSource = data?.results.map((item) => {
        return {
            key: item.id,
            id: item.id,
            img: item.image,
            title: item.title,
            price: item.price
        }
    })

    const { mutate } = useDeleteProducts();

    const deleteProduct = (id: number) => {
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
            title: 'IMAG',
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Change',
            dataIndex: 'change',
            key: 'action',
            render: (_: any, record: Type) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Popconfirm title="Delete the task"
                        description="O'chirishni istaysizmi?"
                        onConfirm={() => deleteProduct(record.id)}
                        okText="Yes"
                        cancelText="No"><Button type="primary">Delete</Button></Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/app/edit-product/${record.id}`)}>Edit</Button>
                    <Button type="primary">Variants</Button>
                    <Button type="primary">Category</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <Button onClick={() => navigate("/app/create-product")} type="primary" variant="dashed">Create product</Button>
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}