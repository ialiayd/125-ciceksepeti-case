import React, { useRef, useState } from 'react'
import Link from "next/link"
import css from "./Category.module.scss"
import { toCapitalize } from "../../utilities/stringOperations"
import { useRouter } from 'next/router'

function Category({ category }) {

    const [toggle, setToggle] = useState(false);

    const router = useRouter();

    const appendQuery = (cat) => {
        // router.query.kategori = cat;
        // router.push(router);
        router.push({ pathname: "/", query: { kategori: cat } });
    };

    const handleClick = (e) => {
        e.preventDefault();
        appendQuery(category.id)
        setToggle(true);
    }

    return (
        <li className={`${css.category__listItem} ${toggle && css.category__listItem_active}`}>
            <Link href="#">
                <a className={css.category__link} onClick={handleClick}>{toCapitalize(category.title)}</a>
            </Link>
        </li>
    )
}

export default Category
