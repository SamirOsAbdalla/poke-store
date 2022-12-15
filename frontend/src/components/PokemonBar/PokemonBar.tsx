import "./PokemonBar.css"

import React from 'react'

interface PropType {
    statType: string,
    statValue: number,
    color: string
}
export const PokemonBar = (props: PropType) => {
    return (
        <div className="entire__stat__display">
            <h3 className="stat__type">{props.statType}</h3>
            <h3 className="stat__value">{props.statValue}</h3>
            <div className="stats__container">
                <div style={{ width: props.statValue * 1.4, backgroundColor: props.color }} className="stats HP">

                </div>
            </div>
        </div >
    )
}
