import React from 'react'
import "./PokemonCard.css"
import { pokemonInfo } from '../../interfaces/interface'
import { AiOutlineShopping, AiOutlineStar } from 'react-icons/ai'

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
            <div className="pokemon__buttons">
                <button className="pokemon__cart__button">
                    <AiOutlineShopping className="shopping__button__icon" />
                </button>
                <button className='pokemon__favorite__button'>
                    <AiOutlineStar className="favorite__button__icon" />
                </button>
            </div>
        </div>
    )
}
