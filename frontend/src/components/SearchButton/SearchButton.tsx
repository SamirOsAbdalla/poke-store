import React from 'react'
import "./SearchButton.css"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updatePokemonName } from "../../slices/search/searchSlice"
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai"
import { useEffect, useState } from 'react';

type PokemonType = {
    name: string,
    url: string,
    price: string,
    id: number
}

export const SearchButton = () => {
    const [searchedPokemon, setSearchedPokemon] = useState("")

    const allPokemon = window.localStorage.getItem("ALL_POKEMON_NAMES")



    const dispatch = useAppDispatch()



    const handlePokemonNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchedPokemon(e.currentTarget.value)
    }



    const navigate = useNavigate()

    const submitUpdatedName = (e: React.SyntheticEvent) => {
        e?.preventDefault()
        const lowercaseSearchedPokemon: string = searchedPokemon.toLowerCase()

        if (allPokemon) {
            const allPokemonArray = JSON.parse(allPokemon) as PokemonType[]

            if (allPokemonArray) {
                const capitalPokemonName = lowercaseSearchedPokemon[0].toUpperCase() + lowercaseSearchedPokemon.substring(1)
                if (!allPokemonArray.find((pokemon) => pokemon.name === capitalPokemonName)) {
                    navigate(`/shop/error`)
                    window.localStorage.setItem("CURRENT_SEARCHED_POKEMON", capitalPokemonName)
                } else {
                    dispatch(updatePokemonName(lowercaseSearchedPokemon))
                    window.localStorage.setItem("CURRENT_SEARCHED_POKEMON", lowercaseSearchedPokemon)
                    navigate(`/shop/${lowercaseSearchedPokemon}`)
                }
            }
        }
    }

    return (
        <div className="search__modules">
            <input placeholder="Search..." className="search__input" type="text" value={searchedPokemon} onChange={handlePokemonNameChange} />
            <button className="search__button" type="submit" onClick={submitUpdatedName}>
                <AiOutlineSearch className="search__icon" />
            </button>
        </div>
    )
}

