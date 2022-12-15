import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import pokemonService from "../../services/pokemon"
import { useParams } from 'react-router-dom';
import { pokemonInfo, errorMessage } from '../../interfaces/interface'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePokemonName } from '../../slices/search/searchSlice';
import { increaseNumberInCart } from '../../slices/numInCart/numInCartSlice';
import { storeNewPokemon } from '../../slices/storedCartPokemon/storedCartPokemon';
import "./Pokepage.css"
import { PokemonBar } from '../PokemonBar/PokemonBar';
import { TypeButton } from '../TypeButton/TypeButton';
import { current } from '@reduxjs/toolkit';

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
    const [doesPokemonExist, setDoesPokemonExist] = useState<boolean>(false)
    const [stats, setStats] = useState<number[]>([])
    const name = useParams().pokemon_name as string
    const dispatch = useAppDispatch();


    const fetchPokemon = async () => {

        const pokemon = await pokemonService
            .getPokepage(name)
            .then((response: errorMessage | pokemonInfo) => {
                return response
            })

        if (pokemon.kind === "pokemon") {
            const narrowedPokemon: pokemonInfo = pokemon as pokemonInfo
            setCurrentPokemonPage(narrowedPokemon)
            setIsPokemonFetched(true)
            setDoesPokemonExist(true)

            let statsArray: number[] = [];
            narrowedPokemon.stats.forEach(stat => {
                statsArray.push(stat.base_stat)
            })

            setStats(statsArray)
        } else {
            //add error page

        }

    }


    const addPokemonToCart = () => {
        if (doesPokemonExist) {
            dispatch(increaseNumberInCart(1))
            dispatch(storeNewPokemon(currentPokemonPage))
        }
    }


    useEffect(() => {

        //fetch searched pokemon from pokemon on initial render
        if (!isPokemonFetched) {
            fetchPokemon()
        }

    }, [])


    console.log(currentPokemonPage.types)
    //add error page later
    return (
        <div className="pokepage__wrapper">
            <div className='pokepage__heading'>
                <div className="pokepage__name">
                    {name[0].toUpperCase() + name.substring(1) + "  " + "#" + currentPokemonPage.id}
                </div>
                <div className='pokepage__type__buttons'>
                    {currentPokemonPage.types.map(pokeType => <TypeButton key={pokeType.type.name} type={pokeType.type.name} />)}
                </div>
            </div>
            <div className="pokepage__middle">
                <div className="pokemon__stats__chart">
                    <PokemonBar statType='HP' statValue={stats[0]} color="rgb(0, 156, 247)" />
                    <PokemonBar statType='Atk' statValue={stats[1]} color="rgb(254, 15, 15)" />
                    <PokemonBar statType='Def' statValue={stats[2]} color="rgb(6, 17, 62)" />
                    <PokemonBar statType='SpA' statValue={stats[3]} color="rgb(247, 157, 55)" />
                    <PokemonBar statType='SpD' statValue={stats[4]} color="rgb(87, 95, 97)" />
                    <PokemonBar statType='Spe' statValue={stats[5]} color="aquamarine" />
                    <PokemonBar statType='Total' statValue={stats.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0
                    )} color="" />
                </div>
                <div className="pokepage__sprite__image__container">
                    <img className="pokepage__sprite__image" src={currentPokemonPage.sprite} />
                </div>
            </div>
            <button onClick={addPokemonToCart}>Add to cart</button>
        </div >

    )
}
