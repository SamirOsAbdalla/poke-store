
import React from 'react'
import "./greeting.css"
import { Searchbar } from '../Searchbar/searchbar'

export const Greeting = () => {
    return (
        <div className='greeting-wrapper'>
            <div className="header">
                <div className='welcome-greeting'>
                    Welcome to the PokeStore!
                </div>
                <div className='pokeball-icon'>
                    Pokeball Icon
                </div>
                <Searchbar />
            </div>
        </div>
    )
}
