import { Link, useNavigate } from "react-router-dom";
import { useGetCategory } from "./service/query/useGetCategory"
import { Button, Table, message } from "antd";
import React from "react";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";

interface columnType {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}

export interface Datas {
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

    const {mutate} = useDeleteCategory();

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
            render: (_: any, record: Datas) => (
                <div style={{display: "flex", gap: "15px"}}>
                    <Button type="primary" onClick={() => deleteCategory(record.id)}>Delete</Button>
                    <Button type="primary" onClick={() => navigate(`/app/edit-category/${record.id}`)}>Edit</Button>
                </div>
            )
        }
    ];


    return (
        <div className="table-wrapper">
            <Link to={'/app/create-category'}>
                <Button  type="primary" variant="dashed">Create</Button>
            </Link>
            <div style={{ marginTop: '20px' }}>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}