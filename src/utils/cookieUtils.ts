import Cookies from 'js-cookie';

export const getCookie = (name:string) =>{
    return Cookies.get(name);
}

export const removeCookie = (name:string) => {
    Cookies.remove(name);
}