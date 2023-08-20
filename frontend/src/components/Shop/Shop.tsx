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
    const [filterValue, setFilterValue] = useState<string>("")
    const allNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
    let nameArray: pokemonType[] = [];
    if (allNames != null) {
        nameArray = JSON.parse(allNames)

    }
    return (
        <div className="shop__wrapper">
            <div className="shop__filter">
                <button className="shop__button">Filter</button>
                <input
                    className="shop__input"
                    placeholder="Enter name..."
                    value={filterValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterValue(e.target.value)
                    }}
                />
            </div>

            <div className="pokecard__list">
                {nameArray?.filter(pokemon => pokemon.name.includes(filterValue)).map((pokemon: pokemonType, i: number) => {
                    return <PokemonCard key={i} name={pokemon.name} sprite={pokemon.sprite} price={pokemon.price} />
                })}
            </div>
        </div>

    )
}


