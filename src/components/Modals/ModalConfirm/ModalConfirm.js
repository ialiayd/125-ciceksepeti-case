import React from 'react'
import css from "./ModalConfirm.module.scss"

function ModalConfirm({ handleCancel, handleConfirm }) {
    return (
        <div className={css.confirm}>
            <h3 className={css.confirm__title}>Satın Al</h3>
            <p className={css.confirm__text}>Satın Almak istiyor musunuz?</p>
            <div className={css.confirm__btn}>
                <button
                    className={`btn btn__md btn__secondary`}
                    onClick={handleCancel}
                >Vazgeç</button>

                <button
                    className={`btn btn__md btn__primary`}
                    onClick={handleConfirm}
                >Satın Al</button>
            </div>
        </div>
    )
}

export default ModalConfirm
