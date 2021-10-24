import * as types from "../constants/actionTypes"
import { getByAuthAll } from "../services/apiService"
import apiEndpoints from "../constants/apiEndpoints"

export const setGivenOffers = (offers) => (
    {
        type: types.SET_GIVEN_OFFERS,
        payload: offers
    }
)

export const setReceivedOffers = (offers) => (
    {
        type: types.SET_RECEIVED_OFFERS,
        payload: offers
    }
)


export const setError = (error) => (
    {
        type: types.SET_ERROR,
        payload: error
    }
)


export const getGivenOffersFromApi = (userKey) => async (dispatch) => {

    const [data, err] = await getByAuthAll(apiEndpoints.account.givenOffers, userKey);
    if (!!data) {
        console.log(data);
        dispatch(setGivenOffers(data));
    }
    if (!!err) {

        console.log(err);
        dispatch(setError({
            status: true,
            message: "Sipariş listesi alınamadı."
        }))
    }

}