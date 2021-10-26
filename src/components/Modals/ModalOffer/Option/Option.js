import React, { useEffect, useState } from 'react'
import css from "./Option.module.scss"



function Option({ rate, active, handleSelected }) {

    const [state, setState] = useState(active);

    useEffect(() => {
        setState(active)
    }, [active])

    const adjuncts = {
        20: 'si',
        30: 'u',
        40: 'ı'
    }

    const handleClick = (e) => {
        handleSelected(rate);
    }

    return (
        <div
            className={`${css.option} ${state === true && css.option__active}`}
            onClick={handleClick}>
            <div
                className={`${css.check} ${state === true && css.check__selected}`}
            >
            </div>
            <p
                className={css.option__text}>{`%${rate}'${adjuncts[rate]} Kadar Teklif Ver`}
            </p>
        </div>
    )
}

export default Option
