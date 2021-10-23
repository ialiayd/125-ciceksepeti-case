const getToken = () => {
    return JSON.parse(localStorage.getItem("sessionToken"));
}

const isUserAuthenticated = () => {
    const token = getToken();
    return token ? true : false;
}

const saveToken = (str) => {
    try {
        localStorage.setItem("sessionToken", JSON.stringify(str))
        return true;
    }
    catch {
        return false;
    }
}