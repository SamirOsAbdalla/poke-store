import React from 'react'
import "./EmptyCart.css"
import { BsCartDashFill } from 'react-icons/bs'
import { NavLink } from "react-router-dom"
export const EmptyCart = () => {
    return (
        <div className="empty__cart__wrapper">
            <div className="empty__cart__icon__container">
                <BsCartDashFill className="empty__cart__icon" />
            </div>

            <div className="empty__cart__text__heading">
                Your Cart is Empty
            </div>
            <div className="empty__cart__text__plea">
                Please try to buy something we need the money!
            </div>
            <NavLink to="/shop">
                <button className="empty__cart__button">
                    Continue Shopping
                </button>
            </NavLink>
        </div>
    )
}
