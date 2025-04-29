import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import { useNavigate, useParams } from "react-router";
import {
    NewProduct,
    useGetAllProductCategoriesQuery,
    useGetSingleProductQuery,
} from "../../app/services/ProductData";
import { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import '@ant-design/v5-patch-for-react-19';
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;
const EditProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isError, isLoading } = useGetSingleProductQuery(Number(id));
    const {
        data: categories,
        isLoading: isCategoryLoading,
        isError: isCategoryError,
    } = useGetAllProductCategoriesQuery();

    const [formValues, setFormValues] = useState<Partial<NewProduct>>({});

    useEffect(() => {
        if (data) {
            const initialValues: Partial<NewProduct> = {
                title: data.title,
                description: data.description,
                price: data.price,
                rating: data.rating,
                stock: data.stock,
                category: data.category,
                reviews: data.reviews,
                tags: data.tags,
                brand: data.brand,
                discountPercentage: data.discountPercentage,
                thumbnail: data.thumbnail,
                images: data.images,
                availabilityStatus: data.availabilityStatus,
            };
            form.setFieldsValue(initialValues);
            setFormValues(initialValues);
        }
    }, [data, form]);

    if (isError || isCategoryError) {
        return <h1 className="text-red-600 text-xl font-semibold text-center mt-10">Oops! There is an Error!</h1>;
    }

    if (isLoading || isCategoryLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    const onFormChange = () => {
        const values = form.getFieldsValue();
        setFormValues(values);
    };

    const handleBacktoDetails = () => {
        navigate(-1);
    }

    return (
        <div className="my-12 max-w-3xl w-full mx-auto px-5">
            <h2 className="mb-8 font-bold text-3xl">Edit {data?.title}'s Details</h2>
            <Form
                form={form}
                colon={false}
                layout="vertical"
                className="space-y-6 border border-blue-500 !p-5 rounded-xl"
                onValuesChange={onFormChange}
            >
                {/* Style label text */}
                <style>
                    {`
                            .ant-form-item-label > label {
                                color: #1d4ed8 !important;
                                font-weight: 600 !important;
                                font-size: 0.95rem !important; 
                            }
                        `}
                </style>

                <Form.Item label="Title" name="title">
                    <Input className="transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500" />
                </Form.Item>

                <Form.Item label="Status" name="availabilityStatus">
                    <Input className="transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea
                        rows={4}
                        className="transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500"
                    />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <Input
                        type="number"
                        className="transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500"
                    />
                </Form.Item>

                <Form.Item label="Rating" name="rating">
                    <InputNumber
                        min={1}
                        max={5}
                        step={0.1}
                        precision={2}
                        style={{ width: "100%" }}
                        className="transition-all duration-200 hover:shadow-md"
                    />
                </Form.Item>

                <Form.Item label="Stock" name="stock">
                    <Input
                        type="number"
                        className="transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-500"
                    />
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select
                        defaultValue={data?.category}
                        className="transition-all duration-200 hover:shadow-md"
                    >
                        {categories?.map((category) => (
                            <Option key={category.slug} value={category.name}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Reviews">
                    <Form.List name="reviews">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        className="lg:flex items-start gap-4 mb-4 p-4 border border-blue-200 rounded-md bg-blue-50"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, "reviewerName"]}
                                            className="flex-1"
                                            rules={[{ required: true, message: "Reviewer name is required" }]}
                                        >
                                            <Input placeholder="Reviewer Name" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "reviewerEmail"]}
                                            className="flex-1"
                                            rules={[{ required: true, message: "Reviewer email is required" }]}
                                        >
                                            <Input placeholder="Reviewer Email" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "comment"]}
                                            className="flex-1"
                                            rules={[{ required: true, message: "Comment is required" }]}
                                        >
                                            <Input placeholder="Comment" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "rating"]}
                                            className="w-24"
                                            rules={[{ required: true, message: "Rating is required" }]}
                                        >
                                            <Input type="number" min={1} max={5} placeholder="Rating" />
                                        </Form.Item>

                                        <div className="mt-1 lg:mt-0">
                                            <Button danger onClick={() => remove(name)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        className="!hover:bg-blue-100 !hover:scale-[1.01] !transition-all"
                                    >
                                        + Add Review
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-center md:justify-end">
                        <Flex className="flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={handleBacktoDetails}
                                size="large"
                                className="w-full sm:w-auto"
                            >
                                Go Back
                            </Button>
                            <div className="w-full sm:w-auto">
                                <UpdateProduct updatedData={formValues} />
                            </div>
                            <Button
                                danger
                                size="large"
                                onClick={() => form.resetFields()}
                                className="w-full sm:w-auto"
                            >
                                Reset
                            </Button>
                        </Flex>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProduct;
