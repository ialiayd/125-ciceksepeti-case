import React, { useEffect, useState } from 'react'
import css from "./ModalOffer.module.scss";

import Image from "next/image"

import Option from './Option/Option';
import { toCurrencyString } from "../../../utilities/stringOperations";

function ModalOffer({ product, handleClose }) {

    const [inputValue, setInputValue] = useState("");
    const [activeRate, setActiveRate] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
        if (activeRate !== 0 || offerPrice > 0) {
            activeRate !== 0 ? console.log(Math.round((product.price / activeRate) * 100))
                : console.log(Math.round(offerPrice))
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
