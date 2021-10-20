import iconAdd from "../../public/icons/icon-add.svg"
import iconProfile from "../../public/icons/icon-profile.svg"



const types = {
    addProduct: {
        src: iconAdd,
        text: "Ürün Ekle",
        href: "/add-product"
    },
    goToProfile: {
        src: iconProfile,
        text: "Hesabım",
        href: "/profile"
    },
    login: {
        src: iconProfile,
        text: "Giriş Yap",
        href: "/login"
    }
}

export default types