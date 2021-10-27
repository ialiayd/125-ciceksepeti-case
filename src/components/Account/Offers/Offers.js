
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OfferReceived from '../OfferReceived/OfferReceived'
import OfferGiven from '../OfferGiven/OfferGiven'
import css from "./Offers.module.scss";
import { getGivenOffersFromApi, getReceivedOffersFromApi } from '../../../actions/account'
import { getToken } from '../../../services/authService';

function Offers() {

    const dispatch = useDispatch();

    const offerTypes = {
        receivedOffers: "receivedOffers",
        givenOffers: "givenOffers"
    }
    const state = useSelector(state => state.account);

    const [displayedOffers, setDisplayedOffers] = useState({
        key: offerTypes.receivedOffers,
        value: state[offerTypes.receivedOffers]
    });
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        dispatch(getGivenOffersFromApi(getToken()))
        dispatch(getReceivedOffersFromApi(getToken()))
    }, [])

    useEffect(() => {
        dispatch(getGivenOffersFromApi(getToken()))
        dispatch(getReceivedOffersFromApi(getToken()))
        console.log("111");
    }, [activeButton])


    const handleChange = (changedValue) => {
        setDisplayedOffers({
            key: offerTypes[changedValue],
            value: state[changedValue]
        });
        setActiveButton(activeButton === 0 ? 1 : 0);
    }

    return (
        <>
            <div className={css.tab}>
                <div className={css.tab__container}>
                    <button
                        className={`${css.tab__btn} ${activeButton === 0 && css.tab__btn__active}`} onClick={() => handleChange(offerTypes.receivedOffers)}>Teklif Aldıklarım</button>

                    <button className={`${css.tab__btn} ${activeButton === 1 && css.tab__btn__active}`} onClick={() => handleChange(offerTypes.givenOffers)}>Teklif Verdiklerim</button>
                </div>
            </div>
            <div className={css.offers}>
                {
                    displayedOffers.value.length > 0 ? displayedOffers.value.map(o =>
                        displayedOffers.key === offerTypes.receivedOffers ? <OfferReceived key={o.id} offer={o} /> : <OfferGiven key={o.id} offer={o} />

                    ) : <p>Gösterilecek Teklif Bulunamadı</p>
                }

            </div>
        </>
    )
}

export default Offers
