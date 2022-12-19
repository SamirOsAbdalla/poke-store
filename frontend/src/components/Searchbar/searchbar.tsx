import React from 'react'
import "./searchbar.css"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updatePokemonName } from "../../slices/search/searchSlice"
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai"
import { SearchButton } from '../SearchButton/SearchButton'

//This component will search for a specific pokemon
type PokemonType = {
    name: string,
    url: string,
    price: string,
    id: number
}
export const Searchbar = () => {

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }



    return (
        <div className="searchbar-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-entries">
                    <div className='label'>
                        <label>Search for a pokemon below or click shop!</label>
                    </div>
                    <SearchButton />
                </div>
            </form>
        </div>
    )
}
