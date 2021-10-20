import React from 'react'
import Category from "../Category/Category"
import css from "./CategoryList.module.scss"

function CategoryList({ categories }) {


    const data = [
        {
            "id": "DuucIuRejjB4nVJOAwbG",
            "title": "sweatshirt"
        },
        {
            "title": "pantolon",
            "id": "E2RZNK56oVlPHx1rpMEd"
        },
        {
            "title": "gömlek",
            "id": "EAxL5ERqwiGzcnWQUpb5"
        },
        {
            "id": "F2M107NYaLXAkpc6tNxp",
            "title": "mont"
        },
        {
            "title": "tişört",
            "id": "USR80XNgmcVJrVWlU92G"
        },
        {
            "id": "Uw7aGIK51TFvKTCK344J",
            "title": "polar"
        },
        {
            "title": "şort",
            "id": "ay5D4lTDr7ptj3bg3pQc"
        },
        {
            "id": "rM65sYM4QAmLhAyJUpIY",
            "title": "kazak"
        },
        {
            "title": "ayakkabı",
            "id": "vHdbZttbtnFsab3GjstF"
        }
    ]

    return (
        <div className={css.categories}>
            <ul className={css.categories__list}>
                <Category key={0} category={{ title: "Hepsi", id: "hepsi" }} />
                {
                    data.map((category, index) => {
                        return <Category key={category.id} category={category} />
                    })

                }
            </ul>
        </div>
    )
}

export default CategoryList
