import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import "./FavButton.css"

export const FavButton = () => {
    return (
        <div>
            <button className='pokemon__favorite__button'>
                <AiOutlineStar className="favorite__button__icon" />
            </button>
        </div>
    )
}
