import { useNavigate } from "react-router-dom";
import { Button, Form, Image, Input, Popconfirm, Table, message } from "antd";
import React from "react";
import { useGetProducts } from "./service/query/useGetProducts";
import { useDeleteProducts } from "./service/mutation/useDeleteProduct";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchProduct } from "./service/query/useSearchProduct";


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
    category?: string | number
}

export const ProductList: React.FC = () => {
    const [input, setinput] = React.useState("");
    const debounce = useDebounce(input);
    const { data: dataSearch = { results: [] } } = useSearchProduct(debounce);

    const navigate = useNavigate();
    const { data } = useGetProducts();

    const dataSource = data?.results.map((item) => {
        return {
            key: item.id,
            id: item.id,
            img: item.image,
            title: item.title,
            price: item.price,
            category: item.category
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
                    <Button onClick={() => navigate(`/app/product-variants/${record.id}`)} type="primary">Variants</Button>
                    <Button onClick={() => navigate(`/app/edit-subcategory/${record.category}`)} type="primary">Category</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <div style={{ display: "flex", gap: "40px" }}>
                <Button onClick={() => navigate("/app/create-product")} type="primary" variant="dashed">Create product</Button>
                <Form>
                    <Form.Item >
                        <Input style={{ width: "500px" }} placeholder="Search..." value={input} onChange={(e) => setinput(e.target.value)} />
                    </Form.Item>
                </Form>
            </div>
            {input ? (
                // Qidiruv bo'lsa
                Array.isArray(dataSearch?.results) && dataSearch.results.length > 0 ? (
                    dataSearch.results.map((item) => (
                        <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Image style={{ width: '50px' }} src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                        </div>
                    ))
                ) : (
                    <p>Ma'lumot topilmadi.</p> // Faqat qidiruv natijalari bo'lmasa
                )
            ) : (
                // Qidiruv bo'lmasa, hech narsa ko'rsatilmasin
                <></>
            )}
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}