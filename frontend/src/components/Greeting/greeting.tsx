
import React from 'react'
import "./greeting.css"
import { Searchbar } from '../Searchbar/searchbar'
import { Pokeball } from '../Pokeball/Pokeball'

export const Greeting = () => {
    return (
        <div className='greeting-wrapper'>
            <div className="header">
                <div className='welcome-greeting'>
                    Welcome to the PokeStore!
                </div>
                <Pokeball />
                <Searchbar />
            </div>
        </div>
    )
}
