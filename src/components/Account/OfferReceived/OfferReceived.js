import React from 'react'
import css from "./OfferReceived.module.scss";
import Image from "next/image";
import ProductGivenOffer from "../../ProductGivenOffer/ProductGivenOffer";
import { toCurrencyString } from '../../../utilities/stringOperations';
import { useDispatch } from 'react-redux';


import { putByAuthUrl, postByAuthUrl } from '../../../services/apiService';
import apiEndpoints from '../../../constants/apiEndpoints';
import { getToken } from '../../../services/authService';
import { getReceivedOffersFromApi } from '../../../actions/account';
import { notificationHandler } from '../../../actions/notification';

function Offer({ offer }) {


    const dispatch = useDispatch();

    const handleApprove = () => {

        const token = getToken();

        putByAuthUrl(`${apiEndpoints.account.acceptOffer}${offer.id}`, token)
            .then(response => {
                if (response[0]) {
                    dispatch(getReceivedOffersFromApi(token));

                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: "Teklif Onaylandı."
                    }));
                }

                if (response[1] !== null) {
                    const err = response[1].toString().split(' ')[1];
                    let errorMessage = "";


                    if (err === "401") {
                        errorMessage = "Teklif onaylamak için giriş yapınız.";
                    }

                    else if (err === "400") {
                        errorMessage = "Teklif onaylanamadı";
                    }

                    else if (err === "404") {
                        errorMessage = "Teklif onaylanamaz";
                    }

                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: true,
                        message: `${errorMessage}`
                    }))

                }
            })
            .catch(err => {
                dispatch(notificationHandler({
                    isOpen: true,
                    isError: true,
                    message: `${err}`
                }))
            })
    }

    const handleReject = () => {
        const token = getToken();

        postByAuthUrl(`${apiEndpoints.account.rejectOffer}${offer.id}`, token)
            .then(response => {
                if (response[0]) {
                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: "Teklif Reddedildi."
                    }));
                    dispatch(getReceivedOffersFromApi(token));
                }

                if (response[1] !== null) {
                    const err = response[1].toString().split(' ')[1];
                    let errorMessage = "";


                    if (err === "401") {
                        errorMessage = "Teklif reddetmek için giriş yapınız.";
                    }

                    else if (err === "400") {
                        errorMessage = "Teklif reddetme işlemi başarısız.";
                    }

                    else if (err === "404") {
                        errorMessage = "Teklif işlemi yapılamıyor...";
                    }

                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: true,
                        message: `${errorMessage}`
                    }))

                }
            })
            .catch(err => {
                dispatch(notificationHandler({
                    isOpen: true,
                    isError: true,
                    message: `${err}`
                }))
            })
    }

    return (
        <div className={css.offer}>
            <div className={css.offer__imageWrapper}>
                <Image
                    src={offer.product.imageUrl}
                    alt={offer.title}
                    unoptimized="true"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={css.offer__info}>
                <h3 className={css.offer__title}>{offer.product.title}</h3>

                <div className={css.offer__info__given}>
                    <span className={css.offer__info__title}>Alınan Teklif:&nbsp;</span>
                    <span className={css.offer__info__price}>{toCurrencyString(offer.offeredPrice)} TL</span>
                </div>

            </div>
            <div className={css.offer__btnContainer}>

                {
                    (offer.status === "accepted" || offer.product.isSold === true && offer.status === "offered") &&
                    <>
                        <span className={`${css.offer__status} ${css.offer__status__approved}`}>Onaylandı</span>
                    </>
                }
                {
                    (offer.status === "rejected") &&
                    <span className={`${css.offer__status} ${css.offer__status__rejected}`}>Reddedildi</span>

                }
                {
                    (offer.product.isSold === false && offer.status === "offered" && offer.isSold !== "sold") &&
                    <>
                        <button
                            className={`${css.offer__btn} ${css.offer__btn__accept}`}
                            onClick={handleApprove}
                        >Onayla</button>
                        <button
                            className={`${css.offer__btn} ${css.offer__btn__reject}`}
                            onClick={handleReject}
                        >Reddet</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Offer
