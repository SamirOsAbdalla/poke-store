import React from 'react'
import "./CartSection.css"
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { adjustPokemonInCart, removePokemonFromCart } from '../../slices/storedCartPokemon/storedCartPokemon'
import { increaseNumberInCart, decreaseNumberInCart } from '../../slices/numInCart/numInCartSlice'
import { storeNewPokemon } from '../../slices/storedCartPokemon/storedCartPokemon'
import { QuantityCounter } from '../QuantityCounter/QuantityCounter'
import { GoPlus } from "react-icons/go"

interface PropType {
    name: string,
    sprite: string,
    quantity: number,
    price: string
}
{/*<QuantityCounter name={props.name} setQuantity={(quantity) => { }} initialQuantity={"" + props.quantity} />*/ }
export const CartSection = (props: PropType) => {

    const [updatedPrice, setUpdatedPrice] = useState<string>("")
    const [currentQuantity, setCurrentQuantity] = useState(props.quantity)


    const dispatch = useAppDispatch()
    useEffect(() => {
        setUpdatedPrice("$" + (parseFloat(props.price.substring(1)) * currentQuantity).toFixed(2))
    }, [currentQuantity])

    const handleQuantityButtonClick = (increaseQuantity: boolean) => {

        const curQuantity = currentQuantity

        if (increaseQuantity) {
            setCurrentQuantity(curQuantity + 1)
            dispatch(increaseNumberInCart(1))
            dispatch(adjustPokemonInCart({
                name: props.name,
                quantity: curQuantity + 1
            }))
        } else {
            setCurrentQuantity(curQuantity - 1)
            dispatch(decreaseNumberInCart(1))
            dispatch(adjustPokemonInCart({
                name: props.name,
                quantity: curQuantity - 1
            }))
        }

    }

    const removePokemonCart = () => {
        dispatch(removePokemonFromCart(props.name))
        dispatch(decreaseNumberInCart(currentQuantity))
    }

    return (
        <tr>
            <td data-label="Product" className="product__cell">
                <div className="cart__image__container">
                    <img src={props.sprite} className="product__sprite" />
                </div>
                <div className="product__name">
                    {props.name}
                </div>
            </td>
            <td data-label="Price: " className="price__cell">
                {props.price}
            </td>
            <td data-label="Quantity: " className="quantity__cell">
                <div className="quantity__cell__container">
                    <button onClick={() => handleQuantityButtonClick(true)} className="quantity__cell__button">
                        <span className="button__span">+</span>
                    </button>
                    <div>{currentQuantity}</div>
                    <button className="quantity__cell__button" onClick={() => handleQuantityButtonClick(false)}>
                        <span className="button__span">-</span>
                    </button>
                </div>
            </td>
            <td data-label="Total: " className="total__cell">
                <div className="total__cell__container">
                    <div>
                        {updatedPrice}
                    </div>
                    <button onClick={removePokemonCart} className="table__x__button">
                        X
                    </button>
                </div>
            </td>
        </tr>
    )
}
