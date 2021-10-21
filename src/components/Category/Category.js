import React, { useRef, useState } from 'react'
import Link from "next/link"
import css from "./Category.module.scss"
import { toCapitalize } from "../../utilities/stringOperations"
import { useRouter } from 'next/router'

function Category({ category, isActive, setTab }) {


    const router = useRouter();

    const ref = useRef();

    const appendQuery = (cat) => {
        router.push({ pathname: "/", query: { kategori: cat } });
    };

    const handleClick = (e) => {
        e.preventDefault();
        appendQuery(category.id);
        setTab(category.id)
        // console.log(ref.current.className += ` ${css.category__listItem_active}`);
    }

    return (
        <li ref={ref} className={`${css.category__listItem} ${isActive && css.category__listItem_active}`}>
            <Link href={{
                pathname: '/',
                query: { kategori: category.id },
            }}>
                <a className={css.category__link} onClick={handleClick}>{toCapitalize(category.title)}</a>
            </Link>
        </li>
    )
}

export default Category
