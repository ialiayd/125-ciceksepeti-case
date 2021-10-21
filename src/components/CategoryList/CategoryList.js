import React, { useState } from 'react'
import Category from "../Category/Category"
import css from "./CategoryList.module.scss"

function CategoryList({ categories }) {

    const [activeTab, setActiveTab] = useState("tumu");

    return (
        <div className={css.categories}>
            <ul className={css.categories__list}>
                <Category key={0} category={{ title: "Hepsi", id: "tumu" }} setTab={setActiveTab} isActive={activeTab === "tumu"} />
                {
                    categories.map((category, index) => {
                        return <Category key={category.id}
                            category={category}
                            isActive={activeTab === category.id}
                            setTab={setActiveTab}
                        />
                    })

                }
            </ul>
        </div>
    )
}

export default CategoryList
