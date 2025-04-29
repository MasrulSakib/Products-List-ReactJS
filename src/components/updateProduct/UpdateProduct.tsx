import { Button } from "antd";
import { useUpdateProductMutation } from "../../app/services/ProductData";
import { NewProduct } from "../../app/services/ProductData";
import { useParams } from "react-router";
import '@ant-design/v5-patch-for-react-19';
import { FileDoneOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

interface UpdateProductProps {
    updatedData: Partial<NewProduct>;
}

function UpdateProduct(props: UpdateProductProps) {
    const { updatedData } = props;
    const { id } = useParams<{ id: string }>();
    const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();

    const handleUpdateProduct = async () => {
        try {
            if (!id) return;

            console.log("Form Data to Update:", updatedData);

            const response = await updateProduct({
                id: Number(id),
                updatedProduct: updatedData,
            }).unwrap();

            console.log("Updated response:", response);
            toast.success("Product updated successfully!");
        } catch (error) {
            toast.error("This didn't work.");
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex place-items-center place-content-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (isError) {
        return <h1 className="text-red-600 text-xl font-semibold text-center mt-10">Oops! There is an Error!</h1>;
    }

    return (
        <Button
            type="primary"
            icon={<FileDoneOutlined />}
            onClick={handleUpdateProduct}
            size="large"
            className="w-full md:w-auto"
        >
            Update Product
        </Button>
    );
}

export default UpdateProduct;
