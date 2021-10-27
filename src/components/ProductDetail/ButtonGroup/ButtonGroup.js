import React, { useEffect, useState } from 'react'
import css from "./ButtonGroup.module.scss";


import ModalHOC from '../../Modals/ModalHOC';
import ModalConfirm from '../../Modals/ModalConfirm/ModalConfirm';
import ModalOffer from '../../Modals/ModalOffer/ModalOffer';

import { deleteByUrlAuth, putByAuthUrl } from "../../../services/apiService";
import { isUserAuthenticated, getToken } from "../../../services/authService";
import { useRouter } from 'next/router';
import apiEndpoints from '../../../constants/apiEndpoints';
import { useDispatch } from 'react-redux';
import { notificationHandler } from '../../../actions/notification';
import { useSelector } from 'react-redux';
import { setGivenOffers } from '../../../actions/account';


function ButtonGroup({ product, clientOffer }) {

    const [isOffer, setIsOffer] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);
    const [isOfferedProduct, setIsOfferedProduct] = useState(false);
    const [isSold, setIsSold] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const state = useSelector(state => state.account);
    //TODO: ÜRÜN EKLEYİP BURAYI DEBUG ET

    useEffect(() => {
        (clientOffer !== null) && setIsOfferedProduct(true);
        clientOffer && console.log(clientOffer);
    }, [clientOffer])

    useEffect(() => {
        setIsSold(product.isSold);
    }, [])

    const showPurchaseModal = (e) => {
        if (isUserAuthenticated()) {
            setIsPurchase(true);
        }
        else {
            router.push({
                pathname: '/signin',
                query: {
                    ...router.query,
                    page: "/product",
                    pid: product.id
                },
            });
        }
    }

    const showOfferModal = (e) => {
        if (isUserAuthenticated()) {
            setIsOffer(true);
        }
        else {
            router.push({
                pathname: '/signin',
                query: {
                    ...router.query,
                    page: "/product",
                    pid: product.id
                },
            });
        }
    }

    const closeOfferModal = () => {
        setIsOffer(false);
    }

    const cancelOffer = () => {
        if (isUserAuthenticated()) {

            const token = getToken();
            const offerId = clientOffer.id;

            deleteByUrlAuth(`${apiEndpoints.account.cancelOffer}${offerId}`, token)
                .then(response => {
                    setIsOfferedProduct(false);
                    (response[0] || response[1] === null) && dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: "Teklif Geri Çekildi."
                    }));
                    dispatch(
                        setGivenOffers(
                            state.givenOffers.filter(x => x.id !== offerId))
                    );

                    if (response[1] !== null) {
                        const err = response[1].toString().split(' ')[1];
                        let errorMessage = "";


                        if (err === "401") {
                            errorMessage = "Teklif Geri Çekilemez.";
                        }

                        else if (err === "400") {
                            errorMessage = "Teklif bulunamadı.";
                        }

                        else if (err === "404") {
                            errorMessage = "Teklif Bulunamadı.";
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
    }

    const cancelPurchase = () => {
        setIsPurchase(false);
    }

    const purchaseProduct = () => {

        if (isUserAuthenticated()) {
            const token = getToken();
            const productId = product.id;

            putByAuthUrl(`${apiEndpoints.product.purchaseProduct}${productId}`, token)
                .then(response => {
                    setIsPurchase(false);
                    setIsSold(true);
                    (response[0] || response[1] === null) && dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: "Satın alındı."
                    }));

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
                    setIsPurchase(false);
                })

        }
        else {
            setIsPurchase(false);
            router.push({
                pathname: '/signin',
                query: {
                    ...router.query,
                    page: "/product",
                    pid: product.id
                },
            });
        }


    }

    return (
        <>
            {
                (isSold)
                    ?
                    <>
                        <div className={css.buttonGroup__deactive}>
                            <p>Bu Ürün Satışta Değil</p>
                        </div>
                    </>
                    : <>
                        <div className={css.buttonGroup}>
                            <div>
                                {
                                    isSold === false &&
                                    <button
                                        className="btn btn__primary btn__lg"
                                        onClick={showPurchaseModal}>
                                        Satın Al</button>
                                }
                                {
                                    product.isOfferable &&
                                    <button
                                        className="btn btn__secondary btn__lg"
                                        onClick={isOfferedProduct ? cancelOffer : showOfferModal}>
                                        {isOfferedProduct ? "Teklifi Geri Çek" : "Teklif Ver"}
                                    </button>
                                }
                            </div>
                        </div>
                    </>

            }


            {<ModalHOC display={(isOffer || isPurchase)}>
                {
                    isOffer && <ModalOffer product={product} handleClose={closeOfferModal} setUnOfferable={setIsOfferedProduct} />
                }

                {
                    isPurchase && <ModalConfirm
                        handleCancel={cancelPurchase}
                        handleConfirm={purchaseProduct} />
                }
            </ModalHOC>}
        </>
    )
}

export default ButtonGroup
