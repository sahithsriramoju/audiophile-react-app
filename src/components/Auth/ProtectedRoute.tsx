import { useIsAuthenticated, useMsal } from "@azure/msal-react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { loginRequest } from "./authConfig"
import { InteractionStatus } from "@azure/msal-browser"

export const ProtectedRoute = () => {
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated && inProgress == InteractionStatus.None){
            instance.loginRedirect(loginRequest)
            .catch(error=>console.error(error));
        }
        else if(isAuthenticated && inProgress == InteractionStatus.None){
            if(window.location.search.includes('code=')){
                // After successful login, check for and remove the 'code' parameter.
                // `replace: true` prevents a new entry in the browser history.
                navigate(window.location.pathname, { replace: true });
            }
        }
    },[isAuthenticated,inProgress,loginRequest])

    if(!isAuthenticated) return <div>....Redirecting to login page</div>
    return (
       <Outlet/>
    )
}