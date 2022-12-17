import React from 'react'
import "./CartButton.css"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { storeNewPokemon } from '../../slices/storedCartPokemon/storedCartPokemon'
import { increaseNumberInCart } from '../../slices/numInCart/numInCartSlice'
import { useEffect } from 'react'


import { useAppDispatch } from '../../app/hooks'

interface PropType {
    name: string,
    sprite: string,
    price: string,
    quantity: number,
}

export const CartButton = (props: PropType) => {

    const dispatch = useAppDispatch()

    const addPokemonToCart = () => {
        const pokemon = {
            name: props.name,
            sprite: props.sprite,
            quantity: props.quantity,
            price: props.price
        }

        dispatch(storeNewPokemon(pokemon))
        dispatch(increaseNumberInCart((props.quantity)))

    }

    return (
        <div>
            <button onClick={() => addPokemonToCart()} className="pokemon__cart__button">
                <AiOutlineShoppingCart className="shopping__button__icon" />
            </button>
        </div>
    )
}
