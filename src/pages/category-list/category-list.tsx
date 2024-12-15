import { useNavigate } from "react-router-dom";
import { useGetCategory } from "./service/query/useGetCategory";
import { Button, Form, Image, Input, Popconfirm, Table, message } from "antd";
import React from "react";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchCategory } from "./service/query/useSearchCategory";

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
    const [input, setinput] = React.useState("");
    const debounce = useDebounce(input);
    const { data: dataSearch = { results: [] } } = useSearchCategory(debounce);

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
            <div style={{ display: "flex", gap: "40px" }}>
                <Button onClick={() => navigate("/app/create-category")} type="primary" variant="dashed">Create category</Button>
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
