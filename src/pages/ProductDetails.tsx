import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, openCart, selectCart, useCreateOrUpdateCartMutation } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/appStore";
import {  useGetProductByIdQuery } from "../redux/productSlice";
import type { Product } from "../types/Product";
import { selectUser } from "../redux/userSlice";

export const ProductDetails = () => {
    const {category,productId} = useParams();

    const cart = useSelector(selectCart);
    const user = useSelector(selectUser);
   
    const [createOrUpdateCart, {isLoading}] = useCreateOrUpdateCartMutation();
    const {data, isLoading:isProductLoading, isError, error} 
    = useGetProductByIdQuery(productId!)
    
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = (product:Product) => {
        dispatch(incrementQuantity(product.id,product.name,product.price,1,product.imageUrl))
        createOrUpdateCart({productId:product.id, productName:product.name, 
            price:product.price, imageUrl: product.imageUrl, quantity:1})
    }
    
    if(isProductLoading) return <p>....Loading</p>
    else if(isError) return <p>...error in loading products {JSON.stringify(error)}</p>
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
                        onClick={()=>handleAddToCart(product!)}>Add to Cart</button> : 

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