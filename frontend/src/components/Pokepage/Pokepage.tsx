import React from 'react'
import axios from "axios"
import { useEffect } from "react"
import pokemonService from "../../services/pokemon"
import { useParams } from 'react-router-dom';
import { pokemonInfo, errorMessage } from '../../interfaces/interface'



export const Pokepage = () => {
    const name = useParams().pokemon_name as string

    const fetchPokemon = async () => {

        const res = await pokemonService
            .getPokepage(name)
            .then((response: errorMessage | pokemonInfo) => {
                return response
            })
    }


    useEffect(() => {
        fetchPokemon()
    })

    return (
        <div>
            <div>{name}</div>
        </div >

    )
}
