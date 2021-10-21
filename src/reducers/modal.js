import * as types from "../constants/actionTypes"

const modalState = {
    show: false
}

const modalReducer = (state = modalState, action) => {
    switch (action.type) {
        case types.CHANGE_VISIBILITY: {
            return {
                ...state,
                show: !state.show
            }
        }
        default: return state
    }
}

export default modalReducer;