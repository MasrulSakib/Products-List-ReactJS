import { useParams } from "react-router";
import { useGetSingleProductQuery } from "../../app/services/ProductData";
import { Avatar, Card } from "antd";


const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isError, isLoading } = useGetSingleProductQuery(Number(id));
    console.log(data)
    if (isError) {
        return <h1>Oops! There is an Error!</h1>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="lg:container lg:mx-auto mx-5 mt-6 lg:mt-12">
            <Card
                hoverable={true}
                className="border-black"
                cover={<div className="text-2xl font-semibold px-4 py-4 h-[150px] w-100 bg-linear-to-r from-black/100 to-cyan-500 text-white">
                    <h2>{data?.title}</h2>
                    <div className="mt-2 text-base">
                        <p>Status: {data?.availabilityStatus}</p>

                    </div>
                </div>}
            >
                <Card.Meta
                    className="flex flex-col md:flex-row justify-center items-center"
                    avatar={
                        <Avatar
                            src={data?.thumbnail}
                            size={240}
                        ></Avatar>
                    }
                    title={<h2 className="text-xl font-semibold">{data?.brand}</h2>}
                    description={
                        <div className="text-base space-y-2">
                            <p className="mb-3"><b>Details:</b> {data?.description}</p>
                            <div className="flex gap-2 mb-5">
                                {data?.tags?.map((tag: string, idx: number) => (
                                    <p className="px-4 py-2 bg-blue-500 
                                    rounded-2xl text-white text-sm font-bold" key={idx}>{tag}</p>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col  justify-between text-black lg:text-xl">
                                    <p><b>Price:</b> ${data?.price}</p>
                                    <p><b>Rating:</b> {data?.rating}/5</p>
                                </div>
                                <div className="flex flex-col  justify-between items-end text-black lg:text-xl">
                                    <p><b>Category:</b> {data?.category}</p>
                                    <p><b>Stock:</b> {data?.stock}</p>
                                </div>
                            </div>
                        </div>
                    }
                ></Card.Meta>
            </Card>
        </div >
    );
};

export default ProductDetails;
