import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import css from "./NavButton.module.scss"

function NavButton({ type }) {
    return (
        <Link href={type.href}>
            <a className={css.navButton}>
                <Image src={type.src} alt={type.text} className={css.navButton_image} />
                <span className={css.navButton_text}>
                    {type.text}
                </span>
            </a>
        </Link>
    )
}

export default NavButton
//TODO: Make add product button responsive and hide its