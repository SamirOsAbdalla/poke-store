import React from 'react'
import { useAppSelector } from '../../app/hooks'
import InfiniteScroll from "react-infinite-scroll-component"
import { useState } from "react"

interface pokemonType {
    name: string,
    url: string
}
export const Shop = () => {

    const [loading, setIsLoading] = useState<boolean>(true)

    const allNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
    let nameArray;
    if (allNames != null) {
        nameArray = JSON.parse(allNames)
    }
    return (
        <div>
            {nameArray.map((pokemon: pokemonType, i: number) => {
                return <div key={i}>{pokemon.name}{i}</div>
            })}
        </div>

    )
}


