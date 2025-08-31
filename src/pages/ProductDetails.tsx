import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productsData } from "../data/mock-products";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity } from "../redux/cartSlice";
import type { RootState } from "../redux/appStore";

export const ProductDetails = () => {
    const {category,productId} = useParams();
    const [productDetails, setProductDetails] = useState<any>(null);
    const cart = useSelector((state:RootState) => state.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        const filteredProduct = productsData?.products?.find(x=>x.slug == productId && x.category == category);
        setProductDetails(filteredProduct);
    }, [category, productId]);
    return (
        <div>
           <div className="flex flex-col md:flex-row lg:mt-40">
            <div className="flex flex-col items-start text-black-1 my-16 md:mr-8" key={productDetails?.id}>
                <img alt={productDetails?.name} src={productDetails?.imageUrl} className="rounded-lg mb-8"></img>
            </div>
            <div className="mt-auto md:my-16 md:ml-8 flex flex-col items-start  md:justify-center">
                {productDetails?.isNew ? <span className="text-sm text-dark-brown uppercase font-normal mb-6">New Product</span>: ""}
                <h1 className="text-2xl font-extrabold uppercase">{productDetails?.name}</h1>
                <p className="text-base font-normal my-4 text-content">{productDetails?.description}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold my-6">{productDetails?.price}</span>
                    {true? <button aria-label="Add to Cart" className="hover:bg-light-brown bg-amber-700 p-4 cursor-pointer text-white text-xs font-bold uppercase"
                     onClick={()=>dispatch(incrementQuantity({
                        quantity:1, productId:productDetails?.id
                     }))}>
                    {(cart?.cartItems?.find(x=>x.productId === productDetails?.id)?.quantity ?? 0) == 0 ? "Add to Cart" : "Go to Bag" }</button> : <button aria-label="Out of Stock" disabled className="bg-amber-700 p-4 text-white">Out of Stock</button>}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}