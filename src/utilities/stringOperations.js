export const toCapitalize = (str) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export const toCurrencyString = (num) => {
    return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}