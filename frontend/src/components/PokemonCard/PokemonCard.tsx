import React from 'react'
import "./PokemonCard.css"
import { pokemonInfo } from '../../interfaces/interface'
import { AiOutlineShopping, AiOutlineStar } from 'react-icons/ai'
import { CartButton } from '../ShoppingButtons/CartButton'
import { FavButton } from '../ShoppingButtons/FavButton'
import { Link } from 'react-router-dom'

type CardPropType = {
    name: string,
    sprite: string,
    price: string
}

export const PokemonCard = (props: CardPropType) => {

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
            </div>
            <div className="pokemon__buttons">
                <CartButton name={props.name} sprite={props.sprite} price={props.price} />
                <FavButton name={props.name} sprite={props.sprite} />
            </div>
        </div>
    )
}
