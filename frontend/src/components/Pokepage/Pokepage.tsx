import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import pokemonService from "../../services/pokemon"
import { useParams } from 'react-router-dom';
import { pokemonInfo, errorMessage } from '../../interfaces/interface'
import { updatePokemonName } from '../../slices/search/searchSlice';
import { increaseNumberInCart } from '../../slices/numInCart/numInCartSlice';
import { storeNewPokemon } from '../../slices/storedCartPokemon/storedCartPokemon';
import "./Pokepage.css"
import { PokemonBar } from '../PokemonBar/PokemonBar';
import { TypeButton } from '../TypeButton/TypeButton';
import { current } from '@reduxjs/toolkit';
import { CartButton } from '../ShoppingButtons/CartButton';
import { FavButton } from '../ShoppingButtons/FavButton';

export const Pokepage = () => {

    const [currentPokemonPage, setCurrentPokemonPage] = useState<pokemonInfo>({
        id: 0,
        stats: [],
        types: [],
        abilities: [],
        height: 0,
        weight: 0,
        kind: "",
        name: "",
        sprite: ""
    })

    const [isPokemonFetched, setIsPokemonFetched] = useState<boolean>(false)
    const [stats, setStats] = useState<number[]>([0, 0, 0, 0, 0, 0])
    const [pokemonEntry, setPokemonEntry] = useState<string>("")
    const [pokemonPrice, setPokemonPrice] = useState<string>("")
    const [updatedName, setUpdatedName] = useState<string>("")
    const name = useParams().pokemon_name as string

    const getPokemonEntry = async () => {
        const pokemonEntry = await pokemonService.getPokemonEntry(name).then((entry: errorMessage | string) => entry)
        setPokemonEntry(pokemonEntry as string)
    }


    const fetchPokemon = async () => {

        const pokemon = await pokemonService
            .getPokepage(name)
            .then((response: errorMessage | pokemonInfo) => {
                return response
            })

        if (pokemon.kind === "pokemon") {
            const narrowedPokemon: pokemonInfo = pokemon as pokemonInfo

            const pokemonNames = window.localStorage.getItem("ALL_POKEMON_NAMES")
            if (pokemonNames) {
                let allPokemonNames = JSON.parse(pokemonNames)
                setPokemonPrice(allPokemonNames[narrowedPokemon.id - 1].price)
            }
            setCurrentPokemonPage(narrowedPokemon)
            setUpdatedName(narrowedPokemon.name[0].toUpperCase() + narrowedPokemon.name.substring(1))
            setIsPokemonFetched(true)

            let statsArray: number[] = [];
            narrowedPokemon.stats.forEach(stat => {
                statsArray.push(stat.base_stat)
            })

            setStats(statsArray)
        } else {
            //add error page

        }

    }


    useEffect(() => {

        //fetch searched pokemon from pokemon on initial render
        if (!isPokemonFetched) {
            fetchPokemon()
            getPokemonEntry()
        }
    }, [])


    //add error page later
    return (
        <div className="pokepage__wrapper">
            <div className='pokepage__container'>
                <div className="pokepage__top">
                    <div className="pokepage__sprite__image__container">
                        {isPokemonFetched && <img className="pokepage__sprite__image" src={currentPokemonPage.sprite} />}
                    </div>
                    <div className='pokepage__heading'>
                        <div className="pokepage__name">
                            {name[0].toUpperCase() + name.substring(1)}
                        </div>
                        <div className='pokepage__type__buttons'>
                            {currentPokemonPage.types.map(pokeType => <TypeButton key={pokeType.type.name} type={pokeType.type.name} />)}
                        </div>
                        <div className="pokepage__entry">
                            <div className="pokepage__entry__description">
                                Description:
                            </div>
                            <div className="pokepage__entry__entry">
                                {pokemonEntry}
                            </div>
                        </div>

                        <div className="pokepage__price">
                            {`Price: ${pokemonPrice}`}
                        </div>
                        <div className="pokepage__shop__buttons">
                            <CartButton name={updatedName} sprite={currentPokemonPage.sprite} price={pokemonPrice} />
                            <FavButton name={currentPokemonPage.name} sprite={currentPokemonPage.sprite} />
                        </div>
                    </div>
                </div>
                <div className="pokepage__middle">
                    <div className='stats__chart__heading'>
                        Stats Table
                    </div>
                    <div className="pokemon__stats__chart">
                        <PokemonBar statType='HP' statValue={stats[0]} color="rgb(254, 15, 15)" />
                        <PokemonBar statType='Atk' statValue={stats[1]} color="rgb(247, 157, 55)" />
                        <PokemonBar statType='Def' statValue={stats[2]} color="rgb(244, 228, 5)" />
                        <PokemonBar statType='SpA' statValue={stats[3]} color="rgb(0, 156, 247)" />
                        <PokemonBar statType='SpD' statValue={stats[4]} color="rgb(65, 218, 38)" />
                        <PokemonBar statType='Spe' statValue={stats[5]} color="rgb(241, 0, 144)" />
                        <PokemonBar statType='Total' statValue={stats.reduce(
                            (accumulator, currentValue) => accumulator + currentValue,
                            0
                        )} color="" />
                    </div>
                </div>
            </div>


        </div >

    )
}
