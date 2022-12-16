import React from 'react'
import "./CartButton.css"
import { AiOutlineShopping } from 'react-icons/ai'

export const CartButton = () => {
    return (
        <div>
            <button className="pokemon__cart__button">
                <AiOutlineShopping className="shopping__button__icon" />
            </button>
        </div>
    )
}
