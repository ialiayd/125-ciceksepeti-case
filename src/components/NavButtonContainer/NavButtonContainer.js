import React from 'react'

import NavButton from "../NavButton/NavButton"
import types from "../../constants/navButtonTypes"

//TODO: This section is responsible to get the login state and render the buttons according to is current visitor is logged in or not 
/*
use types constant with the render logic
*/

function NavButtonContainer() {
    return (
        <div>
            <NavButton type={types.addProduct} />
            <NavButton type={types.goToProfile} />
        </div>
    )
}

export default NavButtonContainer
