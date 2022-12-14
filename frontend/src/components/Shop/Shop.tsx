import React from 'react'
import { useAppSelector } from '../../app/hooks'
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect } from "react"
import { PokemonCard } from '../PokemonCard/PokemonCard'
import { pokemonInfo } from '../../interfaces/interface'
import pokemonService from '../../services/pokemon'
import "./Shop.css"
/*type pokemonType = { name: string, url: string }
type pokemonCard = Pick<pokemonInfo, "name" | "sprite">

export const Shop = () => {

    const [loading, setIsLoading] = useState<boolean>(true)
    const [pokemonCardAttributes, setPokemonCardAttributes] = useState<pokemonCard[]>([])
    useEffect(() => {
        const allNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
        let pokemonNameArray;
        let allPokemonCardAttributes: pokemonCard[] = [];
        const getAllPokemonCardAttributes = async (pokeNameArray: pokemonType[]) => {
            pokeNameArray.forEach(async (pokemon) => {
                const response = await pokemonService.getPokepage(pokemon.name).then((response: errorMessage | pokemonInfo) => {
                    return response
                })

                if (response.kind === "pokemon") {
                    const narrowedPokemon: pokemonInfo = response as pokemonInfo
                    const finalPoke: pokemonCard = narrowedPokemon
                    allPokemonCardAttributes.push(finalPoke)
                }
            })
        }

        if (allNames != null) {
            pokemonNameArray = JSON.parse(allNames)
            getAllPokemonCardAttributes(pokemonNameArray)
            setPokemonCardAttributes(allPokemonCardAttributes)
        }

    }, [])*/


type pokemonType = Pick<pokemonInfo, "name" | "sprite">

export const Shop = () => {

    const [loading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {

    }, [])


    const allNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
    let nameArray;
    if (allNames != null) {
        nameArray = JSON.parse(allNames)
    }
    return (
        <div className="shop__wrapper">
            {nameArray.map((pokemon: pokemonType, i: number) => {
                return <PokemonCard key={i} name={pokemon.name} sprite={pokemon.sprite} />
            })}
        </div>

    )
}


