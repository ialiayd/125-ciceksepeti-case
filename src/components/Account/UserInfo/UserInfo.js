import React from 'react'

import Image from "next/image";

import avatar from "../../../../public/images/avatar.png";

import css from "./UserInfo.module.scss";

function UserInfo() {
    return (
        <div className={css.user}>
            <div className={css.user__avatarBox}>
                <Image
                    src={avatar}
                    alt="user pic" />
            </div>
            <p className={css.user__mail}>alitest@test.com</p>
        </div>
    )
}

export default UserInfo
