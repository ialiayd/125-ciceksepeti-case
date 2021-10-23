import React from 'react'
import apiEndpoints from "../../src/constants/apiEndpoints"
import { getByIdPublic } from "../../src/services/apiService"
import { useRouter } from "next/router";

import Layout from "../../src/components/Layout/Layout"

import Main from '../../src/components/MainHOC/Main'
import ProductDetail from '../../src/components/ProductDetail/ProductDetail'

function ProductPage({ product }) {

    const router = useRouter();

    !product.id && router.push("/404");

    return (
        <Main>
            <ProductDetail product={product} />
        </Main>
    )
}

ProductPage.Layout = Layout;

export default ProductPage

export const getServerSideProps = async ({ query }) => {

    const log = (e) => {
        console.log(e);
    }

    const productId = query.id;

    let product;

    if (productId) {
        const endpoint = apiEndpoints.product.productById + query.id;
        const res = await getByIdPublic(endpoint, log);
        product = res
    }
    else {
        product = null;
    }




    return {
        props: {
            product
        },
    }
}