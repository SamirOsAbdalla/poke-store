import React from 'react'
import "./Cart.css"
import { useAppSelector } from '../../app/hooks'
import { CartSection } from '../CartSection/CartSection'
import { useEffect, useState } from 'react'
import { pokemonInfo } from '../../interfaces/interface'
import { CartSummary } from '../CartSummary/CartSummary'

export const Cart = () => {

    const allPokemonInCart = useAppSelector(state => state.storedCartPokemon.storedCartPokemon)
    const numInCart = useAppSelector(state => state.numInCart.numberInCart)

    if (numInCart === 0) {
        return (<div></div>)
    }
    else {
        const totalPrice = allPokemonInCart.reduce((accumulator, curVal) =>
            accumulator + curVal.quantity * parseFloat(curVal.price.substring(1)), 0)

        return (
            <div className="cart__wrapper">
                <div className="cart__info__container">
                    <div className='cart__shopping__text'>
                        My Shopping Cart
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
                <div className="cart__summary__container">
                    <CartSummary totalPrice={totalPrice} totalItems={numInCart} />
                </div>
            </div>

        )
    }

}
