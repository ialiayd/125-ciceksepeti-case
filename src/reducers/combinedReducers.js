import { combineReducers } from 'redux'

import modalReducer from "./modal"
import accountReducer from "./account"


// COMBINED REDUCERS
const reducers = {
    account: accountReducer,
    modalState: modalReducer
}

export default combineReducers(reducers)
