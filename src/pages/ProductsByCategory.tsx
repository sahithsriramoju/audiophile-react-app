import { useParams, Link } from "react-router";
import  {productsData} from "../data/mock-products";
import { useEffect, useState } from "react";
import { ApiClientFactory } from "../components/ApiManager/ApiClientFactory";

export const ProductsByCategory = () => {
    const {category} = useParams();
    const [productsDataState, setProductsDataState] = useState(productsData);
    const apiClientFactory = new ApiClientFactory("https://audiophile-product-catalog.azurewebsites.net/api");
    const apiClient = apiClientFactory.createClient();

    const fetchProductsByCategory = async() => {
        console.time("fetch products by category api call start");
        const response = await apiClient.get(`/product/category/${category}`);
        console.timeEnd("fetch products by category api call start");
        console.log(response);
    }
    useEffect(()=>{
        fetchProductsByCategory();
    },[]);
    return (
        <>
            
        <div className="bg-black-1 py-8 px-20">
            <h1 className="uppercase text-2xl text-white font-bold text-center">{category}</h1>
        </div>
        <div id="categoryList" className="flex flex-col px-6 md:px-10 lg:px-36">
            {
                
                productsDataState?.products?.map((item,index) => {
                   
                    return (
                        <div key={item?.id} className="flex flex-col mt-10 lg:flex-row lg:mt-40 md:mt-28">
                            <div className={`flex flex-col items-center lg:flex-row lg:mr-16 text-black-1 order-1  ${index%2 != 0 ? 'lg:order-2' : ''}`}>
                                <img src={item?.imageUrl || ""} aria-label={item?.slug} className="rounded-lg mb-8"></img>
                            </div>
                            <div className={`flex flex-col items-center lg:justify-center lg:items-start lg:ml-16 order-2 ${index%2 != 0 ? 'lg:order-1' : ''}`}>
                                {item?.isNew ? <span className="text-sm text-dark-brown uppercase font-normal mb-6">New Product</span>: ""}
                                <h2 className="text-2xl font-extrabold uppercase text-center">{item?.name}</h2>
                                <p className="text-base font-bold my-4 text-center text-content lg:text-start">{item?.description}</p>
                                <Link to={"/product/"+item?.category+"/"+item?.slug} className="uppercase py-4 px-7 mt-3 font-bold text-xs text-white bg-dark-brown hover:bg-light-brown">See Product</Link>
                            </div>
                        </div>
                    )
                })
                }

        </div>
    </>
    )
}

