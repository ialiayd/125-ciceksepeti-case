import React, { useEffect } from 'react'
import Image from "next/image"
import css from "./ProductDetail.module.scss";
import { useSelector } from "react-redux";

import { toCapitalizeEach, toCurrencyString } from '../../utilities/stringOperations';

import ProductGivenOffer from "../ProductGivenOffer/ProductGivenOffer"
import ButtonGroup from './ButtonGroup/ButtonGroup';


function ProductDetail({ product }) {

    //TODO: kullanıcı giriş yapmış ise state üzerinde yer alan given offers a göre üründe given offer var mı bak

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
                <table>
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
                    <ProductGivenOffer offer={product.price} />
                </div>
                <ButtonGroup />
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
