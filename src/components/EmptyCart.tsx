import emptyCart from "../assets/images/empty-cart.png";

type EmptyCartProps = { onCloseCart: () => void };

export const EmptyCart = ({onCloseCart}: EmptyCartProps) => {
    return (
        <div className="flex flex-col items-center m-auto justify-between md:w-[300px]">
            <img src={emptyCart} alt="Empty cart" className="w-1/3 md:w-[80px]"></img>
            
            <p className="text-content mt-5">Your cart is empty</p>
            
            <button aria-label="return to shop" onClick={onCloseCart}
            className="cursor-pointer mt-5 grow text-white text-xs font-bold uppercase text-center py-4 px-8 bg-dark-brown hover:bg-light-brown">Return to Shop</button>
            
            <a className="mt-2 text-content text-[10px]"href="https://www.flaticon.com/free-icons/empty-cart" title="empty cart icons">Empty cart icons created by Flat Icons - Flaticon</a>
        </div>
    )
}