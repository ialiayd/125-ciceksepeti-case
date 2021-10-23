export const getAllPublic = async (endpoint, errorHandler) => {

}

export const getByIdPublic = async (endpoint, errorHandler) => {

    try {
        const response = await fetch(endpoint);
        return response.json();

    } catch (error) {
        errorHandler(error);
    }

}

export const getByAuthAll = async (endpoint, userKey) => {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            header: new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + userKey
            })
        });
        const data = response.json();
        return [data, null];
    } catch (error) {
        console.log(error);
        return [null, error];
    }
}


export const getByIdAuth = async (endpoint, errorHandler) => {

}

export const post = async (data, token) => {

}

export const put = async (data, token) => {

}

export const deleteData = async (data, token) => {

}


// fetch(url)
//   .then((response) => {
//     if (response.status >= 200 && response.status <= 299) {
//       return response.json();
//     } else {
//       throw Error(response.statusText);
//     }
//   })
//   .then((jsonResponse) => {
//     // do whatever you want with the JSON response
//   }).catch((error) => {
//     // Handle the error
//     console.log(error);
//   });