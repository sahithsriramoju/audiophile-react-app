import type { AppDispatch, RootState } from "../redux/appStore"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { clearCart, closeCart, fetchCart, deleteCart } from "../redux/cartSlice"
import { CartItem } from "./CartItem"
import { useEffect } from "react"
import { formatCurrency } from "../utils/formatCurrency"
import emptyCart from "../assets/images/empty-cart.png";


export const Cart = () => {

    const cart = useSelector((state:RootState) => state.cart)
    const dispatch = useDispatch<AppDispatch>();
    const cartQuantity = cart?.cart?.cart?.items.
                         reduce((quantity,item) => quantity + item?.quantity,0);

    useEffect(()=>{
        if(cart?.status === 'idle'){
            dispatch(fetchCart());
        }
        
    },[cart.status,dispatch]);

    const handleDeleteCart = () => {
        dispatch(clearCart());
        dispatch(deleteCart());
    }
    if(cart?.isCartOpen) return null
 
    return(
        <div onClick={()=>dispatch(closeCart())} className="fixed top-0 left-0 w-full h-full bg-background flex justify-end">
             <div className="bg-white w-full h-fit py-8 px-7 mx-6 mt-32 rounded-lg shadow-sm md:w-auto">
            {cart?.cart?.cart?.items.length === 0 ? 
                    <div className="flex flex-col items-center m-auto justify-between md:w-[300px]">
                        <img src={emptyCart} alt="Empty cart" className="w-1/3 md:w-[80px]"></img>
                        
                        <p className="text-content mt-5">Your cart is empty</p>
                        
                        <button aria-label="return to shop" onClick={()=>dispatch(closeCart())}
                        className="cursor-pointer mt-5 grow text-white text-xs font-bold uppercase text-center py-4 px-8 bg-dark-brown hover:bg-light-brown">Return to Shop</button>
                        
                        <a className="mt-2 text-content text-[10px]"href="https://www.flaticon.com/free-icons/empty-cart" title="empty cart icons">Empty cart icons created by Flat Icons - Flaticon</a>
                    </div>
            :
                <div className="md:w-auto">
                    <div id="cart-header" className="flex justify-between flex-wrap my-4">
                        <h2 className="text-lg font-bold uppercase">Cart {' ('+cartQuantity+')'}</h2>
                        <button aria-label="Remove All" onClick={()=>handleDeleteCart()} className="text-content font-medium text-base uppercase">Remove All</button>
                    </div>
            
                    <div id="cart-items" className="my-4">
                        <ul className="flex flex-col list-none">
                            {cart?.cart?.cart?.items?.map((item) => (
                                <CartItem key={item?.productId} {...item}></CartItem>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between">
                        <span>Total:</span>
                        <span>{formatCurrency(cart?.cart?.cart?.totalPrice)}</span>
                    </div>
                    <div className="flex">
                        <Link to="/checkout" className="grow text-white text-xs font-bold uppercase text-center py-4 px-8 bg-dark-brown hover:bg-light-brown">checkout</Link>
                    </div>
                    </div>
               
            }
             </div>
        </div>
    );
}