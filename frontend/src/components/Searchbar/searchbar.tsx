import React from 'react'
import "./searchbar.css"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updatePokemonName } from "../../slices/search/searchSlice"
//This component will search for a specific
//pokemon

export const Searchbar = () => {

    const [searchedPokemon, setSearchedPokemon] = useState("")
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

    const currentSearchedPokemon = useAppSelector((state) =>
        state.search.pokemonName)

    useEffect(() => {

        //When a user changes paths it will still display
        //the pokemon they searched for
        setSearchedPokemon(currentSearchedPokemon)
    }, [])

    const dispatch = useAppDispatch()

    const handlePokemonChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchedPokemon(e.currentTarget.value)
    }

    return (
        <div className="searchbar-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Find a pokemon below or click shop!</label>
                <input type="text" value={searchedPokemon} onChange={handlePokemonChange} />
                <button onClick={() => dispatch(updatePokemonName(searchedPokemon))}>Search</button>
            </form>
        </div>
    )
}
