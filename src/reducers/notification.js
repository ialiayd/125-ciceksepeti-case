import * as types from "../constants/actionTypes"

const notificationState = {
    isOpen: false,
    isError: false,
    message: ""
}

const notificationReducer = (state = notificationState, action) => {
    switch (action.type) {
        case types.SET_NOTIFICATION:
            return {
                ...action.payload
            }

        case types.CLEAR_NOTIFICATION:
            return {
                isOpen: false,
                isError: false,
                message: ""
            }
        default:
            return state;
    }
}

export default notificationReducer;