import React from 'react'

import PrivateRoute from '../CustomRoutes/PrivateRoute/PrivateRoute'
import Main from '../MainHOC/Main'

function AddProduct() {
    return (
        <PrivateRoute page={"/add-product"}>
            <Main>
                <div>
                    <h1>Bu sayfa bitmedi.</h1>
                </div>
            </Main>
        </PrivateRoute>
    )
}

export default AddProduct
