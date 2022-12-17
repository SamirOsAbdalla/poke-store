import React from 'react'
import "./PokemonCard.css"
import { pokemonInfo } from '../../interfaces/interface'
import { AiOutlineShopping, AiOutlineStar } from 'react-icons/ai'
import { CartButton } from '../ShoppingButtons/CartButton'
import { FavButton } from '../ShoppingButtons/FavButton'
import { Link } from 'react-router-dom'
import { QuantityCounter } from '../QuantityCounter/QuantityCounter'
import { useState } from 'react'

type CardPropType = {
    name: string,
    sprite: string,
    price: string
}

export const PokemonCard = (props: CardPropType) => {

    const [currentQuantity, setCurrentQuantity] = useState<number>(1)

    const pokeName = props.name.toLowerCase()
    const hrefLink = `/shop/${pokeName}`


    return (
        <div className='card'>
            <Link to={hrefLink} className='pokemon__name'>
                {props.name}
            </Link>
            <div className="pokemon__image">
                <img src={props.sprite} />
            </div>
            <div className="pokemon__price">
                {props.price}
                <QuantityCounter setQuantity={(quantity) => setCurrentQuantity(quantity)} initialQuantity="1" />
            </div>
            <div className="pokemon__buttons">
                <CartButton name={props.name} sprite={props.sprite} price={props.price} quantity={currentQuantity} />
                <FavButton name={props.name} sprite={props.sprite} />
            </div>
        </div>
    )
}
