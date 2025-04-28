import { ProductFilled, ProfileOutlined } from "@ant-design/icons";
import { Product, useGetAllProductQuery } from "../../app/services/ProductData";
import { Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router";
import "../loader/loader.css"

const ProductsList = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [showAll, setShowAll] = useState<boolean>(false);

    const { data, isLoading, isError, refetch } = useGetAllProductQuery({
        skip: showAll ? 0 : (page - 1) * pageSize,
        limit: showAll ? 0 : pageSize,
    });


    const columns: ColumnsType<Product> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            onCell: () => ({
                className: "font-bold"
            })
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            onCell: () => ({
                className: "font-semibold"
            })
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => `$${price}`,
            onCell: () => ({
                className: "font-semibold text-red-600"
            })
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Link to={`/products/${record.id}`}>
                    <Button
                        type="default"
                        danger
                        icon={<ProductFilled />}
                    >
                        Details
                    </Button>
                </Link>
            ),
        }

    ];


    if (isLoading) {
        return <div className=" flex place-items-center place-content-center h-screen">
            <div className="loader"></div>
        </div>
    }

    if (isError) {
        return <h1>Oops! Something went wrong...</h1>;
    }

    const handleToggleItems = () => {
        if (showAll) {
            setPage(1);
            setPageSize(5);
            setShowAll(false);
        } else {
            setPage(1);
            setShowAll(true);
        }
        refetch();
    };

    return (
        <div className="lg:container mx-5 lg:mx-auto">
            <h2 className="text-center text-3xl font-semibold mx-auto mt-12">Products List</h2>
            <div className="flex justify-end">
                <Button
                    type="default"
                    ghost
                    size="large"
                    icon={<ProfileOutlined />}
                    onClick={handleToggleItems}
                    className="my-5 !bg-gradient-to-r from-cyan-500  to-purple-500 !text-white
                     !border-0 !shadow-md !rounded-lg !px-6 !py-2"
                >
                    {showAll ? "Show Paginated Products" : "Load All Products"}
                </Button>

            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <Table<Product>
                    dataSource={data?.products}
                    columns={columns}
                    rowKey="id"
                    loading={isLoading}
                    bordered
                    scroll={{ x: 800 }}
                    pagination={!showAll ? {
                        current: page,
                        position: ['bottomCenter'],
                        pageSize: pageSize,
                        total: data?.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '15', '20', '50', '100'],
                        onChange: (newPage, newPageSize) => {
                            setPage(newPage);
                            setPageSize(newPageSize);
                        },
                    } : false}
                />
            </div>
        </div>
    );
};

export default ProductsList;
