import { incrementQuantity, decrementQuantity, useCreateOrUpdateCartMutation } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/appStore";
import { formatCurrency } from "../utils/formatCurrency";
import type { ShoppingCartRequestWrapper } from "../types/Cart";

type CartItemProps = {
    productId : string,
    productName: string,
    quantity : number,
    price: number,
    imageUrl: string
}
export const CartItem = ({productId, productName, quantity,price, imageUrl}:CartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const[createOrUpdateCart, {isLoading}] = useCreateOrUpdateCartMutation();
    const handleUpdateCart = (updateType:string) =>{
        if(updateType == 'increment'){
            const product: ShoppingCartRequestWrapper = {shoppingCartItem: {productId:productId, 
                productName: productName, 
                price: price, 
                imageUrl:imageUrl,
                quantity: quantity + 1}}
            dispatch(incrementQuantity(productId, productName, price, quantity + 1, imageUrl));
            createOrUpdateCart(product);
        }else{
            const product: ShoppingCartRequestWrapper = {shoppingCartItem: {productId:productId, 
                productName: productName, 
                price: price, 
                imageUrl:imageUrl,
                quantity: quantity - 1}}
            dispatch(decrementQuantity({productId:productId,productName:productName,price:price, imageUrl:imageUrl, quantity:quantity-1}));
            createOrUpdateCart(product);
        }
    }
    return (
        <>
                
        <li key={productId} className="mb-6">
            <div className="flex">
                <img alt={productName} 
                    src={imageUrl} 
                    className="h-16 w-16 rounded-lg mr-5">
                </img>
                <div className="flex flex-col mr-5">
                    <span className="text-base font-bold">{productName}</span>
                    <span className="text-content font-bold text-sm">{formatCurrency(price)}</span>
                </div>
                <div className="flex justify-between grow bg-grey-1 py-4 px-4 font-bold text-xs ">
                    <button aria-label="Decrement Quantity" className="cursor-pointer" data-action="minus" type="button" 
                    onClick={()=>handleUpdateCart("decrement")}>-</button>
                        <span className="bg-grey-1 font-bold px-4">{quantity}</span>
                    
                    <button aria-label="Increment Quantity" className="cursor-pointer" data-action="add" type="button" 
                    onClick={()=>handleUpdateCart("increment")}>+</button>
                </div>
                
            </div>
        </li>
             
        </>
        
        
    )
}