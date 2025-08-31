import type { RootState } from "../redux/appStore"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { clearCart, closeCart } from "../redux/cartSlice"
import { CartItem } from "./CartItem"


export const Cart = () => {

    const cart = useSelector((state:RootState) => state.cart)
    const dispatch = useDispatch();
    const cartQuantity = cart.cartItems?.reduce((quantity,item) => quantity + item?.quantity,0);
    if(!cart?.isCartOpen) return null

    return(
        <div onClick={()=>dispatch(closeCart())} className="fixed top-0 left-0 w-full h-full bg-background flex justify-end">
            <div className="bg-white w-full h-fit py-8 px-7 mx-6 mt-32 rounded-lg shadow-sm md:w-auto">
                <div id="cart-header" className="flex justify-between flex-wrap my-4">
                    <h2 className="text-lg font-bold uppercase">Cart {' ('+cartQuantity+')'}</h2>
                    <button aria-label="Remove All" onClick={()=>dispatch(clearCart())} className="text-content font-medium text-base uppercase">Remove All</button>
                </div>
           
                <div id="cart-items" className="my-4">
                    <ul className="flex flex-col list-none">
                        {cart.cartItems?.map((item) => (
                            <CartItem key={item?.productId} {...item}></CartItem>
                        ))}
                    </ul>
                </div>
                <div className="flex">
                    <Link to="/checkout" className="grow text-white text-xs font-bold uppercase text-center py-4 px-8 bg-dark-brown hover:bg-light-brown">checkout</Link>
                </div>
            </div>
        </div>
    );
}