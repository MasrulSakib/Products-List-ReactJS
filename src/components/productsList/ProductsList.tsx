import { Product, useGetAllProductQuery } from "../../app/services/ProductData";
import { Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router";

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
                        className="custom-btn"
                        type="primary"
                    >
                        Details
                    </Button>
                </Link>
            ),
        },
    ];


    if (isLoading) {
        return <h1>Loading...</h1>;
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
                    type="primary"
                    onClick={handleToggleItems}
                    className="my-5 custom-btn"
                >
                    {showAll ? "Show Paginated Products" : "Load All Products"}
                </Button>
            </div>

            <Table<Product>
                dataSource={data?.products}
                columns={columns}
                rowKey="id"
                loading={isLoading}
                className="custom-table"
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
    );
};

export default ProductsList;
