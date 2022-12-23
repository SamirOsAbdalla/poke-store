import React from 'react'
import { useAppSelector } from '../../app/hooks'
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect } from "react"
import { PokemonCard } from '../PokemonCard/PokemonCard'
import { pokemonInfo } from '../../interfaces/interface'
import pokemonService from '../../services/pokemon'
import "./Shop.css"


type pokemonType = {
    name: string,
    sprite: string,
    price: string,
    selected: boolean
}

export const Shop = () => {

    const [loading, setIsLoading] = useState<boolean>(true)


    const allNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
    let nameArray;
    if (allNames != null) {
        nameArray = JSON.parse(allNames)
    }
    return (
        <div className="shop__wrapper">
            {nameArray?.map((pokemon: pokemonType, i: number) => {
                return <PokemonCard key={i} name={pokemon.name} sprite={pokemon.sprite} price={pokemon.price} />
            })}
        </div>

    )
}


