import React from 'react';
import { Navbar } from './components/Navbar/navbar';
import { Greeting } from './components/Greeting/greeting';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect } from "react"
import { Pokepage } from './components/Pokepage/Pokepage';
import { useAppSelector } from './app/hooks'

function App() {

  const currentPokemon = useAppSelector(state => state.search.pokemonName)

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/shop/:pokemon_name" element={<Pokepage name={currentPokemon} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
