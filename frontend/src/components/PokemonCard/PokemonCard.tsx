import React from 'react'
import "./PokemonCard.css"
import { pokemonInfo } from '../../interfaces/interface'
import { AiOutlineShopping, AiOutlineStar } from 'react-icons/ai'
import { CartButton } from '../ShoppingButtons/CartButton'
import { FavButton } from '../ShoppingButtons/FavButton'

type CardPropType = Pick<pokemonInfo, "name" | "sprite">

const handleButtonClick = () => {
    console.log("hi")
}
export const PokemonCard = (props: CardPropType) => {

    const pokeName = props.name.toLowerCase()
    const hrefLink = `/shop/${pokeName}`
    return (
        <div className='card'>
            <a href={hrefLink} className='pokemon__name'>
                {props.name}
            </a>
            <div className="pokemon__image">
                <img src={props.sprite} />
            </div>
            <div className="pokemon__price">
                $19.95
            </div>
            <div className="pokemon__buttons">
                <CartButton />
                <FavButton />
            </div>
        </div>
    )
}
