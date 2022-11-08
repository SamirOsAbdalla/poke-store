import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
type pokemonName = {
    name: string
}

export const Pokepage = ({ name }: pokemonName) => {

    const pokemonNames = window.localStorage.getItem("ALL_POKEMON_NAMES")


    return (
        <div>
            {pokemonNames && <div>{name}</div>}
        </div>

    )
}
