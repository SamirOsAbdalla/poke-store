import "./OrderConfirmation.css"
import React from 'react'
import { useAppDispatch } from "../../app/hooks"
import { removeAllPokemon } from "../../slices/storedCartPokemon/storedCartPokemon"
import { setNumberOfPokemon } from "../../slices/numInCart/numInCartSlice"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"


export const OrderConfirmation = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(removeAllPokemon())
        dispatch(setNumberOfPokemon(0))
    }, [])
    return (
        <div className="order__confirmation__wrapper">
            <div className="image__confirmation__container">
                <img className="image__confirmation" src={require('../../images/shopping.png')} />
            </div>
            <div className="confirmation__text success__confirmation">
                Your Payment is Successful
            </div>
            <div className="confirmation__text expected__time">
                You should expect your purchase in about 1-2 business years. Thank you!
            </div>
            <NavLink to="/shop">
                <button className="empty__cart__button">
                    Back to Shop
                </button>
            </NavLink>
        </div>
    )
}