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



    //add error page later
    return (
        <div className="pokepage__wrapper">
            <div className='pokepage__heading'>
                <div className="pokepage__name">
                    {name[0].toUpperCase() + name.substring(1) + "  " + "#" + currentPokemonPage.id}
                </div>
                <div className='pokepage__type__buttons'>
                    <button>
                        Type
                    </button>
                </div>
            </div>
            <div className="pokepage__middle">
                <div className="pokemon__stats__chart">

                    <div className="entire__stat__display">
                        <h3 className="stat__type">HP</h3>
                        <h3 className="stat__value">{stats[0]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[0] * 1.4 }} className="stats HP">

                            </div>
                        </div>
                    </div>

                    <div className="entire__stat__display">
                        <h3 className="stat__type">Atk</h3>
                        <h3 className="stat__value">{stats[1]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[1] * 1.4 }} className="stats ATK">

                            </div>
                        </div>
                    </div>

                    <div className="entire__stat__display">
                        <h3 className="stat__type">Def</h3>
                        <h3 className="stat__value">{stats[2]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[2] * 1.4 }} className="stats DEF">

                            </div>
                        </div>
                    </div>

                    <div className="entire__stat__display">
                        <h3 className="stat__type">SpA</h3>
                        <h3 className="stat__value">{stats[3]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[3] * 1.4 }} className="stats SPATK">

                            </div>
                        </div>
                    </div>

                    <div className="entire__stat__display">
                        <h3 className="stat__type">SpD</h3>
                        <h3 className="stat__value">{stats[4]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[4] * 1.4 }} className="stats SPDEF">

                            </div>
                        </div>
                    </div>

                    <div className="entire__stat__display">
                        <h3 className="stat__type">Spe</h3>
                        <h3 className="stat__value">{stats[5]}</h3>
                        <div className="stats__container">
                            <div style={{ width: stats[5] * 1.4 }} className="stats SPE">

                            </div>
                        </div>
                    </div>
                    <div className="entire__stat__display">
                        <div className="entire__stat__display">
                            <h3 className="stat__type">Total</h3>
                            <h3 className="stat__value">{stats.reduce(
                                (accumulator, currentValue) => accumulator + currentValue,
                                0
                            )}</h3>
                        </div>
                    </div>
                </div>
                <div className="pokepage__sprite__image__container">
                    <img className="pokepage__sprite__image" src={currentPokemonPage.sprite} />
                </div>
            </div>
            <button onClick={addPokemonToCart}>Add to cart</button>
        </div >

    )
}
