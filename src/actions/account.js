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


export const getGivenOffersFromApi = (userKey) => async (dispatch) => {

    const [data, err] = await getByAuthAll(apiEndpoints.account.givenOffers, userKey);
    if (data !== null) {
        dispatch(setGivenOffers(data));
    }
    if (err !== null) {
        console.log(err);
    }
}

export const getReceivedOffersFromApi = (userKey) => async (dispatch) => {

    const [data, err] = await getByAuthAll(apiEndpoints.account.receivedOffers, userKey);
    if (data !== null) {
        dispatch(setReceivedOffers(data));
    }
    if (err !== null) {
        console.log(err);
    }
}