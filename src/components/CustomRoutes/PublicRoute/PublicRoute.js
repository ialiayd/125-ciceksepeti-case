import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../../../services/authService'



function PublicRoute({ children }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        setIsLoggedIn(isUserAuthenticated())
    }, [])

    if (isLoggedIn === false) {
        return (
            <>
                {children}
            </>
        )

    }
    else if (isLoggedIn === true) {
        router.push("/");
    }
    return null;
}

export default PublicRoute