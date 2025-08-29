import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/appStore";
import { toggleCart } from "../redux/cartSlice";
import { Cart } from "./Cart";

type NavbarProps = {
    children : ReactNode
}

export const Navbar = ({children}:NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const cart = useSelector((state:RootState) => state.cart);
    const cartItemsCount = cart?.cartItems?.reduce((quantity, item) => quantity + item?.quantity, 0);
    const dispatch = useDispatch();

    return(
        <>
        <Cart></Cart>
        <header className=" sticky top-0 flex justify-between items-center py-6 px-8 md:px-32 bg-black text-white drop-shadow-md">
            <i className="bx bx-menu xl:hidden block text-5xl cursor-pointer" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fillRule="evenodd"><path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/></g></svg>
            </i>
            <Link to="/">
              <img src={logo} alt="logo" className="hover:scale-105 transition-all hover:fill-amber-700"></img>
            </Link>
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
                <li className="p-3 hover:text-dark-brown transition-all cursor-pointer">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="p-3 hover:text-dark-brown transition-all cursor-pointer">
                    <NavLink to="/products/headphones">Headphones</NavLink>
                </li>
                <li className="p-3 hover:text-dark-brown transition-all cursor-pointer">
                    <NavLink to="/products/speakers">Speakers</NavLink>
                </li>
                <li className="p-3 hover:text-dark-brown transition-all cursor-pointer">
                    <NavLink to="/products/earphones">Earphones</NavLink>
                </li>
            </ul>
            <div className="relative flex items-center gap-4">
              
                <button className="mx-6 relative cursor-pointer">
                    <svg className="w-[30px] h-[30px] dark:text-white hover:fill-amber-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </button>
               
                <button className="mx-6 relative cursor-pointer">
                    Logout
                </button>
                
                <button className=" relative cursor-pointer" onClick={()=>dispatch(toggleCart())}>
                    <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg" className="hover:fill-amber-600"><path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#FFF" fillRule="nonzero"/></svg>
                    {cartItemsCount > 0 ?  <div className="rounded-2xl bg-amber-600 flex justify-center items-center text-white w-6 h-6 absolute top-0 right-0 translate-3">
                        {cartItemsCount}
                    </div> : null}
                </button>
               
            </div>
            <div className={`absolute xl:hidden top-18 left-0 w-full flex flex-col items-center gap-6 font-semibold text-lg bg-black transform transition-transform ${isMenuOpen ? "block opacity-100" : "hidden opacity-0"}`}
             style={{transition:"transform 0.3s ease,opacity 0.3s ease"}}>
                    <li className="list-none w-full text-center text-white p-4 hover:text-dark-brown  transition-all cursor-pointer">
                        <Link to="/products/headphones">Headphones</Link>
                    </li>
                    <li className="list-none w-full text-center text-white p-4 hover:text-dark-brown  transition-all cursor-pointer">
                        <Link to="/products/speakers">Speakers</Link>
                    </li>
                    <li className="list-none w-full text-center text-white p-4 hover:text-dark-brown  transition-all cursor-pointer">
                        <Link to="/products/earphones">Earphones</Link>
                    </li>
            </div>
            
        </header>
        {children}
        </>
    )
}