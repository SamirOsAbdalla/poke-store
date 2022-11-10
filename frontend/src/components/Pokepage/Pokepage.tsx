import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import retrievePokemon from "../../services/pokemon"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useParams } from 'react-router-dom';

type pokemonName = {
    name: string
}

export const Pokepage = () => {
    const name = useParams().pokemon_name as string
    useEffect(() => {
        retrievePokemon.getPokepage(name).then(response => {
            console.log(response)
        })
    })

    return (
        <div>
            <div>{name}</div>
        </div >

    )
}
