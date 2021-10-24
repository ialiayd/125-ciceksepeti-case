import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGivenOffersFromApi } from '../../actions/account';
import { getToken } from '../../services/authService';
import NavButton from "../NavButton/NavButton"
import types from "../../constants/navButtonTypes"

//TODO: This section is responsible to get the login state and render the buttons according to is current visitor is logged in or not 
/*
use types constant with the render logic
*/

function NavButtonContainer() {

    const [loading, setloading] = useState(true);

    const dispatch = useDispatch();

    //TODO: Account içindeki bilgilere göre buradaki butonları render et
    const account = useSelector(state => state.account);
    useEffect(() => {
        console.log(account);
    }, [account])

    //TODO: State güvenle set edildi diğerleri için de kodları hazırla
    useEffect(() => {
        const token = getToken();
        if (token) {
            console.log(token);
            dispatch(getGivenOffersFromApi(token));
        }
    }, [])


    //TODO: render logic i kur
    return (
        <div>
            <NavButton type={types.addProduct} />
            <NavButton type={types.goToProfile} />
        </div>
    )
}

export default NavButtonContainer
