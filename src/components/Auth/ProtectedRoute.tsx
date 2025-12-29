import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { selectIsAuthenticated } from "../../redux/authSlice";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated, navigate])

    if(!isAuthenticated) return <div>....Redirecting to login page</div>
    return (
       <Outlet/>
    )
}