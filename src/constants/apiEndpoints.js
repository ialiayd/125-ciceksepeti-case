
const url = "https://bootcampapi.techcs.io/api/fe/v1";

const apiEndpoints = {
    file: {
        uploadImage: `${url}/file/upload/image`,
    },
    color: {
        allColors: `${url}/detail/color/all`,
        colorById: `${url}/detail/color/`,
    },
    brand: {
        allBrands: `${url}/detail/brand/all`,
        brandById: `${url}/detail/brand/`,
    },
    product: {
        allProductStatus: `${url}/detail/status/all`,
        productStatusById: `${url}/detail/status/`,
        allProducts: `${url}/product/all`,
        productById: `${url}/product/`,
        createProduct: `${url}/product/create`,
        offerProduct: `${url}/product/offer/`,
        purchaseProduct: `${url}/product/offer/`,
    },
    account: {
        givenOffers: `${url}/account/given-offers`,
        receivedOffers: `${url}/account/received-offers`,
        rejectOffer: `${url}/account/reject-offer/`,
        acceptOffer: `${url}/account/accept-offer/`,
        cancelOffer: `${url}/account/cancel-offer/`,
    },
    category: {
        allCategories: `${url}/detail/category/all`,
        categoryById: `${url}/detail/category/`,
    },
    authorization: {
        signIn: `${url}/authorization/signin`,
        signUp: `${url}/authorization/signup`,
    }

}

export default apiEndpoints;