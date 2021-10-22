import React from 'react'
import css from "./ProductList.module.scss"

import ProductCard from "../ProductMain/ProductMain"

function ProductList({ products }) {
    return (
        <section className={css.productList}>
            {
                products.map(p => (<ProductCard key={p.id} product={p} />))
            }
        </section>
    )
}

export default ProductList
//DONE: Productlar render edilecek