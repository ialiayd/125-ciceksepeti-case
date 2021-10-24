const authFormTypes = {
    signup: {
        endpoint: "signUp",
        title: "Üye Ol",
        text: "Fırsatlardan yararlanmak için üye ol!",
        btnText: "Üye Ol",
        action: {
            msg: "Hesabın var mı?",
            cta: "Giriş Yap",
            href: "/signin"
        }
    },
    signin: {
        endpoint: "signIn",
        title: "Giriş Yap",
        text: "Fırsatlardan yararlanmak için giriş yap!",
        btnText: "Giriş",
        action: {
            msg: "Hesabın yok mu?",
            cta: "Üye Ol",
            href: "/signup"
        }
    }
}

export default authFormTypes;