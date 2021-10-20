import syles from "./Navigation.module.scss"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../public/logo-main.svg"
import NavButtonContainer from "../NavButtonContainer/NavButtonContainer"

function Navigation() {
    return (
        <nav className={syles.navigation}>
            <div className={syles.navigation__inner}>
                <div className={syles.navigation__logoBox}>
                    <Link href="/">
                        <a ><Image src={Logo} alt="İkinci El Project Logo" /></a>
                    </Link>
                </div>
                <NavButtonContainer />
            </div>
        </nav>
    )
}

export default Navigation
