import * as types from "../constants/actionTypes"
import { getByAuthAll } from "../services/apiService"
import apiEndpoints from "../constants/apiEndpoints"

export const setGivenOffers = (offers) => (
    {
        type: types.SET_GIVEN_OFFERS,
        payload: offers
    }
)

export const setReceivedOffers = () => {

}



export const setGivenOffersFromApi = (userKey) => {
    return async (dispatch) => {
        const [data, error] = await getByAuthAll(apiEndpoints.givenOffers, userKey);
        if (error) {
            console.log(error);

        }
    }
}