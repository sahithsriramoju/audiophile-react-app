import { Link } from "react-router";
import NotFoundSvg from "../assets/images/notfound.svg";

export const NotFound = () => {
    return(
        <div className="flex flex-col justify-center items-center mt-7">
            <img className="w-[540px] h-auto" src={NotFoundSvg}></img>
            <Link className="uppercase text-white font-bold px-10 py-4 bg-dark-brown hover:bg-light-brown" to = "/">Return to Home page</Link>
        </div>
    )
}