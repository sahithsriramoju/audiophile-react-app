import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

export const AuthTemplate = () => {
    const { instance } = useMsal();
    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.error(error));
    }
    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.error(error));
    }
    return (
        <div className="mx-6 relative cursor-pointer">
            <AuthenticatedTemplate>
                    <div>
                        <button aria-label="Logout" onClick={handleLogoutRedirect}>
                            Sign out
                        </button>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div>
                        <button aria-label="Login" onClick={handleLoginRedirect}>Sign in</button>
                    </div>
                </UnauthenticatedTemplate>
        </div>
    )
}
