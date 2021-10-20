import React from 'react'
import css from "./Header.module.scss";
import Image from "next/image"
import Banner from "../../../public/images/ikinci-el-project-banner.png"
import Banner2x from "../../../public/images/ikinci-el-project-banner@2x.png"

//TODO: use blur property to provide lazy loading

function Header() {
    return (
        <header className={css.header}>
            <div className="image__container">
                <Image srcSet={`${Banner} 1x, ${Banner2x} 2x`} alt="Tarzını Yansıtan Ürünleri Keşfet Banner" src={Banner2x} />
            </div>
        </header >
    )
}

export default Header
