import React, { useEffect, useState } from 'react'
import css from "./ButtonGroup.module.scss";


import ModalHOC from '../../Modals/ModalHOC';
import ModalConfirm from '../../Modals/ModalConfirm/ModalConfirm';
import ModalOffer from '../../Modals/ModalOffer/ModalOffer';

import { putByAuthUrl } from "../../../services/apiService";
import { isUserAuthenticated, getToken } from "../../../services/authService";
import { useRouter } from 'next/router';
import apiEndpoints from '../../../constants/apiEndpoints';
import { useDispatch } from 'react-redux';
import { notificationHandler } from '../../../actions/notification';


function ButtonGroup({ product, clientOffer }) {

    const [isOffer, setIsOffer] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);
    const [isOfferedProduct, setIsOfferedProduct] = useState(false);
    const [isSold, setIsSold] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    //TODO: ÜRÜN EKLEYİP BURAYI DEBUG ET

    useEffect(() => {
        (clientOffer !== null) && setIsOfferedProduct(true);
    }, [clientOffer])

    useEffect(() => {
        setIsSold(product.isSold);
    }, [])

    const showPurchaseModal = (e) => {
        setIsPurchase(true);
    }

    const showOfferModal = (e) => {
        setIsOffer(true);
    }

    const closeOfferModal = () => {
        setIsOffer(false);
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
                        console.log(response[1]);
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
                url: "/signin",

            })
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
                                        onClick={isOfferedProduct ? () => { } : showOfferModal}>
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
