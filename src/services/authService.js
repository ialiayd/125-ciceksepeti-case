export const getToken = () => {
    return localStorage.getItem("Auth_Token") ? localStorage.getItem("Auth_Token") : false;
}

export const isUserAuthenticated = () => {
    const token = getToken();
    return token ? true : false;
}

export const saveToken = (str) => {
    try {
        localStorage.setItem("Auth_Token", str)
        return true;
    }
    catch {
        return false;
    }
}