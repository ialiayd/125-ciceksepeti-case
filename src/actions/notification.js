import * as types from "../constants/actionTypes"

export const setNotification = (notification) => (
    {
        type: types.SET_NOTIFICATION,
        payload: notification
    }
)

export const clearNotification = () => (
    {
        type: types.CLEAR_NOTIFICATION
    }
)


export const notificationHandler = (notification) => (dispatch) => {
    dispatch(setNotification(notification));

    setTimeout(() => dispatch(clearNotification()), 4000);
}