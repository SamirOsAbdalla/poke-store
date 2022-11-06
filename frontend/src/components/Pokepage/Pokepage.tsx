import React from 'react'

type pokemonName = {
    name: string
}

export const Pokepage = ({ name }: pokemonName) => {
    return (
        <div>{name}</div>
    )
}
