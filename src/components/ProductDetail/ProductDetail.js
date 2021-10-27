import React, { useEffect, useState } from 'react'
import Image from "next/image"
import css from "./ProductDetail.module.scss";
import { useSelector } from "react-redux";
import { toCapitalizeEach, toCurrencyString } from '../../utilities/stringOperations';

import ProductGivenOffer from "../ProductGivenOffer/ProductGivenOffer"
import ButtonGroup from './ButtonGroup/ButtonGroup';

import placeholder from "../../../public/images/placeholder700.jpg";
import { useRouter } from 'next/router';

function ProductDetail({ product }) {

    //TODO: kullanıcı giriş yapmış ise state üzerinde yer alan given offers a göre üründe given offer var mı bak
    const [clientOffer, setClientOffer] = useState(null);

    const [imageError, setImageError] = useState(false);

    const state = useSelector(state => state.account);

    const router = useRouter();

    !product && router.push("/404");

    useEffect(() => {
        if (state.givenOffers && state.givenOffers.length > 0) {
            //Get the last offer
            let offers = state.givenOffers.filter(o => o.product.id === product.id && o.status !== "rejected");
            let offer = offers.length > 1 ? [offers.length - 1] : offers[0];
            offer && setClientOffer(offer);
        }
    }, [state])

    const handleImageError = (e) => {
        setImageError(true);
    }

    return (
        <section className={css.productDetail}>
            <div className={css.productDetail__left}>
                <div className={css.productDetail__imageWrapper}>
                    <Image
                        className={css.productDetail__image}
                        src={
                            (product.imageUrl === "string" || imageError === true) ? placeholder : product.imageUrl
                        }
                        alt={toCapitalizeEach(product.title)}
                        layout="fill"
                        unoptimized={true}
                        onError={handleImageError}
                    />
                </div>
            </div>

            <div className={css.productDetail__right}>
                <h1 className={css.productDetail__title}>
                    {toCapitalizeEach(product.title)}
                </h1>
                <table className={css.productDetail__table}>
                    <tbody className={css.productDetail__specs}>
                        <tr className={css.productDetail__specs_row}>
                            <td><span>Marka:</span></td>
                            <td><span>{toCapitalizeEach(product.brand.title)}</span></td>
                        </tr>
                        <tr className={css.productDetail__specs_row}>
                            <td><span>Renk:</span></td>
                            <td><span>{toCapitalizeEach(product.color.title)}</span></td>
                        </tr>
                        <tr className={css.productDetail__specs_row}>
                            <td><span>Kullanım Durumu:</span></td>
                            <td><span>{toCapitalizeEach(product.status.title)}</span></td>
                        </tr>
                    </tbody>
                </table>

                <div className={css.productDetail__price}>
                    <div itemProp="price">
                        {toCurrencyString(product.price)} TL
                    </div>
                    {(clientOffer && product.isSold === false) &&
                        <ProductGivenOffer offer={clientOffer.offeredPrice} />
                    }
                </div>

                <ButtonGroup product={product} clientOffer={clientOffer} />

                <div className={css.productDetail__description}>
                    <h2 className={css.productDetail__description_title}>Açıklama</h2>
                    <p className={css.productDetail__description_text}>
                        {product.description}
                    </p>
                </div>
            </div>
        </section >
    )
}




export default ProductDetail
