import React, { useEffect, useState } from 'react'
import css from "./OfferGiven.module.scss";
import { toCurrencyString } from '../../../utilities/stringOperations';
import Image from "next/image";
import ModalHOC from '../../Modals/ModalHOC';
import ModalConfirm from '../../Modals/ModalConfirm/ModalConfirm';
import { getToken } from '../../../services/authService';
import { useDispatch } from 'react-redux';
import { notificationHandler } from '../../../actions/notification';
import { getGivenOffersFromApi } from '../../../actions/account';
import { putByAuthUrl } from '../../../services/apiService';
import apiEndpoints from '../../../constants/apiEndpoints';


function OfferGiven({ offer }) {

    const [modalShown, setModalShown] = useState(false);

    const dispatch = useDispatch();

    const handleApprove = () => {
        setModalShown(true);
    }

    const purchaseOffer = () => {
        const token = getToken();
        const productId = offer.product.id;
        setModalShown(false);
        putByAuthUrl(`${apiEndpoints.product.purchaseProduct}${productId}`, token)
            .then(response => {
                if (response[0]) {
                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: "Satın alındı."
                    }));
                    dispatch(getGivenOffersFromApi(token));
                }

                if (response[1] !== null) {
                    const err = response[1].toString().split(' ')[1];
                    let errorMessage = "";


                    if (err === "401") {
                        errorMessage = "Satın almak için giriş yapınız.";
                    }

                    else if (err === "400") {
                        errorMessage = "Kendi ürününüzü satın alamazsınız.";
                    }

                    else if (err === "404") {
                        errorMessage = "Ürün satın alınamaz.";
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

    const cancelPurchase = () => {
        setModalShown(false);
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
                    (offer.status === "accepted" && offer.isSold !== "sold") &&
                    <>
                        {
                            offer.product.isSold === false && <button
                                className={`${css.offer__btn} ${css.offer__btn__accept}`}
                                onClick={handleApprove}
                            >Satın Al</button>
                        }

                        <span className={`${css.offer__status} ${css.offer__status__approved}`}>Onaylandı</span>
                    </>
                }
                {
                    (offer.status === "rejected") &&
                    <span className={`${css.offer__status} ${css.offer__status__rejected}`}>Reddedildi</span>

                }
                {
                    (offer.status !== "rejected" && offer.isSold === "sold" && offer.product.isSold === true) &&
                    <span className={`${css.offer__status} ${css.offer__status__sold}`}>Satın Alındı</span>
                }
                {
                    (offer.product.isSold === false && offer.status === "offered") &&
                    <span className={`${css.offer__status} ${css.offer__status__waiting}`}>Teklif Beklemede</span>
                }



            </div>
            {
                modalShown === true && <ModalHOC display={modalShown}>
                    <ModalConfirm handleConfirm={purchaseOffer} handleCancel={cancelPurchase} />
                </ModalHOC>
            }
        </div >
    )
}

export default OfferGiven
