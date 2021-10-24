import { combineReducers } from 'redux'

import accountReducer from "./account"
import notificationReducer from "./notification"


// COMBINED REDUCERS
const reducers = {
    account: accountReducer,
    notification: notificationReducer
}

export default combineReducers(reducers)
