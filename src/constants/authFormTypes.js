const authFormTypes = {
    signup: {
        title: "Üye Ol",
        text: "Fırsatlardan yararlanmak için üye ol!",
        btnText: "Üye Ol",
        action: {
            message: "Hesabın var mı?",
            cta: "Giriş Yap",
            action: "/signin"
        }
    },
    signin: {
        title: "Giriş Yap",
        text: "Fırsatlardan yararlanmak için giriş yap!",
        btnText: "Giriş",
        action: {
            message: "Hesabın yok mu?",
            cta: "Üye Ol",
            action: "/signup"
        }
    }
}

export default authFormTypes;