
import React from 'react'
import "./greeting.css"
import { Searchbar } from '../Searchbar/searchbar'

export const Greeting = () => {
    return (
        <div className='greeting-wrapper'>
            <div className="header">
                <div>
                    Pokeball Icon
                </div>
                <div>
                    Welcome to the PokeStore!
                </div>
                <Searchbar />
            </div>
        </div>
    )
}
