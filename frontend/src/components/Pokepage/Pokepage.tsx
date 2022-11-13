import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import pokemonService from "../../services/pokemon"
import { useParams } from 'react-router-dom';
import { pokemonInfo, errorMessage } from '../../interfaces/interface'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePokemonName } from '../../slices/search/searchSlice';
import { increaseNumberInCart } from '../../slices/numInCart/numInCartSlice';


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

    const [isPokemonFetched, setIsPokemonFetched] = useState<boolean>(false)

    const name = useParams().pokemon_name as string
    const dispatch = useAppDispatch();
    const numInCart = useAppSelector(state => {
        return state.numInCart.numberInCart
    })

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
        }

    }


    const addPokemonToCart = () => {

        dispatch(increaseNumberInCart(1))
    }


    useEffect(() => {
        if (!isPokemonFetched) {
            fetchPokemon()
        }

    }, [])



    //add error page later
    return (
        <div>
            <div>
                {name}
            </div>
            <div>
                {numInCart}
            </div>
            <button onClick={addPokemonToCart}>Add to cart</button>
            {currentPokemonPage.id}
        </div >

    )
}
