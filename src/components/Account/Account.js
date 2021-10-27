import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getReceivedOffersFromApi } from '../../actions/account'
import { getToken, isUserAuthenticated } from '../../services/authService'

import PrivateRoute from '../CustomRoutes/PrivateRoute/PrivateRoute'
import Main from '../MainHOC/Main'
import css from "./Account.module.scss"
import Offers from './Offers/Offers'
import UserInfo from './UserInfo/UserInfo'


function Account() {

    return (
        <PrivateRoute page={"/profile"}>
            <Main>
                <div className={css.container}>
                    <div className={`${css.row}`}>
                        <UserInfo />
                    </div>
                    <Offers />
                </div>
            </Main>
        </PrivateRoute>
    )
}

export default Account
