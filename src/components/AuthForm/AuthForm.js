import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import Router from 'next/router'
import css from "./AuthForm.module.scss"

import { validateEmail, validateStringLenghtByRange, removeEmptySpaces } from "../../utilities/stringOperations"

import apiEndpoints from '../../constants/apiEndpoints'
import { post } from '../../services/apiService'
import { saveToken, getToken } from "../../services/authService";

function AuthForm({ formType }) {

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

            post(url, {
                "email": email,
                "password": pwd
            }).then(response => {
                saveToken(response[0]["access_token"]);
            }).catch(response => {
                console.log(response[1]);
            });
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
                    />
                </div>
                <div className={css.form__inputGroup}>
                    <button className={`btn btn__lg btn__primary ${css.form__btn}`} type="submit">{btnText}</button>
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
