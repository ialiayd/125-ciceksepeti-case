import React, { useRef, useState } from 'react'
import Link from "next/link"
import css from "./Category.module.scss"
import { toCapitalize } from "../../utilities/stringOperations"

function Category({ category }) {

    const [toggle, setToggle] = useState(false);


    const handleClick = (e) => {
        setToggle(true)
    }

    return (
        <li className={`${css.category__listItem} ${toggle && css.category__listItem_active}`}>
            <Link href={`/${category.id}`}>
                <a className={css.category__link} onClick={handleClick}>{toCapitalize(category.title)}</a>
            </Link>
        </li>
    )
}

export default Category
