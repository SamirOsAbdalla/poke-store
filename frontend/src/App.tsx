import React from 'react';
import { Navbar } from './components/Navbar/navbar';
import { Greeting } from './components/Greeting/greeting';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect, useState } from "react"
import { Pokepage } from './components/Pokepage/Pokepage';
import axios from 'axios';
import { useAppDispatch } from './app/hooks'
import { updatePokemonName } from "./slices/search/searchSlice"
import { increaseNumberInCart } from './slices/numInCart/numInCartSlice';
import pokemonService from "./services/pokemon"

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (window.localStorage.getItem("IS_POKEMON_STORED")) {

      //react now remembers the current pokemon page on reload
      const currentPokemonSearched = window.localStorage.getItem("CURRENT_SEARCHED_POKEMON")
      if (currentPokemonSearched) {
        dispatchCurrentPokemonSearched(currentPokemonSearched)
      }

      //react remembers the number of pokemon stored in cart

      if (window.localStorage.getItem("NUMBER_POKEMON_IN_CART") != null) {
        dispatch(increaseNumberInCart(JSON.parse(window.localStorage.getItem("NUMBER_POKEMON_IN_CART") as string)))
      }


    }
    else {
      //get pokemon from API initially
      const isStored = true;
      window.localStorage.setItem("IS_POKEMON_STORED", JSON.stringify(isStored))
      getPokemonNames()
    }
  }, [])





  //fetches all pokemon names from pokeapi
  const getPokemonNames = async () => {
    const results = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1323")
      .then(response => response.data.results)
    const nameMap = new Map();

    for (let i = 0; i < results.length; i++) {
      nameMap.set(results[i].name, results[i])
    }
    window.localStorage.setItem("ALL_POKEMON_NAMES", JSON.stringify(Object.fromEntries(nameMap)))
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
