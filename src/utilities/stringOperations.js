export const toCapitalize = (str) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export const toCapitalizeEach = (str) => {
    const arr = str.split(' ');
    return arr.map(w => toCapitalize(w)).join(' ');
}

export const toCurrencyString = (num) => {
    return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

export const validateStringLenghtByRange = (str, min, max) => {
    return (str.length >= min && str.length <= max);
}

export const removeEmptySpaces = (str) => {
    return str.replace(/\s/g, "").trim();
}