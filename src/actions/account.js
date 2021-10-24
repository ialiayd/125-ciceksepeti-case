import * as types from "../constants/actionTypes"
import { getByAuthAll } from "../services/apiService"
import apiEndpoints from "../constants/apiEndpoints"
import { setNotification } from "./notification"

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
        console.log(data);
        dispatch(setGivenOffers(data));
    }
    if (err !== null) {
        console.log(err);
    }

}