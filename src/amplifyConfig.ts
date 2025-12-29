import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
        }
    }
});
/*const amplifyConfig = {
    Auth: {
        region: import.meta.env.VITE_AWS_REGION,   
        userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
        authenticationFlowType: import.meta.env.VITE_AWS_COGNITO_AUTH_TYPE,
        oauth: {
            domain: `${import.meta.env.VITE_AWS_USER_POOL_ID}.auth.${import.meta.env.VITE_AWS_REGION}.amazoncognito.com`,
            scope: ["phone", "email", "openid", "profile"],
            redirectSignIn: "http://localhost:5173/",
            redirectSignOut: "http://localhost:5173/",
            responseType: "code"
        }
    }
};*/