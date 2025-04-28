import { Button, Form, Input, Select } from "antd";
import { useParams } from "react-router";
import { useGetAllProductCategoriesQuery, useGetSingleProductQuery } from "../../app/services/ProductData";
import { Option } from "antd/es/mentions";

const UpdateProduct = () => {

    const { id } = useParams<{ id: string }>()
    const { data, isError, isLoading } = useGetSingleProductQuery(Number(id));
    const { data: categories, isLoading: isCategoryLoading, isError: isCategoryError } = useGetAllProductCategoriesQuery();

    if (isError || isCategoryError) {
        return <h1>Oops! There is an Error!</h1>;
    }

    if (isLoading || isCategoryLoading) {
        return <div className="flex place-items-center place-content-center h-screen">
            <div className="loader"></div>
        </div>
    }
    return (
        <div className="lg:container lg:mx-auto mx-5">
            <Form>

                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input
                        defaultValue={data?.title}
                    />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="Status"
                >
                    <Input
                        defaultValue={data?.availabilityStatus}
                    />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input.TextArea
                        defaultValue={data?.description}
                    />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                >
                    <Input
                        defaultValue={data?.price}
                    />
                </Form.Item>
                <Form.Item
                    label="Rating"
                    name="Rating"
                >
                    <Input
                        defaultValue={data?.rating}
                    />
                </Form.Item>
                <Form.Item
                    label="Stock"
                    name="stock"
                >
                    <Input
                        defaultValue={data?.stock}
                    />
                </Form.Item>
                <Form.Item label="Reviews">
                    <Form.List name="reviews" initialValue={data?.reviews}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex flex-col lg:flex-row items-center gap-4 mb-4 p-4 border rounded-md">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'reviewerName']}
                                            className="flex-1 w-full"
                                            rules={[{ required: true, message: 'Reviewer name is required' }]}
                                        >
                                            <Input placeholder="Reviewer Name" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'reviewerEmail']}
                                            className="flex-1 w-full"
                                            rules={[{ required: true, message: 'Reviewer email is required' }]}
                                        >
                                            <Input placeholder="Reviewer Name" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'comment']}
                                            className="flex-1 w-full"
                                            rules={[{ required: true, message: 'Comment is required' }]}
                                        >
                                            <Input placeholder="Comment" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'rating']}
                                            className="w-24"
                                            rules={[{ required: true, message: 'Rating is required' }]}
                                        >
                                            <Input type="number" placeholder="Rating" min={1} max={5} />
                                        </Form.Item>

                                        <Button danger onClick={() => remove(name)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        + Add Review
                                    </Button>
                                </Form.Item>

                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Select defaultValue={data?.category}>
                    {categories?.map((category) => (
                        <Option key={category.slug} value={category.name}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form>
        </div>
    );
};

export default UpdateProduct;
