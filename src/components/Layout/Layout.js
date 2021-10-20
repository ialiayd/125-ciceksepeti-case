import React from 'react'

import Navigation from '../Navigation/Navigation'
import layoutStyles from "./Layout.module.scss"

function Layout({ children }) {
    return (
        <>
            <div className={layoutStyles.container}>
                <Navigation />
                {children}
            </div>
        </>
    )
}

export default Layout
