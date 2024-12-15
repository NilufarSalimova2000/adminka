import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Image, Input, Popconfirm, Table, message } from "antd";
import React from "react";
import { useGetProductVariants } from "./service/query/useGetProductVariants";
import { useDeleteProductVariants } from "./service/mutation/useDeleteProductVariants";
import { useSearchVariant } from "./service/query/useSearchVariant";
import { useDebounce } from "../../hooks/useDebounce";

interface columnType {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}

interface DataType {
    key: number;
    id: number;
    images: {
        image: string,
        order: number,
    }[],
    title: string;
}

export const ProductVariants: React.FC = () => {
    const [input, setinput] = React.useState("");
    const debounce = useDebounce(input);
    const { data: dataSearch = { results: [] } } = useSearchVariant(debounce);

    const navigate = useNavigate();
    const paramID = useParams();
    const { data } = useGetProductVariants(Number(paramID.id)); // Mahsulot ID'si bo'yicha so'rov


    const dataSource = data?.results
        .filter(item => item.product === Number(paramID.id)) // Filtrlash
        .map(item => ({
            key: item.id,
            id: item.id,
            img: item.images,
            title: item.title,
        }));

    const { mutate } = useDeleteProductVariants();

    const deleteVariants = (id: number) => {
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
            render: (images: { image: string, order: number }[]) => (
                <div>
                    <Image
                        style={{
                            width: "80px",
                        }}
                        src={images?.[0]?.image || undefined} // Birinchi tasvirni tanlang, aks holda undefined
                        alt="imag"
                        fallback="https://via.placeholder.com/80?text=No+Image" // Fallback tasvir
                    />
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
                        onConfirm={() => deleteVariants(record.id)}
                        okText="Yes"
                        cancelText="No"><Button type="primary">Delete</Button></Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/app/variants-image/${record.id}`)}>Upload image</Button>
                </div>
            )
        }
    ];


    return (
        <div style={{ height: "86vh", overflowY: "scroll" }}>
            <div style={{ display: "flex", gap: "40px" }}>
                <Link to={`/app/create-product-variants/${paramID.id}`}>
                    <Button type="primary" variant="dashed">Create variants</Button>
                </Link>
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
                            {item.images && item.images.length > 0 ? (
                                <Image style={{ width: '50px' }} src={item.images[0].image} alt={item.title} />
                            ) : (
                                <span>No image available</span>
                            )}
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