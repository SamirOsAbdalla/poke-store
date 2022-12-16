import React from 'react'
import "./CartButton.css"
import { AiOutlineShopping } from 'react-icons/ai'
import { storeNewPokemon } from '../../slices/storedCartPokemon/storedCartPokemon'
import { increaseNumberInCart } from '../../slices/numInCart/numInCartSlice'
import { useEffect } from 'react'


import { useAppDispatch } from '../../app/hooks'

interface PropType {
    name: string,
    sprite: string,
    price: string
}

export const CartButton = (props: PropType) => {

    const dispatch = useAppDispatch()

    const addPokemonToCart = () => {
        const pokemon = {
            name: props.name,
            sprite: props.sprite,
            quantity: 1,
            price: props.price
        }

        dispatch(storeNewPokemon(pokemon))
        dispatch(increaseNumberInCart((1)))

        const cartPokemon = window.localStorage.getItem("")
    }

    return (
        <div>
            <button onClick={() => addPokemonToCart()} className="pokemon__cart__button">
                <AiOutlineShopping className="shopping__button__icon" />
            </button>
        </div>
    )
}
