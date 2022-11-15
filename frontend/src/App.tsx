import React from 'react';
import { Navbar } from './components/Navbar/navbar';
import { Greeting } from './components/Greeting/greeting';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect, useState } from "react"
import { Pokepage } from './components/Pokepage/Pokepage';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './app/hooks'
import { updatePokemonName } from "./slices/search/searchSlice"
import { setNumberOfPokemon } from './slices/numInCart/numInCartSlice';
import pokemonService from "./services/pokemon"
import { setAllPokemonNames } from './slices/allPokemon/allPokemonNamesSlice';

const App = () => {

  const dispatch = useAppDispatch()
  const cartLength = useAppSelector(state => state.storedCartPokemon).storedCartPokemon.length

  useEffect(() => {

    getPokemonNames()
    //react now remembers the current pokemon page on reload
    const currentPokemonSearched = window.localStorage.getItem("CURRENT_SEARCHED_POKEMON")
    if (currentPokemonSearched) {
      dispatchCurrentPokemonSearched(currentPokemonSearched)
    }

    //react remembers the number of pokemon stored in cart
    const numPokemonInCart = window.localStorage.getItem("NUMBER_POKEMON_IN_CART")
    if (numPokemonInCart != null) {

      //in case someone tampers with localStorage property
      //react will reflect the accurate number of items in the cart
      if (JSON.parse(numPokemonInCart) != cartLength) {
        window.localStorage.setItem("NUMBER_POKEMON_IN_CART", JSON.stringify(cartLength))
      } else {
        dispatch(setNumberOfPokemon(JSON.parse(numPokemonInCart as string)))
      }
    }

  }, [])





  //fetches all pokemon names from pokeapi
  const getPokemonNames = async () => {
    const results = await pokemonService.getAllPokemon()
    const nameMap = new Map();

    for (let i = 0; i < results.length; i++) {
      nameMap.set(results[i].name, results[i])
    }
    dispatch(setAllPokemonNames(JSON.stringify(Object.fromEntries(nameMap))))
    return results
  }



  const dispatchCurrentPokemonSearched = (currentPokemon: string) => {
    dispatch(updatePokemonName(currentPokemon))
  }



  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/shop" />
        <Route path="/shop/:pokemon_name" element={<Pokepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
