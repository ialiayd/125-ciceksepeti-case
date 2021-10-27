import React, { useEffect } from 'react'
import apiEndpoints from "../../src/constants/apiEndpoints"
import { getByIdPublic } from "../../src/services/apiService"
import { useRouter } from "next/router";

import Layout from "../../src/components/Layout/Layout"

import Main from '../../src/components/MainHOC/Main'
import ProductDetail from '../../src/components/ProductDetail/ProductDetail'

function ProductPage({ product }) {

    const router = useRouter();

    !product && router.push("/404");

    return (
        <Main>
            <ProductDetail product={product} />
        </Main>
    )
}

ProductPage.Layout = Layout;

export default ProductPage

export const getServerSideProps = async ({ query, req }) => {


    const productId = query.id;

    let product;

    if (productId) {
        const endpoint = apiEndpoints.product.productById + query.id;
        const res = await getByIdPublic(endpoint);
        product = res ? res : null;
    }

    if (!product) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            product
        },
    }
}