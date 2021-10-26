import React, { useEffect, useState } from 'react'
import css from "./ModalHOC.module.scss";

function ModalHOC({ children, display = false }) {

    const [modalState, setModalState] = useState(false);
    const [activeClass, setActiveClass] = useState();

    useEffect(() => {
        setModalState(display !== null ? display : false);
    }, [display])

    useEffect(() => {
        setActiveClass(`${modalState === false
            ? css.modal__passive : css.modal__active}`);
    }, [modalState])

    return (
        <div className={`${css.modal} ${activeClass}`}>
            <div
                className={`${css.modal__content}`}>
                {children}
            </div>
        </div>
    )
}

export default ModalHOC
