import * as types from "../constants/actionTypes"

const accountState = {
}

const accountReducer = (state = accountState, action) => {
    switch (action.type) {
        case types.GIVEN_OFFERS:
            return {
                ...state,
                givenOffers: action.payload
            }
        default:
            return accountState;
    }
}

export default accountReducer;