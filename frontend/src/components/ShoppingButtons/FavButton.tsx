import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import "./FavButton.css"

interface PropType {
    name: string,
    sprite: string
}

export const FavButton = (props: PropType) => {
    return (
        <div>
            <button className='pokemon__favorite__button'>
                <AiOutlineStar className="favorite__button__icon" />
            </button>
        </div>
    )
}
