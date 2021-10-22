import React, { useEffect, useState } from 'react'

import css from "./ProductMain.module.scss";
import Image from "next/image"
import Link from "next/link"

import Spinner from "../../../public/icons/icon-spinner.svg";


function ProductCard({ product }) {

    const [imageSrc, setImgSrc] = useState(Spinner);

    useEffect(() => {
        setImgSrc(product.imageUrl)
    }, [])

    return (
        <Link href={`/urun/${product.id}`}>
            <a className={css.productCard} title={`Ürüne git : ${product.brand} ${product.color}`}>
                <figure>
                    <div className={css.productCard__imageWrapper}>
                        <Image src={imageSrc}
                            alt={`${product.brand} ${product.color}`}
                            className={css.productCard__image}
                            layout="fill"
                            blurDataURL={imageSrc}
                            placeholder="blur"

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
    )
}

export default ProductCard
