import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import css from "./Notification.module.scss";
import Image from "next/image"

import failedIcon from "../../../public/icons/icon-failed.svg"
import successIcon from "../../../public/icons/icon-success.svg"


function Notification() {

    const state = useSelector(state => state.notification);
    const { isError, isOpen, message } = state;

    if (isOpen) {

        const cssClass = isError ? css.notification__danger : css.notification__success;

        const imageSrc = isError ? failedIcon : successIcon;

        return (
            <div className={`${css.notification} ${cssClass}`}>
                <span className={css.notification__imageWrapper}>
                    <Image
                        src={imageSrc}
                        className={css.notification__image}
                        alt=""
                    />
                </span>
                <span className={css.notification__message}>{message}</span>
            </div>
        )
    }

    return (
        <></>
    )
}


export default Notification
