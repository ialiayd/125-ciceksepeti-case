import React from 'react'
import { toCurrencyString } from '../../utilities/stringOperations';
import css from "./ProductGivenOffer.module.scss";

//api üzerinden kullanıcı verisine göre buraya ulaşan offer verilecek
function ProductGivenOffer({ offer }) {
    return (
        <div className={css.givenOffer}>
            <span className={css.givenOffer__title}>Verilen Teklif:&nbsp;</span>
            <span className={css.givenOffer__price}>{toCurrencyString(offer)} TL</span>
        </div>
    )
}

export default ProductGivenOffer
