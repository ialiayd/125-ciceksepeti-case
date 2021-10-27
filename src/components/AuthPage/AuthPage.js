import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import css from "./AuthPage.module.scss";
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/images/logo-sign.svg"
import AuthForm from '../AuthForm/AuthForm';
import authFormTypes from '../../constants/authFormTypes'
import PublicRoute from '../CustomRoutes/PublicRoute/PublicRoute';

function AuthPage() {

    const router = useRouter();

    const path = router.pathname.substr(1);

    return (
        <PublicRoute>
            <div className={css.page}>
                <div className={css.page__left}></div>

                <div className={css.page__right}>
                    <Link href="/" >
                        <a title="Anasayfaya git" className={css.page__right_logoBox}>
                            <Image
                                src={logo}
                                alt="İkinci El Project"
                                className={css.page__right_logo}
                            />
                        </a>
                    </Link>
                    <AuthForm formType={authFormTypes[path]} />
                </div>
            </div>
        </PublicRoute>
    )
}

export default AuthPage
