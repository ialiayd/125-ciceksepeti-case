import React from 'react'
import Image from "next/image"

import css from "./ProductDetail.module.scss";

import ProductGivenOffer from "../ProductGivenOffer/ProductGivenOffer"

import { toCapitalizeEach, toCurrencyString } from '../../utilities/stringOperations';

function ProductDetail({ product }) {

    console.log(product);

    return (
        <section className={css.productDetail}>

            <div className={css.productDetail__left}>
                <div className={css.productDetail__imageWrapper}>
                    <Image
                        className={css.productDetail__image}
                        src={product.imageUrl}
                        alt={toCapitalizeEach(product.title)}
                        layout="fill"
                    />
                </div>
            </div>

            <div className={css.productDetail__right}>
                <h1 className={css.productDetail__title}>
                    {toCapitalizeEach(product.title)}
                </h1>
                <ul className={css.productDetail__specList}>
                    <li className={css.productDetail__specList_item}>
                        <span>Marka:</span>
                        <span>{toCapitalizeEach(product.brand.title)}</span>
                    </li>

                    <li className={css.productDetail__specList_item}>
                        <span>Renk:</span>
                        <span>{toCapitalizeEach(product.color.title)}</span>
                    </li>

                    <li className={css.productDetail__specList_item}>
                        <span>Kullanım Durumu:</span>
                        <span>{toCapitalizeEach(product.status.title)}</span>
                    </li>
                </ul>
                <div className={css.productDetail__price}>
                    <div itemProp="price">
                        {toCurrencyString(product.price)} TL
                    </div>
                    <ProductGivenOffer offer={product.price} />
                </div>
                <div>
                    <button className="btn btn__primary btn__lg">Satın Al</button>
                    <button className="btn btn__secondary btn__lg">Teklif Ver</button>
                </div>
            </div>

        </section >
    )
}




export default ProductDetail
