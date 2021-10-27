import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../../../services/authService'



function PrivateRoute({ children, page }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        setIsLoggedIn(isUserAuthenticated())
    }, [])

    if (isLoggedIn === true) {
        return (
            <>
                {children}
            </>
        )

    }
    else if (isLoggedIn === false) {
        router.push({
            pathname: '/signin',
            query: {
                ...router.query,
                page
            },
        });
    }
    return null;
}

export default PrivateRoute