import { combineReducers } from 'redux'

import accountReducer from "./account"


// COMBINED REDUCERS
const reducers = {
    account: accountReducer
}

export default combineReducers(reducers)
