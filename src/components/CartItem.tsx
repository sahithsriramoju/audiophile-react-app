import { useEffect, useState } from "react";
import { productsData } from "../data/mock-products";
import { incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/appStore";

type CartItemProps = {
    productId : string,
    quantity : number
}
export const CartItem = ({productId, quantity}:CartItemProps) => {
    const [productInfo,setProductInfo] = useState<any|null>();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        const filteredProduct = productsData.products.filter(x=>x.id === productId);
        setProductInfo(filteredProduct[0]);
    },[])

    const handleUpdateQuantity = (updateType:string) => {
        console.log(updateType);
    }
    return (
        <>
                
        <li key={productInfo?.id} className="mb-6">
            <div className="flex">
                <img alt={productInfo?.name} 
                    src={productInfo?.imageUrl || ""} 
                    className="h-16 w-16 rounded-lg mr-5">
                </img>
                <div className="flex flex-col mr-5">
                    <span className="text-base font-bold">{productInfo?.name}</span>
                    <span className="text-content font-bold text-sm">{(productInfo?.price)}</span>
                </div>
                <div className="flex justify-between grow bg-grey-1 py-4 px-4 font-bold text-xs ">
                    <button aria-label="Increment Quantity" className="cursor-pointer" data-action="minus" type="button" 
                    onClick={()=>dispatch(decrementQuantity({productId:productInfo?.id, 
                                                            productName: productInfo?.name, 
                                                            price: productInfo?.price, 
                                                            imageUrl: productInfo?.imageUrl,
                                                             quantity: quantity - 1}))}>-</button>
                        <span className="bg-grey-1 font-bold px-4">{quantity}</span>
                    
                    <button aria-label="Decrement Quantity" className="cursor-pointer" data-action="add" type="button" 
                    onClick={()=>dispatch(incrementQuantity({productId:productInfo?.id, 
                        productName: productInfo?.name, 
                        price: productInfo?.price, 
                        imageUrl: productInfo?.imageUrl,
                         quantity: quantity + 1}))}>+</button>
                </div>
                
            </div>
        </li>
             
        </>
        
        
    )
}