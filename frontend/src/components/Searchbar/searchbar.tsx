import React from 'react'
import "./searchbar.css"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updatePokemonName } from "../../slices/search/searchSlice"
import { useNavigate } from 'react-router-dom';
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



    const handlePokemonNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchedPokemon(e.currentTarget.value)
    }



    const navigate = useNavigate()
    const submitUpdatedName = (e: React.SyntheticEvent) => {
        e?.preventDefault()
        const lowercaseSearchedPokemon = searchedPokemon.toLowerCase()
        dispatch(updatePokemonName(lowercaseSearchedPokemon))
        navigate(`/shop/${lowercaseSearchedPokemon}`)
    }



    return (
        <div className="searchbar-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Find a pokemon below or click shop!</label>
                <input type="text" value={searchedPokemon} onChange={handlePokemonNameChange} />
                <button type="submit" onClick={submitUpdatedName}>
                    Search
                </button>
            </form>
        </div>
    )
}
