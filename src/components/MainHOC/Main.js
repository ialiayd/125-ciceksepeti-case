import React from 'react'

import css from "./Main.module.scss"

function Main({ children }) {
    return (
        <main className={css.main}>
            {children}
        </main>
    )
}

export default Main
