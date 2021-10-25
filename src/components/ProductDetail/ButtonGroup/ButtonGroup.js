import React from 'react'
import css from "./ButtonGroup.module.scss";

function ButtonGroup() {
    return (
        <div className={css.buttonGroup}>
            <div>
                <button className="btn btn__primary btn__lg">Satın Al</button>
                <button className="btn btn__secondary btn__lg">Teklif Ver</button>
            </div>
        </div>
    )
}

export default ButtonGroup
