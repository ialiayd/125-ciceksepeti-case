import React, { useEffect, useState, useRef } from 'react'

import css from "./ProductMain.module.scss";
import Image from "next/image"
import Link from "next/link"

import placeholderImg from "../../../public/images/loader.jpg";


function ProductCard({ product }) {

    const [imageError, setImageError] = useState(false);

    const handleImageError = (e) => {
        e.target.onerror = null;
        setImageError(true);
    }

    return (
        <div className={css.productCard__container}>
            <Link
                href={`/product/${product.id}`} as={`/product/${product.id}`}
            >
                <a className={css.productCard} title={`Ürüne git : ${product.brand} ${product.color}`}>
                    <figure>
                        <div className={css.productCard__imageWrapper}>

                            <Image src={
                                (product.imageUrl === "string" || imageError === true) ? placeholderImg : product.imageUrl
                            }
                                alt={`${product.brand} ${product.color}`}
                                className={css.productCard__image}
                                layout="fill"
                                unoptimized
                                onError={handleImageError}
                            />
                        </div>
                        <figcaption className={css.productCard__caption}>
                            <span className={css.productCard__caption_brand}>
                                {product.brand}
                            </span>
                            <span className={css.productCard__caption_color}>
                                <span className={css.productCard__caption_color_title}>
                                    Renk:&nbsp;
                                </span>
                                {product.color}
                            </span>
                        </figcaption>
                    </figure>
                    <div className={css.productCard__price}>
                        {product.price} TL
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ProductCard
