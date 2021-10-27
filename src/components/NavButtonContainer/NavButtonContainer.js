import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGivenOffersFromApi, getReceivedOffersFromApi } from '../../actions/account';
import { getToken, isUserAuthenticated } from '../../services/authService';
import NavButton from "../NavButton/NavButton"
import types from "../../constants/navButtonTypes"

import css from "./NavbuttonContainer.module.scss"

//TODO: This section is responsible to get the login state and render the buttons according to is current visitor is logged in or not 
/*
use types constant with the render logic
*/

function NavButtonContainer() {

    const [loading, setloading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const dispatch = useDispatch();

    //TODO: Account içindeki bilgilere göre buradaki butonları render et
    const account = useSelector(state => state.account);
    useEffect(() => {
    }, [account])

    //TODO: State güvenle set edildi diğerleri için de kodları hazırla
    useEffect(() => {
        setloading(true);
        if (isUserAuthenticated()) {

            const token = getToken();

            dispatch(getGivenOffersFromApi(token));
            dispatch(getReceivedOffersFromApi(token))

            setIsAuth(true)
        }
        else {
            setIsAuth(false)
        }
        setloading(false);
    }, [dispatch])


    //TODO: render logic i kur
    return (
        <>
            {
                loading === true ? <div className={css.loading}></div>

                    :
                    <>
                        {
                            isAuth === true ? <div>
                                <NavButton type={types.addProduct} />
                                <NavButton type={types.goToProfile} />
                            </div>

                                : <div>
                                    <NavButton type={types.addProduct} />
                                    <NavButton type={types.login} />
                                </div>
                        }
                    </>
            }


        </>
    )
}

export default NavButtonContainer
