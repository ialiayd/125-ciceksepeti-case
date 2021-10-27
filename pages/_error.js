import React from 'react'
import Layout from '../src/components/Layout/Layout';
import Main from '../src/components/MainHOC/Main';
import Image from "next/image";
import Link from 'next/link';
import logo from "../public/logo-main.svg"
function Error({ statusCode }) {
    return (
        <Main>
            <div className="page404">
                <div className="page404__container">
                    <div className="page404__logo-box">
                        <Image src={logo}
                            layout="fill"
                            alt="Logo main"
                            unoptimized="true"
                            objectFit="contain"
                        />
                    </div>
                    <p className="page404__status">
                        {statusCode} Sayfa Bulunamadı
                    </p>
                </div>

                <div>
                    <Link href="/" as="/">
                        <a className="page404__link">Anasayfaya Git</a>
                    </Link>
                </div>
            </div>

        </Main>
    )
}

Error.Layout = Layout;

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error