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

    return await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userKey
        }
    })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                return [null, response.status];
            }
        })
        .then((jsonResponse) => {
            // do whatever you want with the JSON response
            const data = jsonResponse;
            return [data, null]
        }).catch((error) => {
            // Handle the error
            return [null, error]
        });
}


export const getByIdAuth = async (endpoint, errorHandler) => {

}

export const post = async (url, data) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                return [null, response.status];
            }
        })
        .then((jsonResponse) => {
            // do whatever you want with the JSON response
            const data = jsonResponse;
            return [data, null]
        }).catch((error) => {
            // Handle the error
            return [null, error]
        });
}

export const postByAuth = async (data, token) => {

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