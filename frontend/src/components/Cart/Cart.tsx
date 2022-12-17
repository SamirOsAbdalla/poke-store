import React from 'react'
import "./Cart.css"
import { useAppSelector } from '../../app/hooks'
import { CartSection } from '../CartSection/CartSection'
import { useEffect, useState } from 'react'
import { pokemonInfo } from '../../interfaces/interface'

export const Cart = () => {

    const allPokemonInCart = useAppSelector(state => state.storedCartPokemon.storedCartPokemon)
    const numInCart = useAppSelector(state => state.numInCart.numberInCart)

    const [inputQuantity, setInputQuantity] = useState()
    return (
        <div className="cart__wrapper">
            <div className="cart__heading">
                <div className='cart__shopping__text'>
                    My Shopping Cart
                </div>
                <div className="cart__number__text">
                    {numInCart} items
                </div>
            </div>
            <table className="cart__table">
                <thead>
                    <tr>
                        <th className="product__heading">Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>

                </thead>
                <tbody>
                    {allPokemonInCart.map(pokemon =>
                        <CartSection name={pokemon.name}
                            sprite={pokemon.sprite}
                            quantity={pokemon.quantity}
                            key={pokemon.name}
                            price={pokemon.price} />
                    )}
                </tbody>
            </table>
        </div >
    )
}
