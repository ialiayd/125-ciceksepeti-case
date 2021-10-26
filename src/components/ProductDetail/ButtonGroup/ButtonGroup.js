import React, { useEffect, useState } from 'react'
import css from "./ButtonGroup.module.scss";


import ModalHOC from '../../Modals/ModalHOC';
import ModalConfirm from '../../Modals/ModalConfirm/ModalConfirm';
import ModalOffer from '../../Modals/ModalOffer/ModalOffer';

function ButtonGroup({ product, offered }) {

    const [isOffer, setIsOffer] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);

    //TODO: ÜRÜN EKLEYİP BURAYI DEBUG ET

    useEffect(() => {
        // console.log(product);
    }, [])

    const handlePurchase = (e) => {
        setIsPurchase(true);
    }

    const handleOffer = (e) => {
        setIsOffer(true);
    }

    const closeOfferModal = () => {
        setIsOffer(false);
    }

    const handleRejectOffer = (e) => {
        console.log("Reject Offer");
    }

    const cancelPurchase = () => {
        console.log("Cancel");
        setIsPurchase(false);
    }

    const purchaseProduct = () => {
        console.log("Purchased");
        setIsPurchase(false);
    }


    return (
        <>
            {
                (product.isSold)
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
                                    product.isSold === false &&
                                    <button
                                        className="btn btn__primary btn__lg"
                                        onClick={handlePurchase}>
                                        Satın Al</button>
                                }
                                {
                                    product.isOfferable &&
                                    <button
                                        className="btn btn__secondary btn__lg"
                                        onClick={offered ? handleRejectOffer : handleOffer}>
                                        {offered ? "Teklifi Geri Çek" : "Teklif Ver"}
                                    </button>
                                }
                            </div>
                        </div>
                    </>

            }


            {<ModalHOC display={(isOffer || isPurchase)}>
                {
                    isOffer && <ModalOffer product={product} handleClose={closeOfferModal} />
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
