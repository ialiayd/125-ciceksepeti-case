import React, { useEffect, useState } from 'react'
import css from "./ModalOffer.module.scss";
import Image from "next/image"

import Option from './Option/Option';

import { toCurrencyString } from "../../../utilities/stringOperations";
import apiEndpoints from '../../../constants/apiEndpoints';
import { getToken, isUserAuthenticated } from '../../../services/authService';
import { postByAuth } from '../../../services/apiService';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getGivenOffersFromApi } from "../../../actions/account"
import { notificationHandler } from "../../../actions/notification";

function ModalOffer({ product, handleClose }) {

    const [inputValue, setInputValue] = useState("");
    const [activeRate, setActiveRate] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const router = useRouter();
    const state = useSelector(state => state.account);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(inputValue);
        setOfferPrice(Number(inputValue));
        inputValue.length === 0 && setButtonDisabled(true);
    }, [inputValue]);

    useEffect(() => {
        offerPrice > 0 && setButtonDisabled(false);
        activeRate !== 0 && setButtonDisabled(false);
    }, [activeRate, offerPrice])



    const handleSelected = (rate) => {
        setActiveRate(Number(rate));
    }

    const handleInputChange = (e) => {
        if (e.target.validity.valid && e.target.value.length <= 13) {
            setInputValue(e.target.value);

        }
        else {
            e.preventDefault();
        }
    }

    const handleInputFocus = () => {
        setActiveRate(0);
    }

    const handleOffer = () => {
        //api ye product id, user key ve offer fiyatını gönder
        if (isUserAuthenticated()) {

            const token = getToken();
            let offeredPrice;
            if (activeRate !== 0) {
                offeredPrice = Math.round((product.price / 100) * activeRate);
            }

            else if (offerPrice > 0) {
                offeredPrice = Math.round(offerPrice)
            }

            if (offeredPrice > 0) {
                postByAuth(`${apiEndpoints.product.offerProduct}${product.id}`, token, { offeredPrice })
                    .then(resp => {
                        if (resp[0] !== null) {
                            dispatch(getGivenOffersFromApi(token));
                            setUnOfferable(true)
                            dispatch(notificationHandler({
                                isOpen: true,
                                isError: false,
                                message: "Ürün teklifi başarıyla yapıldı."
                            }));
                        }
                        else {
                            const err = resp[1].toString().split(' ')[1];

                            let errorMessage = "";

                            if (err === "401") {
                                errorMessage = "Teklif yapmak için giriş yapınız";
                            }

                            else if (err === "400") {
                                errorMessage = "Bu ürüne teklif veremezsiniz.";
                            }

                            else if (err === "404") {
                                errorMessage = "Ürün teklif edilebilir bulunamadı.";
                            }
                            else {
                                errorMessage = "Bir hata oluştu. Daha sonra tekrar deneyin.";
                            }

                            dispatch(notificationHandler({
                                isOpen: true,
                                isError: true,
                                message: `${errorMessage}`
                            }))

                            handleClose();
                        }
                    })
                    .catch(err => dispatch(notificationHandler({
                        isOpen: true,
                        isError: true,
                        message: `${err}`
                    })));
            }
            handleClose();
        }

        else {
            router.push({
                pathname: "/signin",
                query: {
                    from: router.pathname
                }
            });
        }



    }

    return (
        <div className={css.modalOffer}>
            <div className={css.modalOffer__head} >
                <h3 className={css.modalOffer__title}>Teklif Ver</h3> <button
                    className={css.modalOffer__close}
                    onClick={handleClose}
                >&times;</button>
            </div>
            <div className={css.modalOffer__product} >
                <div className={css.modalOffer__imageWrapper}>
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        layout="fill"
                        unoptimized={true}
                        objectFit="contain"
                        className={css.modalOffer__image}
                    />
                </div>
                <p className={css.modalOffer__productText}>{product.title}
                </p>
                <span className={css.modalOffer__price}>
                    {toCurrencyString(product.price)}&nbsp;TL
                </span>
            </div>
            <div className={css.modalOffer__options}>
                {
                    [20, 30, 40].map(x => <Option
                        key={x}
                        rate={x}
                        handleSelected={handleSelected}
                        active={activeRate === x} />)
                }
                <div className={css.modalOffer__inputBox}>
                    <input type="text"
                        placeholder="Teklif Belirle"
                        className={css.modalOffer__input}
                        value={inputValue}
                        onInput={handleInputChange}
                        onFocus={handleInputFocus}
                        pattern="[0-9]*"
                    />
                    <span className={css.modalOffer__inputCurrency}>TL</span>
                </div>
            </div>
            <div>
                <button
                    className={`btn btn__lg btn__primary ${css.modalOffer__button}`}
                    onClick={handleOffer}
                    disabled={buttonDisabled}
                >Onayla</button>

            </div>
        </div>
    )
}

export default ModalOffer
