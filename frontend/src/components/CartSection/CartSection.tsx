import React from 'react'
import "./CartSection.css"
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { removePokemonFromCart } from '../../slices/storedCartPokemon/storedCartPokemon'
import { decreaseNumberInCart } from '../../slices/numInCart/numInCartSlice'
import { QuantityCounter } from '../QuantityCounter/QuantityCounter'

interface PropType {
    name: string,
    sprite: string,
    quantity: number,
    price: string
}
export const CartSection = (props: PropType) => {

    const [updatedPrice, setUpdatedPrice] = useState<string>("")


    useEffect(() => {
        setUpdatedPrice("$" + (parseFloat(props.price.substring(1)) * props.quantity).toFixed(2))
    })


    return (
        <tr>
            <td className="product__cell">
                <div className="cart__image__container">
                    <img src={props.sprite} className="product__sprite" />
                </div>
                <div className="product__name">
                    {props.name}
                </div>
            </td>
            <td className="price__cell">
                {props.price}
            </td>
            <td className="quantity__cell">
                <div className="quantity__cell__container">
                    <QuantityCounter setQuantity={(quantity) => { }} initialQuantity={"" + props.quantity} />
                </div>
            </td>
            <td className="total__cell">
                <div className="total__cell__container">
                    <div>
                        {updatedPrice}
                    </div>
                    <button className="table__x__button">
                        X
                    </button>
                </div>
            </td>
        </tr>
    )
}
