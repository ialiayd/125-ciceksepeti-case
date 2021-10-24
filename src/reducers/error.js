import * as types from "../constants/actionTypes"

const errorState = {
    status: false,
    message: ""
}

const errorReducer = (state = state, action) => {
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
        case types.SET_RECEIVED_OFFERS:
            return {
                ...state,
                receivedOffers: action.payload
            }
        default:
            return accountState;
    }
}