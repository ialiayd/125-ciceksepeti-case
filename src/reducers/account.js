import * as types from "../constants/actionTypes"

const accountState = {
    receivedOffers: [],
    givenOffers: []
}

const accountReducer = (state = accountState, action) => {
    switch (action.type) {
        case types.SET_GIVEN_OFFERS:
            return {
                ...state,
                givenOffers: action.payload
            }
        case types.SET_RECEIVED_OFFERS:
            return {
                ...state,
                receivedOffers: action.payload
            }
        default:
            return state;
    }
}

export default accountReducer;