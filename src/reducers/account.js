import * as types from "../constants/actionTypes"

const accountState = {
    error: {
        status: false,
        message: ""
    }
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
        case types.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return accountState;
    }
}

export default accountReducer;