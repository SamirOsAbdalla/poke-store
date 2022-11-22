import React from 'react'
import "./Cart.css"
import { useAppSelector } from '../../app/hooks'
import { CartSection } from '../CartSection/CartSection'
import { useEffect, useState } from 'react'
import { pokemonInfo } from '../../interfaces/interface'
export const Cart = () => {

    const allPokemonInCart = useAppSelector(state => state.storedCartPokemon.storedCartPokemon)

    return (
        <div className='cart-wrapper'>
            <div className='cart-section-wrapper'>
                {allPokemonInCart.map(pokemon => <CartSection name={pokemon.name} key={pokemon.id} />)}
            </div>
        </div>
    )
}
