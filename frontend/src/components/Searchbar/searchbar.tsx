import React from 'react'
import "./searchbar.css"
import { useState } from 'react'


//This component will search for a specific
//pokemon

export const Searchbar = () => {

    const [searchedPokemon, setSearchedPokemon] = useState("")
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    const handlePokemonChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchedPokemon(e.currentTarget.value)
    }

    return (
        <div className="searchbar-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Find a pokemon below or click shop!</label>
                <input type="text" value={searchedPokemon} onChange={handlePokemonChange} />
                <button>Search</button>
            </form>
        </div>
    )
}
