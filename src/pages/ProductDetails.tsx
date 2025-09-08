import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productsData } from "../data/mock-products";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, addOrUpdateCart, openCart, getCart } from "../redux/cartSlice";
import type { AppDispatch, RootState } from "../redux/appStore";
import {  useGetProductByIdQuery, useGetProductsQuery, selectProductById } from "../redux/productSlice";

export const ProductDetails = () => {
    const {category,productId} = useParams();
    const [productDetails, setProductDetails] = useState<any>(null);

    const cart = useSelector(getCart);
    const product = useSelector((state:RootState)=>selectProductById(state, productId!))
    //const product = useSelector((state:RootState)=>getProductById(state,productId!));
    //console.log(product);
   const {data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductByIdQuery(productId!)
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        dispatch(incrementQuantity({
            quantity:1, 
            productId: productDetails?.id, 
            productName: productDetails?.name, 
            price: productDetails?.price, 
            imageUrl: productDetails?.imageUrl
         }));
         dispatch(addOrUpdateCart({
            userId: "1",
            shoppingCartItem: {
                productId: productDetails?.id,
                productName: productDetails?.name,
                price: productDetails?.price,
                quantity: 1,
                imageUrl: productDetails?.imageUrl
            }
         }))
    }
    
    if(isLoading) return <p>....Loading</p>
    else if(isError) return <p>...error in loading products</p>
    else {
        const product = data?.entities[productId!];
    return (
        <div>
           <div className="flex flex-col md:flex-row lg:mt-40">
            <div className="flex flex-col items-start text-black-1 my-16 md:mr-8" key={product?.id}>
                <img alt={product?.name} src={product?.imageUrl} className="rounded-lg mb-8"></img>
            </div>
            <div className="mt-auto md:my-16 md:ml-8 flex flex-col items-start  md:justify-center">
                {product?.new ? <span className="text-sm text-dark-brown uppercase font-normal mb-6">New Product</span>: ""}
                <h1 className="text-2xl font-extrabold uppercase">{product?.name}</h1>
                <p className="text-base font-normal my-4 text-content">{product?.description}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold my-6">{product?.price}</span>
                    {true? 
                   
                    (cart?.items?.find(x=>x.productId === product?.id)?.quantity ?? 0) == 0 ? 
                        <button aria-label="Add to Cart" className="hover:bg-light-brown bg-amber-700 p-4 cursor-pointer text-white text-xs font-bold uppercase"
                        onClick={()=>handleAddToCart()}>Add to Cart</button> : 

                        <button aria-label="Go to Bag" className="hover:bg-light-brown bg-amber-700 p-4 cursor-pointer text-white text-xs font-bold uppercase"
                        onClick={()=>dispatch(openCart())}>Go to Bag</button>
                     :
                    <button aria-label="Out of Stock" disabled className="bg-amber-700 p-4 text-white">Out of Stock</button>
                    }</div>
                </div>
            </div>
            </div>
        </div>
    )
}
}