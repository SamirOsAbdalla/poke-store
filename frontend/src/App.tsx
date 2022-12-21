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
import { Shop } from './components/Shop/Shop';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { Cart } from './components/Cart/Cart';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { storeNewPokemon } from './slices/storedCartPokemon/storedCartPokemon';
import { increaseNumberInCart } from './slices/numInCart/numInCartSlice';
import { AboutPage } from './components/AboutPage/AboutPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SignupPage } from './components/SignupPage/SignupPage';
import { setLoginStatusFalse, setLoginStatusTrue } from './slices/loginStatus/loginStatusSlice';
import { ProfilePage } from './components/ProfilePage/ProfilePage';

type PokemonType = {
  name: string,
  price: string,
  quantity: number,
  sprite: string
}
const App = () => {

  const dispatch = useAppDispatch()
  const cartLength = useAppSelector(state => state.storedCartPokemon).storedCartPokemon.length




  //fetches all pokemon names from pokeapi
  const getPokemonNames = async () => {
    const results = await pokemonService.getAllPokemon()

    const nameArray = [];

    for (let i = 0; i < results.length; i++) {
      results[i].sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
      results[i].name = results[i].name[0].toUpperCase() + results[i].name.substring(1)
      results[i].price = "$" + ((i + 1) * 1.783).toFixed(2)
      results[i].id = i + 1;
      nameArray.push(results[i])
    }
    dispatch(setAllPokemonNames(JSON.stringify(nameArray)))
    window.localStorage.setItem("ALL_POKEMON_NAMES", (JSON.stringify(nameArray)))
  }

  const setLoginStatus = () => {
    const status = window.localStorage.getItem("LOGGED_IN")
    if (status) {
      if (JSON.parse(status)) {
        dispatch(setLoginStatusTrue())
      } else {
        dispatch(setLoginStatusFalse())
      }
    } else {
      dispatch(setLoginStatusFalse())
    }
  }


  useEffect(() => {
    setLoginStatus()
    getPokemonNames()

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

    const localCartPokemon = window.localStorage.getItem("STORED_CART_POKEMON")
    if (localCartPokemon) {
      const localCartPokemonArray = JSON.parse(localCartPokemon)
      localCartPokemonArray.forEach((pokemon: PokemonType) => {
        dispatch(storeNewPokemon(pokemon))
        dispatch(increaseNumberInCart(pokemon.quantity))
      })
    }
  }, [])



  const dispatchCurrentPokemonSearched = (currentPokemon: string) => {
    dispatch(updatePokemonName(currentPokemon))
  }



  return (
    <BrowserRouter >
      <div className="App">
        <Navbar />
      </div>
      <Routes >
        <Route path="/" element={<Greeting />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:pokemon_name" element={<Pokepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop/error" element={<ErrorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
