import "./PokemonBar.css"
import { useEffect } from "react"
import React from 'react'
import { NONAME } from "dns"

interface PropType {
    statType: string,
    statValue: number,
    color: string
}


export const PokemonBar = (props: PropType) => {

    return (
        <div className="entire__stat__display">
            <div className="stat__nums">
                <h3 className="stat__type">{props.statType}</h3>
                <h3 className="stat__value">{props.statValue}</h3>
            </div>
            <div className={`stats__container ${props.statType}`}>
                <div style={{ width: props.statValue, backgroundColor: props.color }} className={`stats`}>

                </div>
            </div>
        </div >
    )
}
