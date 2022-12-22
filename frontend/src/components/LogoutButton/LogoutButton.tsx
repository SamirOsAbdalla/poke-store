import React from 'react'
import "./LogoutButton.css"
import { useAppDispatch } from '../../app/hooks'
import { setLoginStatusFalse } from '../../slices/loginStatus/loginStatusSlice'
import { useNavigate } from 'react-router-dom'
import { setNumberOfPokemon } from '../../slices/numInCart/numInCartSlice'
import { removeAllPokemon } from '../../slices/storedCartPokemon/storedCartPokemon'

export const LogoutButton = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
        window.localStorage.setItem("LOGGED_IN", JSON.stringify(false))
        window.localStorage.setItem("STORED_CART_POKEMON", JSON.stringify([]))
        window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(0))
        dispatch(setLoginStatusFalse())
        dispatch(setNumberOfPokemon(0))
        dispatch(removeAllPokemon())
        navigate("/login")
    }

    return (
        <button className="logout__button" onClick={logoutUser}>
            Logout
        </button>
    )
}
