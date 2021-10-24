import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import Link from "next/link"
import Router from 'next/router'
import css from "./AuthForm.module.scss"

import { validateEmail, validateStringLenghtByRange, removeEmptySpaces } from "../../utilities/stringOperations"

import apiEndpoints from '../../constants/apiEndpoints'
import { post } from '../../services/apiService'
import { saveToken, getToken } from "../../services/authService";
import router from 'next/router'


import { notificationHandler } from "../../actions/notification"

function AuthForm({ formType }) {

    const dispatch = useDispatch();

    let { title, text, btnText, action, endpoint } = formType;

    const [email, setEmail] = useState("");
    const [validEmail, setEmailValidation] = useState(true);

    const [pwd, setPwd] = useState("");
    const [validPwd, setPwdValitation] = useState(true);

    const [disabled, setDisabled] = useState(false);




    useEffect(() => {
        !validateEmail(email) ? setEmailValidation(false) : setEmailValidation(true)
    }, [email]);

    useEffect(() => {
        const valid = validateStringLenghtByRange(pwd, 8, 20);
        setPwdValitation(valid);
    }, [pwd])

    const handleEmailChange = (e) => {
        const { value } = e.target;
        const newValue = removeEmptySpaces(value);
        e.target.value = newValue;
        setEmail(newValue);
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        const newValue = removeEmptySpaces(value);
        e.target.value = newValue;
        setPwd(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validEmail === true && validPwd === true) {
            const url = apiEndpoints.authorization[endpoint];

            setDisabled(true);

            post(url, {
                "email": email,
                "password": pwd
            }).then(response => {
                if (response[0]) {
                    saveToken(response[0]["access_token"]);
                    router.push("/");
                }

                else if (response[1]) {

                    const err = response[1].toString().split(' ')[1];

                    let errorMessage = "";

                    if (err === "401") {
                        errorMessage = "Kullanıcı adı veya parola hatası";
                    }

                    else if (err === "409") {
                        errorMessage = "Bu email ile kayıtlı bir kullanıcı bulunmaktadır";
                    }
                    else {
                        errorMessage = "Bir hata oluştu. Daha sonra tekrar deneyin.";
                    }

                    dispatch(notificationHandler({
                        isOpen: true,
                        isError: false,
                        message: `${errorMessage}`
                    }))

                    setDisabled(false);
                }
            })
        }
    }

    return (
        <div className={css.form}>
            <h1 className={css.form__title}>{title}</h1>
            <p className={css.form__text}>{text}</p>
            <form className={css.form__inner} onSubmit={handleSubmit}>
                <div className={css.form__inputGroup}>

                    <label className={css.form__label}
                        htmlFor="email">Email</label>

                    <input className={`${css.form__input} ${validEmail === false && "invalid"}`}
                        type="email"
                        id="email"
                        autoComplete="off"
                        value={email}
                        placeholder="email@example.com"
                        onChange={handleEmailChange}
                        disabled={disabled}
                    />
                </div>
                <div className={css.form__inputGroup}>
                    <label className={css.form__label} htmlFor="password">Şifre</label>

                    <input
                        className={`${css.form__input} ${validPwd === false && "invalid"}`}
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                        minLength="8"
                        maxLength="20"
                        disabled={disabled}
                    />
                </div>
                <div className={css.form__inputGroup}>
                    <button className={`btn btn__lg btn__primary ${css.form__btn}`} type="submit"
                        disabled={disabled}>{btnText}</button>
                </div>
            </form>
            <p className={css.form__text}>
                {action.msg}&nbsp;
                <Link href={action.href}>
                    <a>{action.cta}</a>
                </Link>
            </p>
        </div>
    )
}

export default AuthForm
