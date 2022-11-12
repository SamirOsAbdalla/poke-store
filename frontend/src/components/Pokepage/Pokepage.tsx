import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import pokemonService from "../../services/pokemon"
import { useParams } from 'react-router-dom';
import { pokemonInfo, errorMessage } from '../../interfaces/interface'



export const Pokepage = () => {

    const [currentPokemonPage, setCurrentPokemonPage] = useState<pokemonInfo>({
        id: 0,
        stats: [],
        officialArtwork: "",
        types: [],
        abilities: [],
        height: 0,
        weight: 0,
        kind: ""
    })

    const name = useParams().pokemon_name as string

    const fetchPokemon = async () => {

        const pokemon = await pokemonService
            .getPokepage(name)
            .then((response: errorMessage | pokemonInfo) => {
                return response
            })

        if (pokemon.kind === "pokemon") {
            const narrowedPokemon: pokemonInfo = pokemon as pokemonInfo
            setCurrentPokemonPage(narrowedPokemon)
        } else {
        }

    }


    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <div>
            <div>
                {name}
            </div>
        </div >

    )
}
