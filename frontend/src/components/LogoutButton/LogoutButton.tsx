import React from 'react'
import "./LogoutButton.css"
import { useAppDispatch } from '../../app/hooks'
import { setLoginStatusFalse } from '../../slices/loginStatus/loginStatusSlice'


export const LogoutButton = () => {

    const dispatch = useAppDispatch()
    const logoutUser = () => {
        window.localStorage.setItem("LOGGED_IN", JSON.stringify(false))
        dispatch(setLoginStatusFalse())
    }

    return (
        <button className="logout__button" onClick={logoutUser}>
            Logout
        </button>
    )
}
