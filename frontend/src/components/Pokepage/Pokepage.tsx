import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import retrievePokemon from "../../services/pokemon"

type pokemonName = {
    name: string
}

export const Pokepage = ({ name }: pokemonName) => {

    useEffect(() => {
        retrievePokemon.getPokepage(name).then(response => {
            console.log(response)
        })
    }, [])

    return (
        <div>
            <div>{name}</div>
        </div>

    )
}
