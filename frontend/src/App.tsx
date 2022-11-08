import React from 'react';
import { Navbar } from './components/Navbar/navbar';
import { Greeting } from './components/Greeting/greeting';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect } from "react"
import { Pokepage } from './components/Pokepage/Pokepage';
import { useAppSelector } from './app/hooks'
import axios from 'axios';
import { useAppDispatch } from './app/hooks'
import { updatePokemonName } from "./slices/search/searchSlice"

const App = () => {

  const currentPokemon = useAppSelector(state => state.search.pokemonName)
  const dispatch = useAppDispatch()



  //fetches all pokemon names
  const getPokemonNames = async () => {
    const results = await axios.get("http://pokeapi.co/api/v2/pokemon/?limit=905")
      .then(response => response.data.results)
    const nameMap = new Map();

    for (let i = 0; i < results.length; i++) {
      nameMap.set(results[i].name, results[i])
    }
    window.localStorage.setItem("ALL_POKEMON_NAMES", JSON.stringify(Object.fromEntries(nameMap)))
    return results
  }



  const setCurrentPokemonSearched = (currentPokemon: string) => {
    dispatch(updatePokemonName(currentPokemon))
  }



  useEffect(() => {
    if (window.localStorage.getItem("IS_POKEMON_STORED")) {


      //react now remembers the current pokemon page on reload
      const currentPokemonSearched = window.localStorage.getItem("CURRENT_SEARCHED_POKEMON")
      if (currentPokemonSearched) {
        setCurrentPokemonSearched(currentPokemonSearched)
      }
    }
    else {
      //get pokemon from API initially
      const isStored = true;
      window.localStorage.setItem("IS_POKEMON_STORED", JSON.stringify(isStored))

      getPokemonNames()
    }
  }, [])




  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/shop" />
        <Route path="/shop/:pokemon_name" element={<Pokepage name={currentPokemon} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
